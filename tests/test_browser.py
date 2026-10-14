"""Pruebas reales de interfaz y corrección; no son necesarias para usar la web."""
import json
import functools
import http.server
import os
import pathlib
import shutil
import threading
import unittest

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


class BrowserChecks(unittest.TestCase):
    page_name = 'index.html'
    topic = 1
    @classmethod
    def setUpClass(cls):
        handler = functools.partial(QuietHandler, directory=str(ROOT))
        cls.server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.url = (ROOT / cls.page_name).as_uri() if os.environ.get('OPO_TEST_FILE') == '1' else f'http://127.0.0.1:{cls.server.server_port}/{cls.page_name}'
        cls.playwright = sync_playwright().start()
        executable = shutil.which('chromium')
        cls.browser = cls.playwright.chromium.launch(
            **({'executable_path': executable} if executable else {}),
            args=['--no-sandbox'],
        )

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.shutdown()
        cls.server.server_close()

    def setUp(self):
        self.context = self.browser.new_context(viewport={'width': 1365, 'height': 900})
        self.page = self.context.new_page()
        self.key = f'opo-melilla-tema{self.topic}-v1'
        self.errors = []
        self.page.on('pageerror', lambda e: self.errors.append(str(e)))
        self.page.goto(self.url)
        self.page.wait_for_function('Boolean(window.OPO_APP)')

    def tearDown(self):
        self.assertEqual(self.errors, [])
        self.context.close()

    def training(self):
        self.page.locator('[data-view="training"]').click()

    def start(self, test='t1'):
        self.training()
        self.page.locator(f'[data-start="{test}"]').click()

    def submit(self):
        self.page.locator('#submit-test').click()
        self.page.locator('#confirm-accept').click()
        self.page.locator('#result-panel').wait_for(state='visible')

    def test_content_and_test_partition(self):
        if self.topic == 1:
            self.assertEqual(self.page.locator('.lesson-section').count(), 10)
        else:
            self.assertGreaterEqual(self.page.locator('.lesson-section').count(), 15)
            self.assertEqual(self.page.locator('#lesson-content .legal-text').count(), 46)
        self.assertGreaterEqual(self.page.locator('mark').count(), 50)
        if self.topic == 1:
            self.assertEqual(self.page.locator('.trap-card').count(), 23)
        else:
            self.assertGreaterEqual(self.page.locator('.trap-card').count(), 50)
        data = self.page.evaluate('window.OPO_APP.tests')
        self.assertEqual(len(data), 11)
        self.assertEqual([len(t['ids']) for t in data], [20] * 10 + [40])
        self.assertEqual([t['seconds'] for t in data], [1271] * 10 + [2542])
        self.assertEqual(len(set(q for t in data for q in t['ids'])), 240)
        for source in ['bases-2024.pdf','aviso-examen-2026.pdf','ampliacion-30-plazas-2026.pdf','rectificacion-tiempo-2024.pdf']:
            self.assertEqual(self.page.locator(f'#sources-content a[href="docs/{source}"]').count(), 1)

    def test_scoring_all_tests_correct_wrong_blank_and_mixed(self):
        data = self.page.evaluate('''() => {
          const bank = [...OPO_QUESTIONS_A,...OPO_QUESTIONS_B,...OPO_QUESTIONS_C];
          const map = new Map(bank.map(q=>[q.id,q]));
          return OPO_APP.tests.map(test=>{
            const correct={}, wrong={};
            test.ids.forEach(id=>{correct[id]=map.get(id).answer;wrong[id]=(map.get(id).answer+1)%3;});
            const mixed={};test.ids.slice(0,4).forEach(id=>mixed[id]=map.get(id).answer);
            test.ids.slice(4,6).forEach(id=>mixed[id]=(map.get(id).answer+1)%3);
            return {n:test.ids.length,
              correct:OPO_APP.calculate({ids:test.ids,answers:correct}),
              wrong:OPO_APP.calculate({ids:test.ids,answers:wrong}),
              blank:OPO_APP.calculate({ids:test.ids,answers:{}}),
              mixed:OPO_APP.calculate({ids:test.ids,answers:mixed})};
          });
        }''')
        for row in data:
            self.assertEqual(row['correct']['score'], 10)
            self.assertEqual(row['correct']['correct'], row['n'])
            self.assertEqual(row['wrong']['raw'], -5)
            self.assertEqual(row['wrong']['score'], 0)
            self.assertEqual(row['blank']['blanks'], row['n'])
            self.assertEqual(row['blank']['score'], 0)
            self.assertAlmostEqual(row['mixed']['score'], 30 / row['n'])

    def test_real_answers_navigation_review_and_history(self):
        self.start()
        answers = self.page.evaluate('''() => {
          const bank=[...OPO_QUESTIONS_A,...OPO_QUESTIONS_B,...OPO_QUESTIONS_C];
          return OPO_APP.tests[0].ids.map(id=>bank.find(q=>q.id===id).answer);
        }''')
        for i, correct in enumerate(answers):
            self.page.locator(f'input[name="answer"][value="{correct}"]').check()
            self.page.locator('input[name="confidence"][value="high"]').check()
            if i < len(answers) - 1:
                self.page.locator('#next-question').click()
        self.assertEqual(self.page.locator('.question-chip.answered').count(), 20)
        self.assertEqual(self.page.locator('#result-review .explanation').count(), 0)
        self.submit()
        self.assertIn('10,00', self.page.locator('.result-score').inner_text())
        self.assertEqual(self.page.locator('#result-review .review-card.correct').count(), 20)
        self.assertEqual(self.page.locator('#result-review .explanation').count(), 20)
        self.assertEqual(self.page.locator('#result-review .option-reason').count(), 60)
        self.assertEqual(self.page.locator('#result-review .source-note').count(), 20)
        self.page.locator('#result-back').click()
        self.page.locator('[data-view="progress"]').click()
        self.assertIn('20/240', self.page.locator('#progress-content').inner_text())
        self.page.reload()
        self.page.locator('[data-view="progress"]').click()
        self.assertEqual(self.page.locator('[data-result]').count(), 1)
        self.page.locator('[data-result]').click()
        self.assertEqual(self.page.locator('#result-review .review-card').count(), 20)

    def test_clear_flag_cancel_and_resume(self):
        self.start()
        self.page.locator('input[name="answer"][value="0"]').check()
        self.page.locator('#flag-question').click()
        self.assertEqual(self.page.locator('.question-chip.flagged').count(), 1)
        self.page.locator('#clear-answer').click()
        self.assertEqual(self.page.locator('.question-chip.answered').count(), 0)
        self.page.locator('#next-question').click()
        self.page.locator('input[name="answer"][value="1"]').check()
        self.page.locator('#submit-test').click()
        self.page.locator('#confirm-cancel').click()
        self.assertTrue(self.page.locator('#exam-panel').is_visible())
        self.page.locator('#save-exit').click()
        self.page.reload()
        self.training()
        self.page.locator('[data-resume]').click()
        self.assertTrue(self.page.locator('input[name="answer"][value="1"]').is_checked())
        self.assertEqual(self.page.locator('.question-chip.flagged').count(), 1)
        self.submit()
        self.assertEqual(self.page.locator('#result-review .review-card.blank').count(), 19)

    def test_expired_attempt_delivered_once(self):
        self.start()
        self.page.locator('input[name="answer"][value="0"]').check()
        self.page.locator('#save-exit').click()
        # Simula que han pasado 1.300 segundos al volver, sin alterar el intento.
        self.page.add_init_script('const realNow=Date.now; Date.now=()=>realNow()+1300000;')
        self.page.reload()
        self.training()
        self.page.locator('[data-resume]').click()
        self.assertTrue(self.page.locator('#result-panel').is_visible())
        self.assertIn('automáticamente', self.page.locator('#result-summary').inner_text())
        saved = self.page.evaluate('key=>JSON.parse(localStorage.getItem(key))', self.key)
        self.assertIsNone(saved['active'])
        self.assertEqual(len(saved['attempts']), 1)

    def test_export_import_and_reject_corruption(self):
        self.start()
        self.submit()
        self.page.locator('#result-back').click()
        self.page.locator('[data-view="progress"]').click()
        with self.page.expect_download() as download_info:
            self.page.locator('#export-progress').click()
        exported = json.loads(pathlib.Path(download_info.value.path()).read_text())
        self.assertEqual(exported['version'], 1)
        self.assertEqual(exported['topic'], self.topic)
        self.assertEqual(len(exported['attempts']), 1)
        self.page.locator('#reset-progress').click()
        self.page.locator('#confirm-accept').click()
        self.assertEqual(self.page.locator('[data-result]').count(), 0)
        exported['attempts'][0]['score'] = 10  # la nota debe recalcularse, no confiar en el archivo
        self.page.locator('#import-progress').set_input_files({'name':'progreso.json','mimeType':'application/json','buffer':json.dumps(exported).encode()})
        self.page.locator('#confirm-accept').click()
        self.assertEqual(self.page.locator('[data-result]').count(), 1)
        self.assertIn('0,00/10', self.page.locator('[data-result]').inner_text())
        exported['attempts'][0]['answers'] = {'no-existe': 0}
        self.page.locator('#import-progress').set_input_files({'name':'incorrecto.json','mimeType':'application/json','buffer':json.dumps(exported).encode()})
        self.assertIn('No se ha importado', self.page.locator('#import-status').inner_text())
        self.assertEqual(self.page.locator('[data-result]').count(), 1)

    def test_mobile_and_keyboard_modal(self):
        self.page.set_viewport_size({'width':390,'height':844})
        self.assertTrue(self.page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))
        self.start('evaluation')
        self.assertTrue(self.page.evaluate('document.getElementById("app-shell").inert'))
        self.page.keyboard.press('Tab')
        self.assertTrue(self.page.evaluate('document.getElementById("exam-panel").contains(document.activeElement)'))
        self.assertTrue(self.page.evaluate('document.getElementById("exam-panel").scrollWidth <= innerWidth + 1'))
        self.page.locator('#submit-test').click()
        self.page.keyboard.press('Escape')
        self.assertFalse(self.page.locator('#confirm-panel').is_visible())
        self.page.locator('#save-exit').click()
        self.assertFalse(self.page.evaluate('document.getElementById("app-shell").inert'))

    def test_offline_and_no_external_requests(self):
        requests = []
        self.page.on('request', lambda request: requests.append(request.url))
        self.context.set_offline(True)
        self.start()
        self.submit()
        self.assertEqual(self.page.locator('#result-review .review-card').count(), 20)
        self.assertFalse(any(url.startswith(('http://','https://')) for url in requests))

    def test_unavailable_storage_still_allows_test(self):
        context = self.browser.new_context()
        context.add_init_script("Storage.prototype.setItem = function(){ throw new Error('blocked'); };")
        page = context.new_page()
        try:
            page.goto(self.url)
            page.wait_for_function('Boolean(window.OPO_APP)')
            self.assertIn('no permite guardar', page.locator('#storage-status').inner_text())
            page.locator('[data-view="training"]').click()
            page.locator('[data-start="t1"]').click()
            page.locator('#submit-test').click()
            page.locator('#confirm-accept').click()
            self.assertEqual(page.locator('#result-review .review-card').count(),20)
        finally:
            context.close()


