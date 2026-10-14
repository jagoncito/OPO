"""Añade los temas manteniendo la plantilla y los componentes de las páginas previas."""
from pathlib import Path
import html
import json
import re

ROOT=Path(__file__).resolve().parents[1]
models=[json.loads((ROOT/'tools/data/tema3.json').read_text()),*json.loads((ROOT/'tools/data/catalogo.json').read_text())]
specific_path=ROOT/'tools/data/catalogo-especifica.json'
if specific_path.exists():
    models+=json.loads(specific_path.read_text())
names={1:'Título Preliminar',2:'Derechos y deberes',3:'La Corona',4:'Las Cortes Generales',5:'Gobierno y Administración',6:'Poder Judicial y CGPJ',7:'Organización territorial',8:'Tribunal Constitucional y reforma',9:'Fuentes, ley y reglamento',10:'Estatuto: organización',11:'Estatuto: competencias',12:'Estatuto: régimen jurídico',13:'Estatuto: economía y reforma',14:'Órganos de la Administración',15:'Régimen local y Municipio',16:'Igualdad efectiva'}
headings={3:'La Corona.<br><em>Función y límites.</em>',4:'Las Cortes<br><em>Generales.</em>',5:'Gobierno y<br><em>Administración.</em>',6:'El Poder<br><em>Judicial.</em>',7:'La organización<br><em>territorial.</em>',8:'Tribunal Constitucional<br><em>y reforma.</em>',9:'Las fuentes<br><em>del Derecho.</em>',10:'Melilla.<br><em>Sus instituciones.</em>',11:'Las competencias<br><em>de la Ciudad.</em>',12:'El régimen<br><em>jurídico.</em>',13:'Cooperación, Hacienda<br><em>y reforma.</em>',14:'Los órganos<br><em>administrativos.</em>',15:'El régimen<br><em>local.</em>',16:'Igualdad<br><em>efectiva.</em>'}
specific_names=['Interesados y plazos','El acto administrativo','El procedimiento','Revisión y nulidad','Recursos administrativos','Acción administrativa','Responsabilidad patrimonial','Patrimonio local','Organización municipal','Licencias','Ordenanzas y reglamentos','Contratos públicos','Contratos menores','Órganos e imparcialidad','Haciendas locales','Ordenanzas fiscales','Empleo público']
specific_headings=['Interesados.<br><em>Actuación y plazos.</em>','El acto<br><em>administrativo.</em>','El procedimiento.<br><em>Fases y garantías.</em>','Revisión.<br><em>Nulidad y anulabilidad.</em>','Los recursos<br><em>administrativos.</em>','La acción<br><em>administrativa.</em>','Responsabilidad<br><em>patrimonial.</em>','El patrimonio<br><em>local.</em>','El Municipio.<br><em>Organización y servicios.</em>','Las licencias.<br><em>Requisitos y efectos.</em>','Ordenanzas<br><em>y reglamentos.</em>','Los contratos<br><em>del sector público.</em>','Los contratos<br><em>menores.</em>','Los órganos.<br><em>Competencia e imparcialidad.</em>','Haciendas locales.<br><em>Recursos y tributos.</em>','Las ordenanzas<br><em>fiscales.</em>','El empleo<br><em>público.</em>']
for n in range(17,34):
    names[n]=specific_names[n-17]
    headings[n]=specific_headings[n-17]
available=max(m['topic'] for m in models)


def navigation(topic):
    return '<nav class="topic-switch" aria-label="Temas disponibles">'+''.join(
      f'<a href="{"index.html" if n==1 else f"tema{n}.html"}" data-topic="{n}"'+(' aria-current="page"' if n==topic else '')+f'>{"Tema "+str(n) if n<=16 else "Específica "+str(n-16)} · {html.escape(names[n])}</a>' for n in range(1,available+1))+'</nav>'


template=(ROOT/'tema2.html').read_text()
for n in [1,2]:
    path=ROOT/('index.html' if n==1 else 'tema2.html')
    text=path.read_text()
    text=re.sub(r'<nav class="topic-switch".*?</nav>',lambda _:navigation(n),text,flags=re.S)
    path.write_text(text)

