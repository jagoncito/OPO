"""Comprueba los catorce temas añadidos sin duplicar las pruebas del motor común."""
import functools
import http.server
import json
import pathlib
import shutil
import threading
import unittest

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


class LegislationChecks(unittest.TestCase):
    topics = range(3, 17)
    @classmethod
    def setUpClass(cls):
        cls.server = http.server.ThreadingHTTPServer(
            ('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT)))
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.base = f'http://127.0.0.1:{cls.server.server_port}/'
        cls.playwright = sync_playwright().start()
        executable = shutil.which('chromium')
        cls.browser = cls.playwright.chromium.launch(
            **({'executable_path': executable} if executable else {}),
            args=['--no-sandbox'])

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.shutdown()
        cls.server.server_close()

    def open_topic(self, topic, context):
        page = context.new_page()
        page.goto(self.base + f'tema{topic}.html')
        page.wait_for_function(f'OPO_APP.topic==={topic}')
        return page

    def test_all_pages_sources_partition_and_scores(self):
        for topic in self.topics:
            with self.subTest(topic=topic), self.browser.new_context() as context:
                page = self.open_topic(topic, context)
                if topic>=17:
                    self.assertIn(f'Tema específico {topic-16}:',page.locator('#sources-content').inner_text())
                self.assertEqual(page.locator('.topic-switch [data-topic]').count(), 33)
                self.assertGreaterEqual(page.locator('.lesson-section').count(), 12)
                self.assertGreaterEqual(page.locator('#lesson-content mark').count(), 30)
                for href in page.locator('#sources-content a[href^="docs/normas/"]').evaluate_all('(links)=>links.map(a=>a.getAttribute("href"))'):
                    self.assertTrue((ROOT / href).is_file(), href)
                self.assertGreater(page.locator('#sources-content a[href^="docs/normas/"]').count(), 0)
                data = page.evaluate('''() => {
                  const bank=[...OPO_QUESTIONS_A,...OPO_QUESTIONS_B,...OPO_QUESTIONS_C];
                  const map=new Map(bank.map(q=>[q.id,q]));
                  return {tests:OPO_APP.tests, size:bank.length,
                    categories:OPO_APP.tests.slice(0,10).map(t=>[...new Set(t.ids.map(id=>map.get(id).topic))]),
                    evaluation:OPO_APP.tests[10].ids.reduce((o,id)=>{const topic=map.get(id).topic;o[topic]=(o[topic]||0)+1;return o;},{}),
                    scores:OPO_APP.tests.map(t=>{
                      const correct={},wrong={},mixed={};
                      t.ids.forEach(id=>{correct[id]=map.get(id).answer;wrong[id]=(map.get(id).answer+1)%3});
                      t.ids.slice(0,4).forEach(id=>mixed[id]=correct[id]);
                      t.ids.slice(4,6).forEach(id=>mixed[id]=wrong[id]);
                      return {n:t.ids.length,correct:OPO_APP.calculate({ids:t.ids,answers:correct}),
                        wrong:OPO_APP.calculate({ids:t.ids,answers:wrong}),
                        blank:OPO_APP.calculate({ids:t.ids,answers:{}}),
                        mixed:OPO_APP.calculate({ids:t.ids,answers:mixed})};
                    })};
                }''')
                self.assertEqual(data['size'], 240)
                self.assertEqual([len(t['ids']) for t in data['tests']], [20]*10+[40])
                self.assertEqual([t['seconds'] for t in data['tests']], [1271]*10+[2542])
                self.assertEqual(len(set(q for t in data['tests'] for q in t['ids'])), 240)
                self.assertTrue(all(len(c)==1 for c in data['categories']))
                self.assertEqual(sorted(data['evaluation'].values()), [4]*10)
                for score in data['scores']:
                    self.assertEqual(score['correct']['score'], 10)
                    self.assertEqual(score['wrong']['raw'], -5)
                    self.assertEqual(score['wrong']['score'], 0)
                    self.assertEqual(score['blank']['blanks'], score['n'])
                    self.assertAlmostEqual(score['mixed']['score'], 30/score['n'])

    def test_each_page_submission_review_and_independent_history(self):
        with self.browser.new_context() as context:
            for topic in self.topics:
                with self.subTest(topic=topic):
                    page = self.open_topic(topic, context)
                    errors=[]
                    page.on('pageerror', lambda error: errors.append(str(error)))
                    page.locator('[data-view="progress"]').click()
                    self.assertEqual(page.locator('[data-result]').count(), 0)
                    page.locator('[data-view="training"]').click()
                    page.locator('[data-start="t10"]').click()
                    answer = page.evaluate('''() => [...OPO_QUESTIONS_A,...OPO_QUESTIONS_B,...OPO_QUESTIONS_C].find(q=>q.id===OPO_APP.tests[9].ids[0]).answer''')
                    page.locator(f'input[name="answer"][value="{answer}"]').check()
                    page.locator('input[name="confidence"][value="high"]').check()
                    page.locator('#flag-question').click()
                    page.locator('#save-exit').click()
                    page.reload()
                    page.locator('[data-view="training"]').click()
                    page.locator('[data-resume]').click()
                    self.assertTrue(page.locator(f'input[name="answer"][value="{answer}"]').is_checked())
                    self.assertEqual(page.locator('.question-chip.flagged').count(), 1)
                    page.locator('#submit-test').click()
                    page.locator('#confirm-accept').click()
                    self.assertIn('0,50', page.locator('.result-score').inner_text())
                    self.assertEqual(page.locator('#result-review .review-card.correct').count(), 1)
                    self.assertEqual(page.locator('#result-review .review-card.blank').count(), 19)
                    self.assertEqual(page.locator('#result-review .explanation').count(), 20)
                    self.assertEqual(page.locator('#result-review .option-reason').count(), 60)
                    self.assertEqual(page.locator('#result-review .source-note').count(), 20)
                    page.locator('#result-back').click()
                    page.locator('[data-view="progress"]').click()
                    self.assertEqual(page.locator('[data-result]').count(), 1)
                    exported=page.evaluate(f'JSON.parse(localStorage.getItem("opo-melilla-tema{topic}-v1"))')
                    self.assertEqual(len(exported['attempts']), 1)
                    self.assertEqual(errors, [])
                    page.close()
            for topic in self.topics:
                page=self.open_topic(topic, context)
                page.locator('[data-view="progress"]').click()
                self.assertEqual(page.locator('[data-result]').count(), 1)
                page.close()

    def test_mobile_evaluation_and_offline_in_each_topic(self):
        for topic in self.topics:
            with self.subTest(topic=topic), self.browser.new_context(viewport={'width':390,'height':844}) as context:
                page = self.open_topic(topic, context)
                self.assertTrue(page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
                requests=[]
                page.on('request', lambda req: requests.append(req.url))
                context.set_offline(True)
                page.locator('[data-view="training"]').click()
                page.locator('[data-start="evaluation"]').click()
                self.assertEqual(page.locator('.question-chip').count(), 40)
                self.assertTrue(page.evaluate('document.getElementById("exam-panel").scrollWidth<=innerWidth+1'))
                page.locator('#submit-test').click()
                page.locator('#confirm-accept').click()
                self.assertEqual(page.locator('#result-review .review-card.blank').count(), 40)
                self.assertEqual(page.locator('#result-review .explanation').count(), 40)
                self.assertEqual(page.locator('#result-review .option-reason').count(), 120)
                self.assertFalse(requests)


class SpecificChecks(LegislationChecks):
    topics = range(17, 34)

    def test_official_origin_in_exam_and_correction(self):
        with self.browser.new_context() as context:
            page = self.open_topic(17, context)
            target = page.evaluate('''() => {
              const bank=[...OPO_QUESTIONS_A,...OPO_QUESTIONS_B,...OPO_QUESTIONS_C];
              const q=bank.find(q=>q.origin==='official');
              const test=OPO_APP.tests.find(t=>t.ids.includes(q.id));
              return {test:test.id,index:test.ids.indexOf(q.id),answer:q.answer,number:q.exam.number};
            }''')
            page.locator('[data-view="training"]').click()
            page.locator(f'[data-start="{target["test"]}"]').click()
            self.assertIn('ESPECÍFICA 01',page.locator('#exam-panel .eyebrow').first.inner_text())
            page.locator('.question-chip').nth(target['index']).click()
            self.assertIn('Administrativo CAM',page.locator('.question-origin').inner_text())
            self.assertIn(f'pregunta {target["number"]}',page.locator('.question-origin').inner_text())
            page.locator(f'input[name="answer"][value="{target["answer"]}"]').check()
            page.locator('#submit-test').click()
            page.locator('#confirm-accept').click()
            review=page.locator('.review-card').nth(target['index'])
            self.assertIn('Cuestionario oficial',review.locator('.badge').inner_text())
            self.assertIn('normativa propia',review.locator('.source-note').inner_text())
            self.assertEqual(review.locator('a[href="docs/examenes/administrativo-melilla-2026.pdf"]').count(),1)
            self.assertEqual(review.locator('.option-reason').count(),3)


if __name__ == '__main__':
    unittest.main()