class ThemeTwoChecks(BrowserChecks):
    page_name = 'tema2.html'
    topic = 2

    def test_complete_article_coverage_and_focused_tests(self):
        data = self.page.evaluate('''() => {
          const bank=[...OPO_QUESTIONS_A,...OPO_QUESTIONS_B,...OPO_QUESTIONS_C];
          const map=new Map(bank.map(q=>[q.id,q]));
          return {articles:[...new Set(bank.flatMap(q=>q.articles))],
            categories:OPO_APP.tests.slice(0,10).map(t=>[...new Set(t.ids.map(id=>map.get(id).topic))]),
            evaluation:OPO_APP.tests[10].ids.reduce((o,id)=>{const topic=map.get(id).topic;o[topic]=(o[topic]||0)+1;return o;},{})};
        }''')
        self.assertEqual(sorted(data['articles']), list(range(10,56)))
        self.assertTrue(all(len(categories)==1 for categories in data['categories']))
        self.assertEqual(len(data['evaluation']),10)
        self.assertTrue(all(n==4 for n in data['evaluation'].values()))

    def test_topics_keep_independent_history(self):
        self.start()
        self.submit()
        self.page.locator('#result-back').click()
        self.page.locator('[data-topic="1"]').click()
        self.page.wait_for_function('OPO_APP.topic===1')
        self.page.locator('[data-view="progress"]').click()
        self.assertEqual(self.page.locator('[data-result]').count(),0)
        self.page.locator('[data-topic="2"]').click()
        self.page.wait_for_function('OPO_APP.topic===2')
        self.page.locator('[data-view="progress"]').click()
        self.assertEqual(self.page.locator('[data-result]').count(),1)

    def test_reject_import_from_another_topic(self):
        self.page.locator('[data-view="progress"]').click()
        data={'version':1,'topic':1,'attempts':[],'active':None,'mastery':[]}
        self.page.locator('#import-progress').set_input_files({'name':'tema1.json','mimeType':'application/json','buffer':json.dumps(data).encode()})
        self.assertIn('otro tema',self.page.locator('#import-status').inner_text())
        self.assertFalse(self.page.locator('#confirm-panel').is_visible())


if __name__ == '__main__':
    unittest.main()
