import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({window: {}});
for (const file of ['lesson.js','questions-a.js','questions-b.js','questions-c.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,'js',file),'utf8'), context, {filename:file});
}
const lesson = context.window.OPO_LESSON;
assert.ok(lesson.sections.length >= 9);
assert.equal(new Set(lesson.sections.map(s=>s.id)).size,lesson.sections.length);
assert.ok(lesson.traps.length >= 20);
assert.ok(lesson.sections.some(s=>s.html.includes('169 artículos')));
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
  assert.equal(q.sourceUrl,'https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229',q.id);
  assert.ok([1,2,3].includes(q.difficulty),q.id);
  assert.ok(['literalidad','distincion','aplicacion'].includes(q.skill),q.id);
  assert.equal(typeof q.evaluation,'boolean',q.id);
}
for (const topic of ['estructura','fechas','caracteristicas','art1','art2','art3','art4','art5','art6','art7','art8','art9','integracion']) {
  assert.ok(bank.some(q=>q.topic===topic),`Bloque ausente: ${topic}`);
}
console.log('Contenido: 240 preguntas distintas, 200 de entrenamiento + 40 de evaluación, 3 opciones y explicación por opción. Estructura y cobertura correctas.');
