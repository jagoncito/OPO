"""Construye páginas estáticas desde fuentes y contrastes jurídicos revisables.

No descarga ni cambia fuentes. Las variantes entrenan literalidad, reconstrucción,
aplicación y comparación; comparten conceptos deliberadamente, no respuestas al azar.
"""
from pathlib import Path
from collections import Counter
import html
import json
import re
import random
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'tools/data'
NORMS = {p.stem: json.loads(p.read_text()) for p in (ROOT / 'docs/normas').glob('*.json')}
VOCAB = json.loads((DATA / 'contrastes.json').read_text())
EXTRA_VOCAB = json.loads((DATA / 'contrastes-especifica.json').read_text()) if (DATA / 'contrastes-especifica.json').exists() else []
CASES = json.loads((DATA / 'casos.json').read_text())
if (DATA / 'casos-especifica.json').exists():
    CASES += json.loads((DATA / 'casos-especifica.json').read_text())
ORDINALS = {'primero':1,'segundo':2,'tercero':3,'cuarto':4,'quinto':5,'sexto':6,'séptimo':7,'octavo':8,'noveno':9,'diez':10,'once':11,'doce':12,'trece':13,'catorce':14,'quince':15,'dieciséis':16}


def article_number(article):
    label = unicodedata.normalize('NFKC', article['label'])
    m = re.search(r'(?:Artículo|Art\.)\s*(\d+)', label)
    if m:
        return int(m[1])
    m = re.search(r'Artículo\s+([a-záéíóúñ]+)', label, re.I)
    return ORDINALS.get(m[1].lower()) if m else None


def articles(source, numbers):
    return [a for a in NORMS[source]['articles'] if article_number(a) in numbers or a['id'] in numbers]


def citation(source, article, paragraph):
    short = {'ce':'CE','lopj':'LOPJ','lotc':'LOTC','estatuto':'Estatuto de Melilla','cc':'Código Civil','ley39':'Ley 39/2015','lbrl':'Ley 7/1985','igualdad':'LO 3/2007','rga':'Reglamento del Gobierno y Administración de Melilla',
             'ley40':'Ley 40/2015','lcsp':'Ley 9/2017','haciendas':'TRLRHL','ebep':'TREBEP','servicios':'Reglamento de Servicios de las Corporaciones Locales','bienes':'Reglamento de Bienes de las Entidades Locales','poblacion':'Reglamento de Población y Demarcación Territorial','subvenciones':'Ley 38/2003','asamblea':'Reglamento de la Asamblea de Melilla'}[source]
    n = article_number(article)
    suffix = re.search(r'Artículo\s+\d+\s+(bis|ter|quater)\b', article['label'], re.I)
    article_name = str(n)+((' '+suffix[1]) if suffix else '')
    ref = f'{short}, artículo {article_name}' if n else short+', '+article['label']
    m = re.match(r'(\d+)\.\s', paragraph.strip())
    letter = re.match(r'([a-z])\)\s', paragraph.strip())
    if m:
        ref += '.'+m[1]
    elif letter:
        ref += ', letra '+letter[1]
    return ref


def window_text(text, phrase, limit=440):
    """Recorta solo para leer el fragmento; conserva visible la condición del precepto."""
    if len(text) <= limit:
        return text
    pos = text.casefold().index(phrase.casefold())
    start = max(0,pos-180)
    end = min(len(text),max(pos+len(phrase)+150,start+limit))
    if start:
        next_space = text.find(' ',start)
        start = next_space+1 if next_space>=0 else start
    if end < len(text):
        next_space = text.find(' ',end)
        end = next_space if next_space>=0 else len(text)
    return ('… ' if start else '')+text[start:end]+(' …' if end<len(text) else '')


def replace_once(text, phrase, new):
    match = re.search(re.escape(phrase),text,re.I)
    assert match, (phrase,text)
    return text[:match.start()]+new+text[match.end():]


