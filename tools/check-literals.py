"""Coteja los 46 textos literales con la extracción del BOE incluida en docs."""
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import unicodedata

ROOT = Path(__file__).resolve().parents[1]


class Quotes(HTMLParser):
    def __init__(self):
        super().__init__()
        self.current = None
        self.quotes = []

    def handle_starttag(self, tag, attrs):
        if tag == 'blockquote' and 'legal-text' in dict(attrs).get('class', '').split():
            self.current = []

    def handle_endtag(self, tag):
        if tag == 'blockquote' and self.current is not None:
            self.quotes.append(''.join(self.current))
            self.current = None

    def handle_data(self, data):
        if self.current is not None:
            self.current.append(data)


code = """
const fs=require('fs'),vm=require('vm'),c={window:{}};
vm.createContext(c);
for(const f of ['lesson-a.js','lesson-b.js','lesson.js'])
  vm.runInContext(fs.readFileSync('js/tema2/'+f,'utf8'),c);
process.stdout.write(JSON.stringify(c.window.OPO_LESSON.sections));
"""
sections = json.loads(subprocess.check_output(['node', '-e', code], cwd=ROOT, text=True))
parser = Quotes()
for section in sections:
    parser.feed(section['html'])
official = json.loads((ROOT / 'docs/constitucion-2024-tituloI.json').read_text())
assert len(parser.quotes) == 46, 'Deben estar los 46 artículos completos.'
normalize = lambda s: re.sub(r'\s+', '', unicodedata.normalize('NFKC', s))
for article, quote in zip(range(10, 56), parser.quotes):
    assert normalize(quote) == normalize(''.join(official[str(article)])), f'Literal distinto: artículo {article}'
print('46 artículos completos cotejados con la extracción oficial del BOE: sin diferencias de texto.')