for model in models:
    n=model['topic'];text=template
    text=re.sub(r'<nav class="topic-switch".*?</nav>',lambda _:navigation(n),text,flags=re.S)
    text=text.replace('Tema 2 · Derechos y deberes fundamentales | OPO Melilla',f'Tema {n} · {html.escape(names[n])} | OPO Melilla')
    text=text.replace('entrenamiento del tema 2',f'entrenamiento del tema {n}')
    text=text.replace('<strong>Tema 02</strong>',f'<strong>Tema {n:02d}</strong>')
    text=text.replace('<p>Título I · Derechos y deberes fundamentales</p>','<p>'+html.escape(model['subtitle'])+'</p>')
    text=text.replace('CUADERNO 02',f'CUADERNO {n:02d}').replace('TEMA 02',f'TEMA {n:02d}')
    text=text.replace('<span class="topic-number">02</span> LEGISLACIÓN · SEGUNDO TEMA DE 33',f'<span class="topic-number">{n:02d}</span> LEGISLACIÓN · TEMA {n} DE 33')
    if model.get('block')=='specific':
        text=text.replace(f'<title>Tema {n} ·',f'<title>Específica {model["officialTopic"]} ·')
        text=text.replace(f'OPO MELILLA · TEMA {n:02d}',f'OPO MELILLA · ESPECÍFICA {model["officialTopic"]:02d}')
        text=text.replace(f'<strong>Tema {n:02d}</strong>',f'<strong>Específica {model["officialTopic"]:02d}</strong>')
        text=text.replace(f'<span class="topic-number">{n:02d}</span> LEGISLACIÓN · TEMA {n} DE 33',f'<span class="topic-number">{model["officialTopic"]:02d}</span> PARTE ESPECÍFICA · {n} DE 33')
        text=text.replace('Parte general · Legislación','Parte específica')
    text=text.replace('Derechos y deberes<br><em>fundamentales.</em>',headings[n])
    text=text.replace('Constitución Española · Título I · Artículos 10–55.',html.escape(model['subtitle']))
    text=re.sub(r'\s*<script src="js/tema2/[^\"]+" defer></script>', '',text)
    bundle='\n'.join(f'    <script src="js/tema{n}/{file}" defer></script>' for file in ['config.js','lesson.js','questions-a.js','questions-b.js','questions-c.js'])
    text=text.replace('    <script src="js/app.js" defer></script>',bundle+'\n    <script src="js/app.js" defer></script>')
    (ROOT/f'tema{n}.html').write_text(text)

# Extractos legibles sin conexión, separados de los datos de construcción.
for path in (ROOT/'docs/normas').glob('*.json'):
    norm=json.loads(path.read_text())
    sources=''
    for article in norm['articles']:
        sources+='<section id="'+html.escape(article['id'],quote=True)+'"><h2>'+html.escape(article['label'])+'</h2>'+''.join('<p>'+html.escape(p)+'</p>' for p in article['paragraphs'])
        for note in article.get('notes',[]):
            sources+='<p><strong>Nota oficial:</strong> '+html.escape(note['text'])+' <a href="'+html.escape(note['url'],quote=True)+'">Fuente de la nota</a>.</p>'
        sources+='</section>'
    page='<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+html.escape(norm['title'])+'</title><link rel="stylesheet" href="../../styles.css"><body><main style="max-width:960px;margin:auto;padding:30px"><h1>'+html.escape(norm['title'])+'</h1><p>Fuente consultada el 14/10/2026. Redacción de referencia: '+html.escape(norm['version'])+'. La fecha normativa de las bases es 19/11/2024.</p><p><a href="'+html.escape(norm['url'],quote=True)+'">Consultar la fuente oficial</a> · <a href="../../index.html">Volver al cuaderno</a></p>'+sources+'</main></body></html>'
    path.with_suffix('.html').write_text(page)
print(f'{available} páginas conectadas con los mismos componentes, tiempos y corrección.')