def find_seed(category, source, number, phrase, wrong1, wrong2):
    for article in articles(source,[number]):
        for paragraph in article['paragraphs']:
            m = re.search(r'(?<!\w)'+re.escape(phrase)+r'(?!\w)',paragraph,re.I)
            if m:
                return {'category':category,'source':source,'article':article,'paragraph':paragraph,
                        'phrase':m[0],'wrong':[wrong1,wrong2],'ref':citation(source,article,paragraph)}
    raise ValueError(f'Anclaje sin respaldo: {source} {number} {phrase}')


def automatic_seeds(model):
    seeds=[]
    used=set()
    used_changes=set()
    extra=model.get('extraSeeds',[])
    default_target=model.get('seedsPerCategory',4)
    vocab = VOCAB+EXTRA_VOCAB if model.get('block')=='specific' else VOCAB
    compiled_vocab = [(re.compile(r'(?<!\w)'+re.escape(p)+r'(?!\w)',re.I),p,w1,w2) for p,w1,w2 in vocab]
    for category,title,source,numbers,scenario in model['categories']:
        target=model.get('seedCounts',{}).get(category,default_target)
        candidates=[]
        for row in extra:
            if row[0]==category:
                candidates.append(find_seed(*row))
        for article in articles(source,numbers):
            for paragraph in article['paragraphs']:
                if len(paragraph)<18 or '(Suprimido)' in paragraph:
                    continue
                filter_pattern=model.get('paragraphFilters',{}).get(category)
                if filter_pattern and not re.search(filter_pattern,paragraph,re.I):
                    continue
                for pattern,phrase,wrong1,wrong2 in compiled_vocab:
                    for m in pattern.finditer(paragraph):
                        # No convierte la numeración de una lista en una pregunta.
                        if m[0].isdigit() and (m.start()<4 or paragraph[max(0,m.start()-9):m.start()].strip().casefold().endswith(('artículo','art.'))):
                            continue
                        candidates.append({'category':category,'source':source,'article':article,'paragraph':paragraph,
                                           'phrase':m[0],'wrong':[wrong1,wrong2],'ref':citation(source,article,paragraph)})
                        break
        selected=[]
        # Primero diversidad de artículos, después diversidad de cláusulas.
        for pass_no in range(3):
            for candidate in candidates:
                key=(candidate['source'],candidate['article']['id'],candidate['paragraph'],candidate['phrase'].casefold())
                change=(candidate['source'],candidate['article']['id'],tuple(sorted(replace_once(candidate['paragraph'],candidate['phrase'],w).casefold() for w in candidate['wrong'])))
                if key in used or change in used_changes:
                    continue
                if pass_no==0 and any(s['article']['id']==candidate['article']['id'] for s in selected):
                    continue
                if pass_no==1 and any(s['paragraph']==candidate['paragraph'] for s in selected):
                    continue
                selected.append(candidate);used.add(key);used_changes.add(change)
                if len(selected)==target:
                    break
            if len(selected)==target:
                break
        if len(selected)!=target:
            raise ValueError(f'Tema {model["topic"]}, {category}: solo {len(selected)} anclajes; requiere curación adicional.')
        seeds.extend(selected)
    assert len(seeds)==sum(model.get('seedCounts',{}).get(c[0],default_target) for c in model['categories'])
    return seeds


def truth_fragment(seed, limit=320):
    return window_text(seed['paragraph'],seed['phrase'],limit)


def text_fingerprint(value):
    plain=unicodedata.normalize('NFD',value.casefold())
    return ''.join(c for c in plain if c.isalnum())


def combine_reference(*seeds):
    return '; '.join(dict.fromkeys(s['ref'] for s in seeds))


