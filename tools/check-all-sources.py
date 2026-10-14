"""Comprueba citas y claves de los ejercicios de literalidad contra sus fuentes.

Los casos de interpretación se revisan por separado; no se equipara una búsqueda
de texto a una validación jurídica o psicométrica completa.
"""
from pathlib import Path
from html.parser import HTMLParser
import json
import re
import subprocess
import unicodedata

ROOT=Path(__file__).resolve().parents[1]
norms={p.stem:json.loads(p.read_text()) for p in (ROOT/'docs/normas').glob('*.json')}
articles={(source,a['id']):a for source,norm in norms.items() for a in norm['articles']}


def normalize(text):
    text=text.strip()
    if text.startswith('…'):
        text=text[1:]
    if text.endswith('…'):
        text=text[:-1]
    return re.sub(r'\s+','',unicodedata.normalize('NFKC',text)).casefold()


def belongs(fragment,paragraph):
    return normalize(fragment) in normalize(paragraph)


class Quotes(HTMLParser):
    def __init__(self):
        super().__init__();self.current=None;self.rows=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='blockquote' and 'legal-text' in attrs.get('class','').split():
            self.current={'source':attrs.get('data-source'),'article':attrs.get('data-article'),'text':[]}
    def handle_endtag(self,tag):
        if tag=='blockquote' and self.current:
            self.rows.append(self.current);self.current=None
    def handle_data(self,text):
        if self.current:
            self.current['text'].append(text)


total_quotes=total_questions=total_cases=0
for topic in range(3,17):
    code=f"""
    const fs=require('fs'),vm=require('vm'),c={{window:{{}}}};
    vm.createContext(c);
    for(const f of ['lesson.js','questions-a.js','questions-b.js','questions-c.js'])
      vm.runInContext(fs.readFileSync('js/tema{topic}/'+f,'utf8'),c);
    process.stdout.write(JSON.stringify({{lesson:c.window.OPO_LESSON,bank:[...c.window.OPO_QUESTIONS_A,...c.window.OPO_QUESTIONS_B,...c.window.OPO_QUESTIONS_C]}}));
    """
    data=json.loads(subprocess.check_output(['node','-e',code],cwd=ROOT,text=True))
    parser=Quotes()
    for section in data['lesson']['sections']:
        parser.feed(section['html'])
    for quote in parser.rows:
        article=articles[(quote['source'],quote['article'])]
        assert normalize(''.join(quote['text']))==normalize(''.join(article['paragraphs'])),f'Tema {topic}: cita alterada {quote["article"]}'
        total_quotes+=1
    for question in data['bank']:
        audit=question['audit'];article=articles[(audit['source'],audit['articleId'])]
        if audit['variant']=='case':
            assert audit['paragraph']==' '.join(article['paragraphs'])
            assert not question['evaluation']
            total_cases+=1
            continue
        assert audit['paragraph'] in article['paragraphs'],question['id']
        for related in audit['related']:
            assert related['paragraph'] in articles[(related['source'],related['articleId'])]['paragraphs'],question['id']
        variant=audit['variant']
        if variant==0:
            match=re.search(r'fragmento: «(.*)»\.$',question['stem'])
            assert match,question['id']
            mask=match[1]
            matches=[belongs(mask.replace('[____]',option),audit['paragraph']) for option in question['options']]
        elif variant in [1,2,3]:
            matches=[belongs(option,audit['paragraph']) for option in question['options']]
        elif variant==4:
            matches=[]
            for option in question['options']:
                pieces=option.split(' / ')
                assert len(pieces)==2,question['id']
                matches.append(belongs(pieces[0],audit['paragraph']) and belongs(pieces[1],audit['related'][1]['paragraph']))
        else:
            matches=[not any(belongs(option,row['paragraph']) for row in audit['related']) for option in question['options']]
        assert sum(matches)==1,(question['id'],'La clave no es única según el cotejo textual',matches)
        assert matches[question['answer']],(question['id'],'Clave incorrecta según la fuente')
        total_questions+=1
    print(f'Tema {topic}: {len(parser.rows)} citas íntegras y claves de literalidad cotejadas.')
print(f'Cotejo total: {total_quotes} citas; {total_questions} ejercicios textuales; {total_cases} casos de interpretación con fuente identificada.')
