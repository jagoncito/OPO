import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const topic of [1,2]) {
  const context = vm.createContext({window: {}});
  const directory = topic === 1 ? "js" : "js/tema2";
  const files = topic === 1 ? ["lesson.js","questions-a.js","questions-b.js","questions-c.js"] : ["config.js","lesson-a.js","lesson-b.js","lesson.js","questions-a.js","questions-b.js","questions-c.js"];
  for (const file of files) {
    vm.runInContext(fs.readFileSync(path.join(root,directory,file),'utf8'), context, {filename:file});
  }
  const lesson = context.window.OPO_LESSON;
  assert.ok(lesson.sections.length >= (topic===1?9:15));
  assert.equal(new Set(lesson.sections.map(s=>s.id)).size,lesson.sections.length);
  assert.ok(lesson.traps.length >= 20);
  if(topic===1) assert.ok(lesson.sections.some(s=>s.html.includes('169 artículos')));
  const bank = ['A','B','C'].flatMap(s=>context.window[`OPO_QUESTIONS_${s}`]);
  assert.equal(bank.length,240);
  assert.equal(new Set(bank.map(q=>q.id)).size,240);
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
  assert.equal(new Set(bank.map(q=>normalize(q.stem))).size,240,'Enunciados duplicados');
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
    assert.equal(url.hostname,'www.boe.es',q.id);
    assert.equal(url.searchParams.get('id'),'BOE-A-1978-31229',q.id);
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
  if(topic===2){
    for(const category of Object.keys(context.window.OPO_CONFIG.topicLabels)){
      const group=bank.filter(q=>q.topic===category);
      assert.equal(group.length,24,category);
      assert.equal(group.filter(q=>q.evaluation).length,4,category);
    }
    for(let article=10;article<=55;article++)assert.ok(bank.some(q=>q.articles.includes(article)),`Artículo sin preguntas: ${article}`);
    for(let option=0;option<3;option++)assert.equal(bank.filter(q=>q.answer===option).length,80,'Claves equilibradas');
  }
  console.log(`Tema ${topic}: 240 preguntas distintas, 200 de entrenamiento + 40 de evaluación; cobertura y explicaciones verificadas.`);
}