def build_questions(model,seeds,manual=False):
    questions=[]
    topic=model['topic']
    categories={c[0]:c for c in model['categories']}
    rng=random.Random(20241119+topic*100)
    keys=[0]*80+[1]*80+[2]*80
    rng.shuffle(keys)
    for index,seed in enumerate(seeds):
        same=[s for s in seeds if s['category']==seed['category'] and s['paragraph']!=seed['paragraph']]
        others=same+[s for s in seeds if s['category']!=seed['category'] and s['paragraph']!=seed['paragraph']]
        assert len(others)>=2
        # Evita que la extensión de la opción dé una pista de corrección.
        nearby=sorted(others,key=lambda s:abs(len(truth_fragment(s,320))-len(truth_fragment(seed,320))))
        nearby=nearby[:min(12,len(nearby))]
        partner=nearby[(index*3)%len(nearby)]
        partner2=nearby[(index*3+1)%len(nearby)]
        if text_fingerprint(truth_fragment(partner2,320))==text_fingerprint(truth_fragment(partner,320)):
            partner2=next(s for s in others if text_fingerprint(truth_fragment(s,320))!=text_fingerprint(truth_fragment(partner,320)))
        fragment=truth_fragment(seed)
        masked=replace_once(fragment,seed['phrase'],'[____]')
        bad1=replace_once(fragment,seed['phrase'],seed['wrong'][0])
        bad2=replace_once(fragment,seed['phrase'],seed['wrong'][1])
        other1=truth_fragment(partner,320)
        other2=truth_fragment(partner2,320)
        base=seed['ref']
        correct_reason=f'El texto establece «{seed["phrase"]}». Lee la regla con su sujeto y sus condiciones: «{fragment}».'
        reasons=[f'Esta alternativa sustituye «{seed["phrase"]}» por «{w}» y cambia el fragmento previsto en {base}.' for w in seed['wrong']]
        compact = manual or (model.get('compactVariants') and sum(s['category']==seed['category'] for s in seeds)==8)
        if compact:
            category_info=categories[seed['category']]
            scenario=category_info[2] if manual else category_info[4]
            local_number=sum(1 for s in seeds[:index+1] if s['category']==seed['category'])
            variants=[0,1,5]
            evaluation_variants={0 if local_number==5 else 1 if local_number==6 else 5} if local_number>4 else set()
        else:
            scenario=categories[seed['category']][4]
            variants=range(6)
            local_number=sum(1 for s in seeds[:index+1] if s['category']==seed['category'])
            evaluation_variants={local_number+1}
        for variant in variants:
            ref=base
            if variant==0:
                stem=f'Conforme a {base}, complete correctamente el fragmento: «{masked}».'
                options=[seed['phrase'],*seed['wrong']]
                why=['Es el término previsto por el precepto.',*reasons]
                answer=0;skill='literalidad';difficulty=1
            elif variant==1:
                stem=f'Una ficha de {categories[seed["category"]][1].lower()} recoge: «{bad1}». ¿Qué redacción corrige el error conforme a {base}?'
                options=[fragment,bad1,bad2]
                why=['Restituye el contenido normativo del precepto.',*reasons]
                answer=0;skill='distincion';difficulty=2
            elif variant==2:
                stem=f'En relación con {base}, se contrasta este fragmento: «{masked}». ¿Cuál de estas formulaciones reproduce correctamente el precepto?'
                options=[fragment,bad2,bad1]
                why=['Mantiene la previsión y sus condiciones tal como las recoge el precepto.',reasons[1],reasons[0]]
                answer=0;skill='distincion';difficulty=2
            elif variant==3:
                stem=f'{scenario} El fragmento que debe revisarse es «{masked}». ¿Qué redacción recoge literalmente {base}?'
                options=[fragment,bad1,bad2]
                why=['La regla aplicable mantiene sujeto, condición y consecuencia del texto.',*reasons]
                answer=0;skill='aplicacion';difficulty=2
            elif variant==4:
                ref=combine_reference(seed,partner)
                stem=f'Al contrastar {ref}, se revisa «{masked}». ¿Qué combinación reproduce correctamente las DOS previsiones normativas?'
                other_bad=replace_once(other1,partner['phrase'],partner['wrong'][0])
                options=[fragment+' / '+other1,bad1+' / '+other1,fragment+' / '+other_bad]
                why=['Ambos fragmentos conservan las previsiones de los artículos citados.',reasons[0],f'La segunda regla dice «{partner["phrase"]}», no «{partner["wrong"][0]}» ({partner["ref"]}).']
                answer=0;skill='distincion';difficulty=3
            else:
                ref=combine_reference(seed,partner,partner2)
                stem=f'Señale la redacción INCORRECTA respecto de la literalidad de {ref}, dentro del bloque de {categories[seed["category"]][1].lower()}.'
                options=[bad2,other1,other2]
                why=[f'Es la afirmación incorrecta: {reasons[1]}',f'Este fragmento sí conserva lo previsto en {partner["ref"]}: «{partner["phrase"]}».',f'Este fragmento sí conserva lo previsto en {partner2["ref"]}: «{partner2["phrase"]}».']
                answer=0;skill='distincion';difficulty=3
            position=keys[len(questions)]
            positions=[1,2];rng.shuffle(positions)
            reordered=[None]*3;reasons_reordered=[None]*3
            reordered[position]=options[answer];reasons_reordered[position]=why[answer]
            available=[p for p in range(3) if p!=position]
            for dest,old in zip(available,positions):
                reordered[dest]=options[old];reasons_reordered[dest]=why[old]
            question={'id':f't{topic}q{len(questions)+1:03d}','stem':stem,'options':reordered,'answer':position,
                      'explanation':correct_reason,'wrongReasons':reasons_reordered,'reference':ref,
                      'sourceUrl':NORMS[seed['source']]['url']+'#'+seed['article']['id'],'origin':'original',
                      'topic':seed['category'],'articles':[article_number(seed['article'])] if article_number(seed['article']) else [],
                      'difficulty':difficulty,'skill':skill,'evaluation':variant in evaluation_variants,
                      'audit':{'source':seed['source'],'articleId':seed['article']['id'],'paragraph':seed['paragraph'],
                               'phrase':seed['phrase'],'contrasts':seed['wrong'],'variant':variant,
                               'related':[{'source':s['source'],'articleId':s['article']['id'],'paragraph':s['paragraph']} for s in [seed,partner,partner2]]}}
            notices={note['text'] for s in [seed,partner,partner2]
                     for note in s['article'].get('notes',[])}
            if notices:
                question['explanation']+=' Alcance jurídico: este ejercicio contrasta la literalidad. La STC 55/2018 limita el ámbito competencial de estos preceptos; consulta la nota oficial del artículo antes de trasladarlos a un procedimiento concreto.'
            questions.append(question)
    assert len(questions)==240
    assert Counter(q['answer'] for q in questions)=={0:80,1:80,2:80}
    assert sum(q['evaluation'] for q in questions)==40
    fingerprints=Counter((q['stem'],tuple(sorted(q['options']))) for q in questions)
    if any(n>1 for n in fingerprints.values()):
        duplicated=[q for q in questions if fingerprints[(q['stem'],tuple(sorted(q['options']))) ]>1]
        Path('/tmp/opo-duplicate-questions.json').write_text(json.dumps(duplicated,ensure_ascii=False,indent=2))
        raise ValueError(f'Tema {topic}: duplicados reales; ver /tmp/opo-duplicate-questions.json')
    for category in categories:
        rows=[q for q in questions if q['topic']==category]
        assert len(rows)==24,(topic,category,len(rows))
        assert sum(q['evaluation'] for q in rows)==4
    return questions


