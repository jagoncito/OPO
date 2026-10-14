import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (let topic=1;topic<=16;topic++) {
  const context = vm.createContext({window: {}});
  const directory = topic === 1 ? "js" : `js/tema${topic}`;
  const files = topic === 1 ? ["lesson.js","questions-a.js","questions-b.js","questions-c.js"] : topic === 2 ? ["config.js","lesson-a.js","lesson-b.js","lesson.js","questions-a.js","questions-b.js","questions-c.js"] : ["config.js","lesson.js","questions-a.js","questions-b.js","questions-c.js"];
  for (const file of files) {
    vm.runInContext(fs.readFileSync(path.join(root,directory,file),'utf8'), context, {filename:file});
  }
  const lesson = context.window.OPO_LESSON;
  assert.ok(lesson.sections.length >= (topic===1?9:topic===2?15:12));
  assert.equal(new Set(lesson.sections.map(s=>s.id)).size,lesson.sections.length);
  assert.ok(lesson.traps.length >= 20);
  if(topic===1) assert.ok(lesson.sections.some(s=>s.html.includes('169 artículos')));
  const bank = ['A','B','C'].flatMap(s=>context.window[`OPO_QUESTIONS_${s}`]);
  assert.equal(bank.length,240);
  assert.equal(new Set(bank.map(q=>q.id)).size,240);
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
  assert.equal(new Set(bank.map(q=>topic<=2?normalize(q.stem):normalize(q.stem)+JSON.stringify(q.options.map(normalize).sort()))).size,240,'Preguntas duplicadas');
  assert.equal(bank.filter(q=>q.evaluation).length,40);
  assert.equal(bank.filter(q=>!q.evaluation).length,200);
  for (const q of bank) {
    assert.ok(q.stem.length > 15,q.id);
    assert.equal(q.options.length,3,q.id);
    assert.equal(new Set(q.options.map(normalize)).size,3,`Opciones duplicadas: ${q.id}`);
    assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3,q.id);
    assert.ok(q.explanation.length>35,`Justificación insuficiente: ${q.id}`);
    assert.equal(q.wrongReasons.length,3,q.id);
    assert.ok(q.wrongReasons.every(s=>typeof s==='string'&&s.length>10),q.id);
    assert.equal(q.origin,'original',q.id);
    assert.ok(q.reference.length>5,q.id);
    const url = new URL(q.sourceUrl);
    assert.ok(['www.boe.es','www.melilla.es'].includes(url.hostname),q.id);
    if(topic<=2)assert.equal(url.searchParams.get('id'),'BOE-A-1978-31229',q.id);
    if(topic===2){
      assert.equal(url.searchParams.get('p'),'20240217',q.id);
      assert.ok(Array.isArray(q.articles)&&q.articles.length>0,q.id);
      assert.ok(q.articles.every(n=>Number.isInteger(n)&&n>=10&&n<=55),q.id);
    }
    assert.ok([1,2,3].includes(q.difficulty),q.id);
    assert.ok(['literalidad','distincion','aplicacion'].includes(q.skill),q.id);
    assert.equal(typeof q.evaluation,'boolean',q.id);
  }
  if(topic===1) for (const category of ['estructura','fechas','caracteristicas','art1','art2','art3','art4','art5','art6','art7','art8','art9','integracion']) {
    assert.ok(bank.some(q=>q.topic===category),`Bloque ausente: ${category}`);
  }
  if(topic>=2){
    for(const category of Object.keys(context.window.OPO_CONFIG.topicLabels)){
      const group=bank.filter(q=>q.topic===category);
      assert.equal(group.length,24,category);
      assert.equal(group.filter(q=>q.evaluation).length,4,category);
    }
    if(topic===2)for(let article=10;article<=55;article++)assert.ok(bank.some(q=>q.articles.includes(article)),`Artículo sin preguntas: ${article}`);
    for(let option=0;option<3;option++)assert.equal(bank.filter(q=>q.answer===option).length,80,'Claves equilibradas');
  }
  if(topic>=3){
    assert.equal(bank.filter(q=>q.audit.variant==='case').length,3,'Casos prácticos originales');
    assert.ok(new Set(bank.filter(q=>q.evaluation).map(q=>q.audit.variant)).size>=3,'Evaluación con varias tareas');
  }
  console.log(`Tema ${topic}: 240 preguntas, 200 de entrenamiento + 40 de evaluación; cobertura, claves y explicaciones verificadas.`);
}
