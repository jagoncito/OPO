/* Aplicación sin dependencias: funciona directamente desde index.html. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bank = [...window.OPO_QUESTIONS_A, ...window.OPO_QUESTIONS_B, ...window.OPO_QUESTIONS_C];
  const byId = new Map(bank.map(q => [q.id, q]));
  const key = 'opo-melilla-tema1-v1';
  let persistent = true;
  let state = {attempts: [], active: null, mastery: []};
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && Array.isArray(saved.attempts)) state = {...state, ...saved};
    localStorage.setItem(key, JSON.stringify(state));
  } catch (_) { persistent = false; }
  let currentView = 'lesson';
  let active = null;
  let result = null;
  let interval = null;
  let pendingConfirmation = null;
  let confirmationFocus = null;
  const confidenceLabels = {high:'Seguro', medium:'Entre dos', low:'Duda'};
  const topicLabels = {caracteristicas:'Características', fechas:'Fechas', estructura:'Estructura', art1:'Artículo 1', art2:'Artículo 2', art3:'Artículo 3', art4:'Artículo 4', art5:'Artículo 5', art6:'Artículo 6', art7:'Artículo 7', art8:'Artículo 8', art9:'Artículo 9', integracion:'Integración'};
  const labels = [
    ['Fundamentos y fechas', 'Reconocer los rasgos de la Constitución y distinguir los cuatro hitos de 1978.', ['caracteristicas','fechas']],
    ['Mapa de la Constitución', 'Situar títulos y artículos; evitar confundir el Título Preliminar con el Título I.', ['estructura']],
    ['Estado, soberanía y lenguas', 'Separar valores, forma política, autonomía y régimen lingüístico.', ['art1','art2','art3']],
    ['Bandera y capital', 'Precisar proporciones, uso de enseñas y la literalidad de los artículos 4 y 5.', ['art4','art5']],
    ['Partidos, sindicatos y asociaciones', 'Identificar sujetos, funciones, límites y exigencia democrática.', ['art6','art7']],
    ['Fuerzas Armadas', 'Distinguir composición, misión y reserva de ley orgánica.', ['art8']],
    ['Sujeción y participación', 'Diferenciar los mandatos de los apartados 1 y 2 del artículo 9.', ['art9']],
    ['Garantías del artículo 9.3', 'Aplicar jerarquía, publicidad, seguridad jurídica e interdicción de la arbitrariedad.', ['art9']],
    ['Precisión bajo presión', 'Resolver los matices que quedan pendientes y conectar varios artículos.', ['integracion']],
    ['Repaso integrado', 'Consolidar el bloque con las preguntas restantes, sin repetir las anteriores.', ['integracion','art9']]
  ];
  let remaining = bank.filter(q => !q.evaluation);
  const tests = labels.map(([title, purpose, topics], index) => {
    const affinity = q => {
      let value = topics.includes(q.topic) ? 10 : 0;
      if (index === 6 && /9[.,]3/.test(q.reference)) value -= 8;
      if (index === 7 && /9[.,]3/.test(q.reference)) value += 8;
      return value;
    };
    const candidates = [...remaining].sort((a,b) => affinity(b)-affinity(a) || a.difficulty-b.difficulty || a.id.localeCompare(b.id));
    const ids = candidates.slice(0,20).map(q => q.id);
    remaining = remaining.filter(q => !ids.includes(q.id));
    return {id:`t${index+1}`, title:`${index+1}. ${title}`, purpose, ids, seconds:Math.ceil(ids.length*5400/85), evaluation:false};
  });
  tests.push({id:'evaluation', title:'Evaluación final', purpose:'40 preguntas reservadas para comprobar transferencia y retención. Hazla después del repaso, sin consultar el tema.', ids:bank.filter(q => q.evaluation).map(q => q.id), seconds:Math.ceil(40*5400/85), evaluation:true});
  const testById = new Map(tests.map(t => [t.id,t]));
  const timeText = seconds => `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
  const scoreText = value => value.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2});
  function persist() {
    if (!persistent) return;
    try { localStorage.setItem(key, JSON.stringify(state)); }
    catch (_) { persistent = false; storageMessage(); }
  }
  function storageMessage() {
    $('storage-status').textContent = persistent ? 'Tu progreso se guarda en este navegador. Puedes exportarlo desde Progreso.' : 'El navegador no permite guardar aquí. El intento funciona, pero exporta el progreso antes de cerrar.';
  }
  function switchView(view) {
    currentView = view;
    ['lesson','training','progress','sources'].forEach(name => {
      $(`view-${name}`).hidden = name !== view;
      document.querySelectorAll(`[data-view="${name}"]`).forEach(el => {
        el.classList.toggle('active', name === view);
        if (name === view) el.setAttribute('aria-current','page'); else el.removeAttribute('aria-current');
      });
    });
    if (view === 'training') renderTests();
    if (view === 'progress') renderProgress();
    $('exam-panel').hidden = true;
    $('result-panel').hidden = true;
    syncModal();
  }
  function syncModal() {
    const confirming = !$('confirm-panel').hidden;
    const examining = !$('exam-panel').hidden;
    const reviewing = !$('result-panel').hidden;
    $('app-shell').inert = confirming || examining || reviewing;
    $('exam-panel').inert = confirming;
    $('result-panel').inert = confirming;
    document.body.style.overflow = confirming || examining || reviewing ? 'hidden' : '';
  }
  function renderLesson() {
    $('lesson-content').innerHTML = window.OPO_LESSON.sections.map(s => `<section id="${escape(s.id)}" class="lesson-section"><h2>${escape(s.title)}</h2>${s.html}</section>`).join('');
    $('lesson-nav').innerHTML = window.OPO_LESSON.sections.map(s => `<a href="#${escape(s.id)}">${escape(s.title)}</a>`).join('');
    $('trap-list').innerHTML = window.OPO_LESSON.traps.map(t => `<article class="trap-card"><p><strong>Confusión:</strong> ${escape(t.wrong)}</p><p><strong>Regla correcta:</strong> ${escape(t.right)}</p><small>${escape(t.reference)}</small></article>`).join('');
    $('mastery-list').innerHTML = window.OPO_LESSON.mastery.map((text,i) => `<label class="mastery-item"><input type="checkbox" data-mastery="${i}" ${state.mastery.includes(i)?'checked':''}> ${escape(text)}</label>`).join('');
    $('mastery-list').addEventListener('change', e => {
      if (!e.target.matches('[data-mastery]')) return;
      const id = Number(e.target.dataset.mastery);
      state.mastery = e.target.checked ? [...new Set([...state.mastery,id])] : state.mastery.filter(x => x !== id);
      persist();
    });
  }
  function renderTests() {
    const resume = state.active;
    $('test-grid').innerHTML = (resume ? `<article class="test-card resume-card"><h3>Intento en curso</h3><p>${escape(testById.get(resume.testId)?.title || 'Test')} · el reloj sigue contando aunque cierres la página.</p><button data-resume>Continuar intento</button></article>` : '') + tests.map(test => {
      const attempts = state.attempts.filter(a => a.testId === test.id);
      const last = attempts[attempts.length-1];
      const counts = {};
      test.ids.forEach(id => { const topic = byId.get(id).topic; counts[topic] = (counts[topic]||0)+1; });
      return `<article class="test-card"><span class="badge">${test.evaluation?'Evaluación · preguntas inéditas':'Entrenamiento'}</span><h3>${escape(test.title)}</h3><p>${escape(test.purpose)}</p><p><strong>${test.ids.length} preguntas · ${timeText(test.seconds)}</strong></p><p class="coverage">Contenido real: ${Object.entries(counts).map(([topic,n])=>`${escape(topicLabels[topic])} (${n})`).join(', ')}.</p><p>${last?`Última nota: <strong>${scoreText(last.score)}/10</strong> · ${attempts.length} intento(s).`:'Sin intentos.'}</p><button data-start="${test.id}">${last?'Volver a realizar':'Empezar'}</button></article>`;
    }).join('');
  }
  function confirmAction(message, action) {
    confirmationFocus = document.activeElement;
    pendingConfirmation = action;
    $('confirm-message').textContent = message;
    $('confirm-panel').hidden = false;
    syncModal();
    $('confirm-accept').focus();
  }
  function startTest(testId) {
    const test = testById.get(testId);
    if (!test) return;
    if (state.active) {
      confirmAction('Hay un intento en curso. Si empiezas otro, ese intento se corregirá con sus respuestas actuales y quedará registrado.', () => {
        active = state.active; finishTest('replaced',false); createAttempt(test);
      });
    } else createAttempt(test);
  }
  function createAttempt(test) {
    active = {id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,testId:test.id,ids:[...test.ids],answers:{},confidence:{},flags:[],index:0,startedAt:Date.now(),deadline:Date.now()+test.seconds*1000};
    state.active = active; persist(); openExam();
  }
  function openExam() {
    active = state.active;
    if (!active || !testById.has(active.testId) || active.ids.some(id=>!byId.has(id))) {
      state.active = null; persist(); renderTests(); return;
    }
    ['lesson','training','progress','sources'].forEach(name => $(`view-${name}`).hidden = true);
    $('result-panel').hidden = true;
    $('exam-panel').hidden = false;
    syncModal();
    $('exam-title').textContent = testById.get(active.testId).title;
    $('exam-meta').textContent = `${active.ids.length} preguntas · tres opciones · errores −½ acierto · sin reservas. Formato reducido de entrenamiento.`;
    $('exam-notice').textContent = 'El reloj no se pausa al salir. Las soluciones se muestran después de entregar. La confianza es opcional y no cambia la nota.';
    renderQuestion();
    clearInterval(interval); interval = setInterval(tick,250); tick();
    $('exam-panel').scrollIntoView({block:'start'});
    $('exam-panel').focus();
  }
  function tick() {
    if (!active) return;
    const remainingSeconds = Math.max(0,Math.ceil((active.deadline-Date.now())/1000));
    $('timer').textContent = timeText(remainingSeconds);
    $('timer').classList.toggle('urgent',remainingSeconds <= 120);
    if (remainingSeconds === 0) {
      pendingConfirmation = null; $('confirm-panel').hidden = true;
      finishTest('timeout');
    }
  }
  function renderQuestion() {
    const id = active.ids[active.index];
    const q = byId.get(id);
    const answered = active.ids.filter(x=>Number.isInteger(active.answers[x])).length;
    $('question-status').textContent = `Pregunta ${active.index+1} de ${active.ids.length} · ${answered} respondidas · ${active.ids.length-answered} en blanco`;
    $('exam-progress').max = active.ids.length; $('exam-progress').value = answered;
    $('question-card').innerHTML = `<fieldset><legend>${active.index+1}. ${escape(q.stem)}</legend>${q.options.map((option,i)=>`<label class="option"><input type="radio" name="answer" value="${i}" ${active.answers[id]===i?'checked':''}><span><strong>${String.fromCharCode(65+i)}.</strong> ${escape(option)}</span></label>`).join('')}</fieldset><button class="button-secondary" id="clear-answer">Dejar en blanco</button><fieldset class="confidence-group"><legend>¿Con qué confianza respondes? <small>(opcional)</small></legend>${Object.entries(confidenceLabels).map(([value,label])=>`<label><input type="radio" name="confidence" value="${value}" ${active.confidence[id]===value?'checked':''}> ${label}</label>`).join('')}</fieldset>`;
    $('question-map').innerHTML = active.ids.map((questionId,i)=>`<button class="question-chip ${i===active.index?'current':''} ${Number.isInteger(active.answers[questionId])?'answered':''} ${active.flags.includes(questionId)?'flagged':''}" data-question="${i}" aria-label="Pregunta ${i+1}${Number.isInteger(active.answers[questionId])?', respondida':', en blanco'}${active.flags.includes(questionId)?', marcada':''}" ${i===active.index?'aria-current="step"':''}>${i+1}${active.flags.includes(questionId)?' ★':''}</button>`).join('');
    $('prev-question').disabled = active.index===0;
    $('next-question').disabled = active.index===active.ids.length-1;
    $('flag-question').textContent = active.flags.includes(id)?'Quitar marca ★':'Marcar para revisar ☆';
    $('flag-question').setAttribute('aria-pressed',String(active.flags.includes(id)));
  }
  function calculate(attempt) {
    let correct=0, errors=0, blanks=0;
    attempt.ids.forEach(id => {
      if (!Number.isInteger(attempt.answers[id])) blanks++;
      else if (attempt.answers[id]===byId.get(id).answer) correct++;
      else errors++;
    });
    const raw = (correct-errors/2)*10/attempt.ids.length;
    return {correct,errors,blanks,raw,score:Math.max(0,raw)};
  }
  function finishTest(reason='submitted',show=true) {
    if (!active) return;
    clearInterval(interval); interval = null;
    result = {...active,...calculate(active),finishedAt:Date.now(),reason};
    if (!state.attempts.some(a=>a.id===result.id)) state.attempts.push(result);
    state.active = null; active = null; persist();
    if (show) renderResult(result);
  }
  function renderResult(attempt) {
    result = attempt;
    clearInterval(interval);
    ['lesson','training','progress','sources'].forEach(name => $(`view-${name}`).hidden = true);
    $('exam-panel').hidden = true; $('result-panel').hidden = false;
    syncModal();
    const elapsed = Math.max(0, Math.min(attempt.finishedAt,attempt.deadline)-attempt.startedAt);
    const highErrors = attempt.ids.filter(id=>attempt.confidence[id]==='high' && Number.isInteger(attempt.answers[id]) && attempt.answers[id]!==byId.get(id).answer).length;
    const reasonText = {timeout:'Entregado automáticamente al agotarse el tiempo.',replaced:'Corregido al empezar otro intento.',submitted:'Entregado por ti.'}[attempt.reason] || 'Intento registrado.';
    $('result-summary').innerHTML = `<h2>${escape(testById.get(attempt.testId).title)} · resultado</h2><p>${reasonText}</p><div class="result-score">${scoreText(attempt.score)}<small>/10</small></div><div class="stats-grid"><div class="stat"><strong>${attempt.correct}</strong><span>Aciertos</span></div><div class="stat"><strong>${attempt.errors}</strong><span>Errores</span></div><div class="stat"><strong>${attempt.blanks}</strong><span>En blanco</span></div><div class="stat"><strong>${timeText(Math.floor(elapsed/1000))}</strong><span>Tiempo usado</span></div></div><p>Nota = 10/${attempt.ids.length} × (${attempt.correct} − ${attempt.errors}/2). ${attempt.raw<0?`El cálculo da ${scoreText(attempt.raw)}; se muestra 0 por la escala 0–10.`:''}</p><p>${attempt.score>=5?'Alcanzas el mínimo de referencia de 5.':'No alcanzas el mínimo de referencia de 5.'} Este test reducido no predice tu posición ni una plaza.</p><p><strong>${highErrors} error(es) con confianza alta.</strong> Repasa primero las reglas que creías dominar. Como meta de preparación, busca ≥9 y pocos errores con confianza alta en preguntas nuevas, y comprueba de nuevo después de 48 horas.</p>`;
    $('result-review').innerHTML = attempt.ids.map((id,i)=>{
      const q=byId.get(id), answer=attempt.answers[id], answered=Number.isInteger(answer), correct=answer===q.answer;
      return `<article class="review-card ${correct?'correct':answered?'incorrect':'blank'}"><h3>${i+1}. ${escape(q.stem)}</h3><p><span class="badge">Creada para entrenamiento · dificultad ${q.difficulty}/3</span></p><p><strong>${correct?'Acierto':answered?'Error':'En blanco'}</strong> · Tu respuesta: ${answered?String.fromCharCode(65+answer):'ninguna'} · Correcta: ${String.fromCharCode(65+q.answer)}${attempt.confidence[id]?` · Confianza: ${confidenceLabels[attempt.confidence[id]]}`:''}</p><ol type="A">${q.options.map((option,j)=>`<li class="${j===q.answer?'correct-answer':''}">${escape(option)} ${j===q.answer?'✓':''}<p class="option-reason">${escape(q.wrongReasons[j])}</p></li>`).join('')}</ol><div class="explanation"><strong>Justificación</strong><p>${escape(q.explanation)}</p><p><a href="${escape(q.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escape(q.reference)}</a></p><p class="source-note">Pregunta original, sin atribución a un examen oficial. Consulta el estado de verificación en Fuentes.</p></div></article>`;
    }).join('');
    $('result-panel').scrollIntoView({block:'start'});
    $('result-panel').focus();
  }
  function renderProgress() {
    const completed=state.attempts;
    const recent=completed.slice(-5);
    const average=recent.length?recent.reduce((sum,a)=>sum+a.score,0)/recent.length:0;
    const latest = new Map();
    completed.forEach(a=>a.ids.forEach(id=>latest.set(id,{id,answer:a.answers[id],confidence:a.confidence[id]})));
    const groups={};
    latest.forEach(item=>{
      const q=byId.get(item.id); if(!q) return;
      const row=groups[q.topic] ||= {n:0,correct:0,errors:0,blanks:0,highErrors:0};
      row.n++; if(!Number.isInteger(item.answer)) row.blanks++; else if(item.answer===q.answer) row.correct++; else {row.errors++; if(item.confidence==='high')row.highErrors++;}
    });
    const rows=Object.entries(groups).sort(([,a],[,b])=>(a.correct-a.errors/2)/a.n-(b.correct-b.errors/2)/b.n);
    const confidenceStats=Object.entries(confidenceLabels).map(([value,label])=>{
      const items=[...latest.values()].filter(i=>i.confidence===value&&Number.isInteger(i.answer));
      const n=items.length, correct=items.filter(i=>i.answer===byId.get(i.id).answer).length;
      return `<tr><th scope="row">${label}</th><td>${n}</td><td>${n?Math.round(correct/n*100)+' %':'—'}</td></tr>`;
    }).join('');
    $('progress-content').innerHTML = `<div class="stats-grid"><div class="stat"><strong>${completed.length}</strong><span>Intentos completados</span></div><div class="stat"><strong>${recent.length?scoreText(average):'—'}</strong><span>Media de últimos ${recent.length||0}</span></div><div class="stat"><strong>${latest.size}/240</strong><span>Preguntas distintas realizadas</span></div></div><h3>Prioridad de repaso</h3><p>Se usa tu última respuesta a cada pregunta, para no inflar resultados al repetir. Las preguntas en blanco también cuentan. Los temas no realizados siguen pendientes.</p>${rows.length?`<div class="table-wrap"><table><thead><tr><th>Bloque</th><th>Vistas</th><th>Aciertos</th><th>Errores</th><th>Blancas</th><th>Errores seguros</th></tr></thead><tbody>${rows.map(([topic,g])=>`<tr><th scope="row">${escape(topicLabels[topic])}</th><td>${g.n}</td><td>${g.correct}</td><td>${g.errors}</td><td>${g.blanks}</td><td>${g.highErrors}</td></tr>`).join('')}</tbody></table></div><p><strong>Empieza por ${escape(topicLabels[rows[0][0]])}.</strong> Explica la regla sin mirar, contrástala con el artículo y vuelve a comprobarla después de 48 horas.</p>`:'<p>Completa el primer test para obtener un diagnóstico.</p>'}<h3>Tu confianza frente a tu acierto real</h3><div class="table-wrap"><table><thead><tr><th>Confianza</th><th>Respondidas</th><th>Acierto observado</th></tr></thead><tbody>${confidenceStats}</tbody></table></div><p>Con tres opciones y penalización de medio acierto, responder tiene valor esperado positivo si tu probabilidad de acertar supera 1/3. El azar puro tiene valor esperado cero. Una muestra pequeña no demuestra tu probabilidad real: usa estos datos para calibrar, no para prometer resultados.</p><h3>Historial</h3>${completed.length?`<ol class="history-list">${[...completed].reverse().map(a=>`<li><button class="button-secondary" data-result="${escape(a.id)}">${escape(testById.get(a.testId)?.title||a.testId)} · ${scoreText(a.score)}/10 · ${new Date(a.finishedAt).toLocaleString('es-ES')}</button></li>`).join('')}</ol>`:'<p>Aún no hay intentos.</p>'}<div class="toolbar"><button id="export-progress">Exportar progreso</button><label class="button-secondary import-label">Importar progreso <input id="import-progress" type="file" accept="application/json,.json"></label><button id="reset-progress" class="button-secondary">Borrar progreso</button></div><p id="import-status" role="status"></p>`;
  }
  function renderSources() {
    $('sources-content').innerHTML = `<h2>Fuentes y alcance de la preparación</h2><ul class="source-list"><li><strong>Programa verificado en el PDF aportado:</strong> BOME n.º 6227, 19 de noviembre de 2024, artículo 1011, base décima, páginas 3169–3170. Tema general 1: «La Constitución Española de 1978: Características, estructura y Título Preliminar». <a href="docs/bases-2024.pdf">Abrir las bases locales</a>.</li><li><strong>Formato del primer ejercicio verificado:</strong> BOME extraordinario n.º 44, 7 de octubre de 2026, artículo 119: 80 preguntas + 5 reservas, tres opciones, 90 minutos, valor 0,125 por pregunta y errores −½ acierto. Examen: 25 de octubre de 2026 a las 18:00. <a href="docs/aviso-examen-2026.pdf">Abrir el anuncio local</a>.</li><li><strong>Referencia normativa:</strong> <a href="https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229" target="_blank" rel="noopener noreferrer">Constitución Española, BOE-A-1978-31229</a>. Se indican artículos y apartados en las correcciones. La consulta directa del BOE no ha podido completarse por el bloqueo de red del entorno; el texto didáctico se ha revisado internamente, sin presentar esa revisión como cotejo externo.</li><li><strong>Exámenes anteriores:</strong> no se ha podido verificar ningún cuestionario anterior en esta entrega. Las 240 preguntas son originales. No se señalan preguntas «caídas», frecuencias ni años sin evidencia.</li></ul><div class="explanation"><p>Las bases aportadas convocaban 22 plazas; el anuncio de 2026 habla de 30. No se ha localizado la modificación intermedia. Este tema coincide con el programa aportado, pero no se afirma haber comprobado la continuidad de todo el programa.</p><p>Estas bases fijan la normativa a la fecha de publicación de la convocatoria. Para este tema, las reformas de los artículos 13, 135 y 49 quedan fuera del Título Preliminar y no alteran los artículos 1–9.</p><p>Los tests por tema son una adaptación: 20 preguntas en 21:11 y evaluación de 40 en 42:22. No son simulacros completos ni incluyen reservas. El criterio ≥9 es una meta de preparación, no un corte oficial ni una garantía de plaza.</p></div><h3>Cómo usar el material</h3><ol><li>Lee cada sección y explica su regla sin mirar.</li><li>Realiza los tests por orden, sin consultar el texto durante el intento.</li><li>Revisa todas las justificaciones; prioriza errores con confianza alta.</li><li>Después de 48 horas, vuelve a explicar las reglas y realiza preguntas pendientes.</li><li>Reserva la evaluación para comprobar transferencia a preguntas nuevas.</li></ol><p>Todo funciona localmente. No se envían respuestas, notas ni archivos a un servidor. Los enlaces externos y PDF se abren solo cuando los seleccionas.</p>`;
  }
  document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',()=>{
    if(active) { state.active=active;persist(); }
    switchView(el.dataset.view);
  }));
  $('test-grid').addEventListener('click',e=>{
    const start=e.target.closest('[data-start]'); if(start)startTest(start.dataset.start);
    if(e.target.closest('[data-resume]'))openExam();
  });
  $('question-card').addEventListener('change',e=>{
    if(!active) return;
    const id=active.ids[active.index];
    if(e.target.name==='answer')active.answers[id]=Number(e.target.value);
    if(e.target.name==='confidence')active.confidence[id]=e.target.value;
    const name=e.target.name, value=e.target.value;
    persist(); renderQuestion();
    $('question-card').querySelector(`input[name="${name}"][value="${value}"]`)?.focus();
  });
  $('question-card').addEventListener('click',e=>{
    if(e.target.id==='clear-answer'&&active){delete active.answers[active.ids[active.index]];persist();renderQuestion();}
  });
  $('question-map').addEventListener('click',e=>{const button=e.target.closest('[data-question]');if(button&&active){active.index=Number(button.dataset.question);persist();renderQuestion();}});
  $('prev-question').addEventListener('click',()=>{if(active&&active.index>0){active.index--;persist();renderQuestion();}});
  $('next-question').addEventListener('click',()=>{if(active&&active.index<active.ids.length-1){active.index++;persist();renderQuestion();}});
  $('flag-question').addEventListener('click',()=>{if(!active)return;const id=active.ids[active.index];active.flags=active.flags.includes(id)?active.flags.filter(x=>x!==id):[...active.flags,id];persist();renderQuestion();});
  $('save-exit').addEventListener('click',()=>{persist();switchView('training');});
  $('submit-test').addEventListener('click',()=>{if(active){const blanks=active.ids.filter(id=>!Number.isInteger(active.answers[id])).length;confirmAction(`¿Entregar el test? Quedan ${blanks} pregunta(s) en blanco. Después se mostrarán todas las soluciones.`,()=>finishTest('submitted'));}});
  $('confirm-accept').addEventListener('click',()=>{const action=pendingConfirmation;pendingConfirmation=null;$('confirm-panel').hidden=true;syncModal();if(action)action();});
  $('confirm-cancel').addEventListener('click',()=>{pendingConfirmation=null;$('confirm-panel').hidden=true;syncModal();if(confirmationFocus?.isConnected)confirmationFocus.focus();});
  $('retry-test').addEventListener('click',()=>{if(result)startTest(result.testId);});
  $('result-back').addEventListener('click',()=>switchView('training'));
  $('progress-content').addEventListener('click',e=>{
    const button=e.target.closest('[data-result]');if(button){const attempt=state.attempts.find(a=>a.id===button.dataset.result);if(attempt)renderResult(attempt);}
    if(e.target.id==='export-progress'){
      const blob=new Blob([JSON.stringify({version:1,...state},null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='opo-tema1-progreso.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }
    if(e.target.id==='reset-progress')confirmAction('¿Borrar los intentos y el progreso de este navegador? Exporta antes si quieres conservarlos.',()=>{clearInterval(interval);active=null;state={attempts:[],active:null,mastery:[]};persist();renderProgress();document.querySelectorAll('[data-mastery]').forEach(input=>input.checked=false);});
  });
  function validAttempt(a) {
    if(!a||!testById.has(a.testId)||!Array.isArray(a.ids)||a.ids.length!==testById.get(a.testId).ids.length||new Set(a.ids).size!==a.ids.length||a.ids.some(id=>!testById.get(a.testId).ids.includes(id)))return false;
    if(!a.answers||!a.confidence||!Array.isArray(a.flags)||typeof a.id!=='string'||!Number.isFinite(a.startedAt)||!Number.isFinite(a.deadline))return false;
    return Object.entries(a.answers).every(([id,value])=>a.ids.includes(id)&&Number.isInteger(value)&&value>=0&&value<=2)&&Object.entries(a.confidence).every(([id,value])=>a.ids.includes(id)&&['high','medium','low'].includes(value))&&a.flags.every(id=>a.ids.includes(id));
  }
  $('progress-content').addEventListener('change',async e=>{
    if(e.target.id!=='import-progress'||!e.target.files.length)return;
    try {
      const imported=JSON.parse(await e.target.files[0].text());
      if(imported.version!==1||!Array.isArray(imported.attempts)||imported.attempts.length>10000||imported.attempts.some(a=>!validAttempt(a)||!Number.isFinite(a.finishedAt))||!Array.isArray(imported.mastery)||imported.mastery.some(i=>!Number.isInteger(i)||i<0||i>=window.OPO_LESSON.mastery.length)||imported.active&&!validAttempt(imported.active))throw new Error('Formato o preguntas incompatibles.');
      confirmAction('La importación reemplazará el progreso actual. ¿Continuar?',()=>{
        clearInterval(interval);active=null;
        state={attempts:imported.attempts.map(a=>({...a,...calculate(a)})),active:imported.active?{...imported.active,index:Math.max(0,Math.min(Number(imported.active.index)||0,imported.active.ids.length-1))}:null,mastery:imported.mastery};persist();renderProgress();document.querySelectorAll('[data-mastery]').forEach(input=>input.checked=state.mastery.includes(Number(input.dataset.mastery)));$('import-status').textContent='Progreso importado.';
      });
    }catch(error){$('import-status').textContent=`No se ha importado: ${error.message}`;}
  });
  document.addEventListener('keydown',e=>{
    const modal = !$('confirm-panel').hidden ? $('confirm-panel') : !$('exam-panel').hidden ? $('exam-panel') : !$('result-panel').hidden ? $('result-panel') : null;
    if(!modal)return;
    if(e.key==='Escape'&&modal===$('confirm-panel'))$('confirm-cancel').click();
    if(e.key==='Tab'){
      const controls=[...modal.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),[tabindex="0"]')].filter(el=>el.offsetParent!==null);
      const first=controls[0],last=controls[controls.length-1];
      if(e.shiftKey&&(document.activeElement===first||document.activeElement===modal)){e.preventDefault();last?.focus();}
      else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===modal)){e.preventDefault();first?.focus();}
    }
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&active)tick();});
  window.addEventListener('beforeunload',persist);
  window.OPO_APP = Object.freeze({tests:tests.map(t=>({...t,ids:[...t.ids]})),calculate,bankSize:bank.length});
  storageMessage();renderLesson();renderSources();switchView('lesson');
})();