def highlighted(text,seeds):
    text=html.escape(text)
    # Una sola sustitución por posición: evita marcas anidadas.
    phrases=sorted(set(s['phrase'] for s in seeds),key=len,reverse=True)
    pattern='|'.join(re.escape(html.escape(p)) for p in phrases)
    return re.sub(r'(?<!\w)(?:'+pattern+r')(?!\w)',lambda m:'<mark>'+m[0]+'</mark>',text,flags=re.I) if pattern else text


def generate_lesson(model,seeds):
    topic=model['topic'];sections=[]
    origin_notice = ('Cada pregunta identifica su procedencia: original de entrenamiento o transcripción de un cuestionario oficial relacionado. Ese antecedente no predice el próximo examen.'
                     if model.get('block')=='specific' else 'Las preguntas son de entrenamiento: no se atribuyen a exámenes oficiales ni predicen el próximo cuestionario.')
    rows=''.join('<tr><td>'+html.escape(c[1])+'</td><td>'+html.escape(c[2] if len(c)==3 else c[4])+'</td></tr>' for c in model['categories'])
    sections.append({'id':f't{topic}-mapa','title':'Mapa del tema y objetivos de dominio','html':
      '<p>'+html.escape(model['overview'])+'</p><p>La fuente es la normativa aplicable a la fecha de las bases, <mark>19 de noviembre de 2024</mark>. '+origin_notice+'</p>'
      '<div class="table-wrap"><table><caption>Qué distinguir en cada bloque</caption><thead><tr><th>Bloque</th><th>Objetivo</th></tr></thead><tbody>'+rows+'</tbody></table></div>'})
    seen=set()
    for category in model['categories']:
        key,title=category[:2]
        subset=[s for s in seeds if s['category']==key]
        guide=category[2] if len(category)==3 else category[4]
        body='<p>'+html.escape(guide)+'</p>'
        body+='<h3>Reglas que debes recuperar sin mirar</h3><ul>'
        for seed in subset:
            body+='<li><strong>'+html.escape(seed['ref'])+'</strong>: '+highlighted(window_text(seed['paragraph'],seed['phrase'],560),subset)+'</li>'
        body+='</ul><h3>Texto normativo para contrastar</h3>'
        related=[]
        if len(category)==3:
            related=list({(s['source'],s['article']['id']):(s['source'],s['article']) for s in subset}.values())
        else:
            related=[(category[2],a) for a in articles(category[2],category[3])]
        for source,article in related:
            marker=(source,article['id'])
            if marker in seen:
                continue
            seen.add(marker)
            body+='<details><summary>'+html.escape(article['label'])+' · '+html.escape(NORMS[source]['name'])+'</summary><blockquote class="legal-text" data-source="'+source+'" data-article="'+article['id']+'">'
            body+=''.join('<p>'+highlighted(paragraph,subset)+'</p>' for paragraph in article['paragraphs'])
            body+='</blockquote>'
            for note in article.get('notes',[]):
                body+='<p class="source-note"><strong>Nota oficial sobre la aplicación del precepto:</strong> '+html.escape(note['text'])+' <a href="'+html.escape(note['url'],quote=True)+'" target="_blank" rel="noopener noreferrer">Consultar la sentencia</a>.</p>'
            body+='<p class="source-note"><a href="'+html.escape(NORMS[source]['url']+'#'+article['id'],quote=True)+'" target="_blank" rel="noopener noreferrer">Consultar el artículo en su fuente oficial</a>.</p></details>'
        body+='<div class="practice"><strong>Cómo comprobar el dominio:</strong> identifica sujeto, verbo de obligación o posibilidad, requisito, excepción, órgano y plazo. Explica por qué las dos alternativas cercanas cambian la regla. Después reconstruye el fragmento con la norma cerrada.</div>'
        sections.append({'id':f't{topic}-{key}','title':title,'html':body})
    # Completa las normas del ámbito aunque no hayan sido elegidas como anclaje de test.
    supplementary=[]
    for source,numbers in model['scope'].items():
        supplementary.extend((source,a) for a in articles(source,numbers) if (source,a['id']) not in seen)
    if supplementary:
        body='<p>Estos preceptos completan el ámbito del tema. Que una regla no sea el centro de un test no la excluye del programa.</p>'
        for source,article in supplementary:
            body+='<details><summary>'+html.escape(article['label'])+'</summary><blockquote class="legal-text" data-source="'+source+'" data-article="'+article['id']+'">'+''.join('<p>'+html.escape(p)+'</p>' for p in article['paragraphs'])+'</blockquote></details>'
        sections.append({'id':f't{topic}-complemento','title':'Lectura que completa el programa','html':body})
    traps=[{'wrong':replace_once(window_text(s['paragraph'],s['phrase'],350),s['phrase'],s['wrong'][0]),
            'right':window_text(s['paragraph'],s['phrase'],350),'reference':s['ref']} for s in seeds[::2]]
    mastery=[f'Explico sin apuntes {c[1].lower()}, identifico sus condiciones y corrijo una formulación cercana pero errónea.' for c in model['categories']]
    mastery+=['Distingo lo que la norma permite de lo que obliga, sin suprimir excepciones.','Puedo justificar cada error con su precepto y resolver el contraste de nuevo después de 48 horas.']
    return {'title':model['title'],'sections':sections,'traps':traps,'mastery':mastery}


def write_model(model):
    topic=model['topic'];manual='seeds' in model
    seeds=[find_seed(*row) for row in model['seeds']] if manual else automatic_seeds(model)
    questions=build_questions(model,seeds,manual)
    lesson=generate_lesson(model,seeds)
    solved=[]
    for case in [c for c in CASES if c[0]==topic]:
        _,category,source,number,stem,right,wrong1,wrong2,reason=case[:9]
        evaluated=case[9] if len(case)>9 else False
        article=articles(source,[number])[0]
        ref=citation(source,article,article['paragraphs'][0])
        ref=re.sub(r'\.(\d+)$','',ref)
        candidates=[q for q in questions if q['topic']==category and q['evaluation']==evaluated and q['audit']['variant']!='case']
        question=next((q for q in candidates if q['audit']['variant']==1),candidates[0])
        position=question['answer'];options=[None]*3;why=[None]*3
        options[position]=right;why[position]='Es la opción correcta. '+reason
        for dest,wrong in zip([p for p in range(3) if p!=position],[wrong1,wrong2]):
            options[dest]=wrong;why[dest]=f'La afirmación «{wrong}» no es la regla aplicable. {reason}'
        question.update({'stem':stem,'options':options,'wrongReasons':why,'explanation':reason,
                         'reference':ref,'sourceUrl':NORMS[source]['url']+'#'+article['id'],
                         'articles':[article_number(article)] if article_number(article) else [],
                         'difficulty':3,'skill':'aplicacion',
                         'audit':{'variant':'case','source':source,'articleId':article['id'],'paragraph':' '.join(article['paragraphs'])}})
        if not evaluated:
            solved.append('<article class="trap-card"><h3>'+html.escape(stem)+'</h3><p><strong>Solución:</strong> '+html.escape(right)+'</p><p>'+html.escape(reason)+'</p><p class="source-note">'+html.escape(ref)+' · Caso didáctico original.</p></article>')
    lesson['sections'].append({'id':f't{topic}-casos','title':'Casos resueltos: aplicar y justificar','html':'<p>Usa estos casos para explicar la regla, su condición y el error de la alternativa cercana. Son ejemplos de entrenamiento, no preguntas atribuidas a una convocatoria.</p>'+''.join(solved)})
    related=[]
    if (DATA/'antecedentes-especifica.json').exists():
        related=[r for r in json.loads((DATA/'antecedentes-especifica.json').read_text()) if r['topic']==topic]
    if related:
        exam=json.loads((ROOT/'docs/examenes/administrativo-melilla-2026.json').read_text())
        for row in related:
            original=next(q for q in exam['questions'] if q['number']==row['number'])
            article=articles(row['source'],[row['article']])[0]
            slot=next(q for q in questions if q['topic']==row['category'] and not q['evaluation'] and q['origin']=='original' and q['audit']['variant']!='case' and q['answer']==row['answer'])
            slot.update({'stem':original['stem'],'options':original['options'],'answer':row['answer'],
                         'explanation':row['explanation'],'wrongReasons':row['reasons'],
                         'reference':citation(row['source'],article,article['paragraphs'][0]),
                         'sourceUrl':NORMS[row['source']]['url']+'#'+article['id'],'origin':'official',
                         'articles':[article_number(article)] if article_number(article) else [],
                         'difficulty':2,'skill':'distincion',
                         'exam':{'body':'Administrativo CAM, 16 plazas','date':exam['date'],'number':row['number'],
                                 'url':exam['sourceURL'],'local':'docs/examenes/administrativo-melilla-2026.pdf',
                                 'answerStatus':'Solución por revisión normativa propia; no se ha localizado la plantilla definitiva.'},
                         'audit':{'variant':'official','source':row['source'],'articleId':article['id'],'paragraph':' '.join(article['paragraphs'])}})
        body='<p>Se ha comprobado el cuestionario oficial de <strong>Administrativo CAM, 6 de septiembre de 2026</strong>, un cuerpo distinto de Auxiliar. Se acredita la aparición de estas preguntas en ese documento; no demuestra frecuencia histórica ni garantiza su repetición. Las soluciones del cuaderno son una revisión normativa propia, sin plantilla definitiva localizada.</p><ul>'
        for row in related:
            original=next(q for q in exam['questions'] if q['number']==row['number'])
            body+='<li><strong>Pregunta '+str(row['number'])+'</strong>: '+html.escape(original['stem'])+' <a href="docs/examenes/administrativo-melilla-2026.pdf">Ver cuestionario oficial</a>.</li>'
        body+='</ul>'
        lesson['sections'].append({'id':f't{topic}-antecedentes','title':'Preguntas oficiales de un proceso relacionado','html':body})
    directory=ROOT/f'js/tema{topic}';directory.mkdir(exist_ok=True)
    tests=[[c[1],c[2] if len(c)==3 else c[4],[c[0]]] for c in model['categories']]
    config={'topic':topic,'storageKey':f'opo-melilla-tema{topic}-v1','title':model['title'],'scopeText':model['subtitle'],
            **({'block':'specific','officialTopic':model['officialTopic']} if model.get('block')=='specific' else {}),
            'topicLabels':{c[0]:c[1] for c in model['categories']},'tests':tests,
            'sourceFiles':[{'name':NORMS[s]['title'],'url':NORMS[s]['url'],'version':NORMS[s]['version'],'local':f'docs/normas/{s}.html',
                            **({'note':NORMS[s]['versionNote']} if NORMS[s].get('versionNote') else {})} for s in model['scope']]}
    assert Counter(q['answer'] for q in questions)=={0:80,1:80,2:80}
    assert len({(q['stem'],tuple(sorted(q['options']))) for q in questions})==240
    for filename,name,data in [('config.js','OPO_CONFIG',config),('lesson.js','OPO_LESSON',lesson)]:
        (directory/filename).write_text('window.'+name+' = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n')
    for index,letter in enumerate('ABC'):
        (directory/f'questions-{letter.lower()}.js').write_text('window.OPO_QUESTIONS_'+letter+' = '+json.dumps(questions[index*80:(index+1)*80],ensure_ascii=False,indent=2)+';\n')
    audit={'topic':topic,'sourceRules':len(seeds),'questions':len(questions),'categories':Counter(q['topic'] for q in questions),
           'anchors':[{'category':s['category'],'reference':s['ref'],'phrase':s['phrase'],'contrasts':s['wrong']} for s in seeds]}
    (ROOT/'docs'/f'AUDITORIA-TEMA-{topic}.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
    print(f'Tema {topic}: {len(seeds)} contrastes normativos, 240 preguntas, 10 tests + evaluación.',flush=True)


if __name__=='__main__':
    import sys
    requested={int(x) for x in sys.argv[1:]} if len(sys.argv)>1 else None
    models=[json.loads((DATA/'tema3.json').read_text()),*json.loads((DATA/'catalogo.json').read_text())]
    if (DATA/'catalogo-especifica.json').exists():
        models+=json.loads((DATA/'catalogo-especifica.json').read_text())
    for model in models:
        if requested is None or model['topic'] in requested:
            write_model(model)
