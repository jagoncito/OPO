/* Tema 2 · Título I de la CE. Parte A: estructura y artículos 10–29.
 * El texto literal se ha cotejado con BOE, versión 17-02-2024,
 * vigente en la fecha normativa de referencia de las bases: 19-11-2024.
 */
(() => {
  'use strict';

  const articles = {
  "10": [
    "1. La dignidad de la persona, los derechos inviolables que le son inherentes, el libre desarrollo de la personalidad, el respeto a la ley y a los derechos de los demás son fundamento del orden político y de la paz social.",
    "2. Las normas relativas a los derechos fundamentales y a las libertades que la Constitución reconoce se interpretarán de conformidad con la Declaración Universal de Derechos Humanos y los tratados y acuerdos internacionales sobre las mismas materias ratificados por España."
  ],
  "11": [
    "1. La nacionalidad española se adquiere, se conserva y se pierde de acuerdo con lo establecido por la ley.",
    "2. Ningún español de origen podrá ser privado de su nacionalidad.",
    "3. El Estado podrá concertar tratados de doble nacionalidad con los países iberoamericanos o con aquellos que hayan tenido o tengan una particular vinculación con España. En estos mismos países, aun cuando no reconozcan a sus ciudadanos un derecho recíproco, podrán naturalizarse los españoles sin perder su nacionalidad de origen."
  ],
  "12": [
    "Los españoles son mayores de edad a los dieciocho años."
  ],
  "13": [
    "1. Los extranjeros gozarán en España de las libertades públicas que garantiza el presente Título en los términos que establezcan los tratados y la ley.",
    "2. Solamente los españoles serán titulares de los derechos reconocidos en el artículo 23, salvo lo que, atendiendo a criterios de reciprocidad, pueda establecerse por tratado o ley para el derecho de sufragio activo y pasivo en las elecciones municipales.",
    "3. La extradición sólo se concederá en cumplimiento de un tratado o de la ley, atendiendo al principio de reciprocidad. Quedan excluidos de la extradición los delitos políticos, no considerándose como tales los actos de terrorismo.",
    "4. La ley establecerá los términos en que los ciudadanos de otros países y los apátridas podrán gozar del derecho de asilo en España."
  ],
  "14": [
    "Los españoles son iguales ante la ley, sin que pueda prevalecer discriminación alguna por razón de nacimiento, raza, sexo, religión, opinión o cualquier otra condición o circunstancia personal o social."
  ],
  "15": [
    "Todos tienen derecho a la vida y a la integridad física y moral, sin que, en ningún caso, puedan ser sometidos a tortura ni a penas o tratos inhumanos o degradantes. Queda abolida la pena de muerte, salvo lo que puedan disponer las leyes penales militares para tiempos de guerra."
  ],
  "16": [
    "1. Se garantiza la libertad ideológica, religiosa y de culto de los individuos y las comunidades sin más limitación, en sus manifestaciones, que la necesaria para el mantenimiento del orden público protegido por la ley.",
    "2. Nadie podrá ser obligado a declarar sobre su ideología, religión o creencias.",
    "3. Ninguna confesión tendrá carácter estatal. Los poderes públicos tendrán en cuenta las creencias religiosas de la sociedad española y mantendrán las consiguientes relaciones de cooperación con la Iglesia Católica y las demás confesiones."
  ],
  "17": [
    "1. Toda persona tiene derecho a la libertad y a la seguridad. Nadie puede ser privado de su libertad, sino con la observancia de lo establecido en este artículo y en los casos y en la forma previstos en la ley.",
    "2. La detención preventiva no podrá durar más del tiempo estrictamente necesario para la realización de las averiguaciones tendentes al esclarecimiento de los hechos, y, en todo caso, en el plazo máximo de setenta y dos horas, el detenido deberá ser puesto en libertad o a disposición de la autoridad judicial.",
    "3. Toda persona detenida debe ser informada de forma inmediata, y de modo que le sea comprensible, de sus derechos y de las razones de su detención, no pudiendo ser obligada a declarar. Se garantiza la asistencia de abogado al detenido en las diligencias policiales y judiciales, en los términos que la ley establezca.",
    "4. La ley regulará un procedimiento de «habeas corpus» para producir la inmediata puesta a disposición judicial de toda persona detenida ilegalmente. Asimismo, por ley se determinará el plazo máximo de duración de la prisión provisional."
  ],
  "18": [
    "1. Se garantiza el derecho al honor, a la intimidad personal y familiar y a la propia imagen.",
    "2. El domicilio es inviolable. Ninguna entrada o registro podrá hacerse en él sin consentimiento del titular o resolución judicial, salvo en caso de flagrante delito.",
    "3. Se garantiza el secreto de las comunicaciones y, en especial, de las postales, telegráficas y telefónicas, salvo resolución judicial.",
    "4. La ley limitará el uso de la informática para garantizar el honor y la intimidad personal y familiar de los ciudadanos y el pleno ejercicio de sus derechos."
  ],
  "19": [
    "Los españoles tienen derecho a elegir libremente su residencia y a circular por el territorio nacional.",
    "Asimismo, tienen derecho a entrar y salir libremente de España en los términos que la ley establezca. Este derecho no podrá ser limitado por motivos políticos o ideológicos."
  ],
  "20": [
    "1. Se reconocen y protegen los derechos:",
    "a) A expresar y difundir libremente los pensamientos, ideas y opiniones mediante la palabra, el escrito o cualquier otro medio de reproducción.",
    "b) A la producción y creación literaria, artística, científica y técnica.",
    "c) A la libertad de cátedra.",
    "d) A comunicar o recibir libremente información veraz por cualquier medio de difusión. La ley regulará el derecho a la cláusula de conciencia y al secreto profesional en el ejercicio de estas libertades.",
    "2. El ejercicio de estos derechos no puede restringirse mediante ningún tipo de censura previa.",
    "3. La ley regulará la organización y el control parlamentario de los medios de comunicación social dependientes del Estado o de cualquier ente público y garantizará el acceso a dichos medios de los grupos sociales y políticos significativos, respetando el pluralismo de la sociedad y de las diversas lenguas de España.",
    "4. Estas libertades tienen su límite en el respeto a los derechos reconocidos en este Título, en los preceptos de las leyes que lo desarrollen y, especialmente, en el derecho al honor, a la intimidad, a la propia imagen y a la protección de la juventud y de la infancia.",
    "5. Sólo podrá acordarse el secuestro de publicaciones, grabaciones y otros medios de información en virtud de resolución judicial."
  ],
  "21": [
    "1. Se reconoce el derecho de reunión pacífica y sin armas. El ejercicio de este derecho no necesitará autorización previa.",
    "2. En los casos de reuniones en lugares de tránsito público y manifestaciones se dará comunicación previa a la autoridad, que sólo podrá prohibirlas cuando existan razones fundadas de alteración del orden público, con peligro para personas o bienes."
  ],
  "22": [
    "1. Se reconoce el derecho de asociación.",
    "2. Las asociaciones que persigan fines o utilicen medios tipificados como delito son ilegales.",
    "3. Las asociaciones constituidas al amparo de este artículo deberán inscribirse en un registro a los solos efectos de publicidad.",
    "4. Las asociaciones sólo podrán ser disueltas o suspendidas en sus actividades en virtud de resolución judicial motivada.",
    "5. Se prohíben las asociaciones secretas y las de carácter paramilitar."
  ],
  "23": [
    "1. Los ciudadanos tienen el derecho a participar en los asuntos públicos, directamente o por medio de representantes, libremente elegidos en elecciones periódicas por sufragio universal.",
    "2. Asimismo, tienen derecho a acceder en condiciones de igualdad a las funciones y cargos públicos, con los requisitos que señalen las leyes."
  ],
  "24": [
    "1. Todas las personas tienen derecho a obtener la tutela efectiva de los jueces y tribunales en el ejercicio de sus derechos e intereses legítimos, sin que, en ningún caso, pueda producirse indefensión.",
    "2. Asimismo, todos tienen derecho al Juez ordinario predeterminado por la ley, a la defensa y a la asistencia de letrado, a ser informados de la acusación formulada contra ellos, a un proceso público sin dilaciones indebidas y con todas las garantías, a utilizar los medios de prueba pertinentes para su defensa, a no declarar contra sí mismos, a no confesarse culpables y a la presunción de inocencia.",
    "La ley regulará los casos en que, por razón de parentesco o de secreto profesional, no se estará obligado a declarar sobre hechos presuntamente delictivos."
  ],
  "25": [
    "1. Nadie puede ser condenado o sancionado por acciones u omisiones que en el momento de producirse no constituyan delito, falta o infracción administrativa, según la legislación vigente en aquel momento.",
    "2. Las penas privativas de libertad y las medidas de seguridad estarán orientadas hacia la reeducación y reinserción social y no podrán consistir en trabajos forzados. El condenado a pena de prisión que estuviere cumpliendo la misma gozará de los derechos fundamentales de este Capítulo, a excepción de los que se vean expresamente limitados por el contenido del fallo condenatorio, el sentido de la pena y la ley penitenciaria. En todo caso, tendrá derecho a un trabajo remunerado y a los beneficios correspondientes de la Seguridad Social, así como al acceso a la cultura y al desarrollo integral de su personalidad.",
    "3. La Administración civil no podrá imponer sanciones que, directa o subsidiariamente, impliquen privación de libertad."
  ],
  "26": [
    "Se prohíben los Tribunales de Honor en el ámbito de la Administración civil y de las organizaciones profesionales."
  ],
  "27": [
    "1. Todos tienen el derecho a la educación. Se reconoce la libertad de enseñanza.",
    "2. La educación tendrá por objeto el pleno desarrollo de la personalidad humana en el respeto a los principios democráticos de convivencia y a los derechos y libertades fundamentales.",
    "3. Los poderes públicos garantizan el derecho que asiste a los padres para que sus hijos reciban la formación religiosa y moral que esté de acuerdo con sus propias convicciones.",
    "4. La enseñanza básica es obligatoria y gratuita.",
    "5. Los poderes públicos garantizan el derecho de todos a la educación, mediante una programación general de la enseñanza, con participación efectiva de todos los sectores afectados y la creación de centros docentes.",
    "6. Se reconoce a las personas físicas y jurídicas la libertad de creación de centros docentes, dentro del respeto a los principios constitucionales.",
    "7. Los profesores, los padres y, en su caso, los alumnos intervendrán en el control y gestión de todos los centros sostenidos por la Administración con fondos públicos, en los términos que la ley establezca.",
    "8. Los poderes públicos inspeccionarán y homologarán el sistema educativo para garantizar el cumplimiento de las leyes.",
    "9. Los poderes públicos ayudarán a los centros docentes que reúnan los requisitos que la ley establezca.",
    "10. Se reconoce la autonomía de las Universidades, en los términos que la ley establezca."
  ],
  "28": [
    "1. Todos tienen derecho a sindicarse libremente. La ley podrá limitar o exceptuar el ejercicio de este derecho a las Fuerzas o Institutos armados o a los demás Cuerpos sometidos a disciplina militar y regulará las peculiaridades de su ejercicio para los funcionarios públicos. La libertad sindical comprende el derecho a fundar sindicatos y a afiliarse al de su elección, así como el derecho de los sindicatos a formar confederaciones y a fundar organizaciones sindicales internacionales o a afiliarse a las mismas. Nadie podrá ser obligado a afiliarse a un sindicato.",
    "2. Se reconoce el derecho a la huelga de los trabajadores para la defensa de sus intereses. La ley que regule el ejercicio de este derecho establecerá las garantías precisas para asegurar el mantenimiento de los servicios esenciales de la comunidad."
  ],
  "29": [
    "1. Todos los españoles tendrán el derecho de petición individual y colectiva, por escrito, en la forma y con los efectos que determine la ley.",
    "2. Los miembros de las Fuerzas o Institutos armados o de los Cuerpos sometidos a disciplina militar podrán ejercer este derecho sólo individualmente y con arreglo a lo dispuesto en su legislación específica."
  ]
};

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
  }

  function legal(number) {
    return `<details><summary>Artículo ${number} · texto literal del BOE</summary>
      <blockquote class="legal-text">${articles[String(number)].map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</blockquote>
      <p>Fuente: <a href="https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229&amp;p=20240217&amp;tn=1#a${number}" target="_blank" rel="noopener noreferrer">Constitución Española, artículo ${number}, BOE</a>. La explicación didáctica se presenta fuera del texto literal.</p>
    </details>`;
  }

  window.OPO_LESSON_PART_A = {
    sections: [
      {
        id: 'mapa-titulo-i',
        title: 'Mapa del Título I: localizar un derecho y conocer su protección',
        html: `
          <p>El tema 2 de la parte general comprende el <strong>Título I, «De los derechos y deberes fundamentales»</strong>, de la Constitución Española de 1978: <mark>artículos 10 a 55, ambos incluidos</mark>. Son 46 artículos distribuidos en un artículo introductorio y cinco capítulos. Estudiar solo las libertades de los artículos 15 a 29 dejaría parte del programa sin preparar.</p>
          <p>La literalidad incluida se ha cotejado con el <a href="https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229&amp;p=20240217&amp;tn=1#ti" target="_blank" rel="noopener noreferrer">texto oficial del BOE, versión de 17 de febrero de 2024</a>, vigente el 19 de noviembre de 2024, fecha normativa de referencia de las bases. Incluye la reforma del artículo 49 de 2024. El desarrollo de los artículos 30 a 55 continúa en las secciones siguientes de esta misma página.</p>
          <table><caption>Estructura completa del Título I</caption><thead><tr><th>Ubicación</th><th>Denominación o contenido</th><th>Artículos</th></tr></thead><tbody>
            <tr><td>Inicio del Título I</td><td>Dignidad e interpretación de los derechos; fuera de los capítulos.</td><td><mark>10</mark></td></tr>
            <tr><td>Capítulo I</td><td>De los españoles y los extranjeros.</td><td><mark>11–13</mark></td></tr>
            <tr><td>Capítulo II</td><td>Derechos y libertades.</td><td><mark>14–38</mark></td></tr>
            <tr><td>Inicio del Capítulo II</td><td>Igualdad ante la ley; antes de las dos secciones.</td><td><mark>14</mark></td></tr>
            <tr><td>Capítulo II, Sección 1.ª</td><td>De los derechos fundamentales y de las libertades públicas.</td><td><mark>15–29</mark></td></tr>
            <tr><td>Capítulo II, Sección 2.ª</td><td>De los derechos y deberes de los ciudadanos.</td><td><mark>30–38</mark></td></tr>
            <tr><td>Capítulo III</td><td>De los principios rectores de la política social y económica.</td><td><mark>39–52</mark></td></tr>
            <tr><td>Capítulo IV</td><td>De las garantías de las libertades y derechos fundamentales.</td><td><mark>53–54</mark></td></tr>
            <tr><td>Capítulo V</td><td>De la suspensión de los derechos y libertades.</td><td><mark>55</mark></td></tr>
          </tbody></table>
          <h3>La clasificación determina las garantías</h3>
          <p>El nombre general del Título I no atribuye a todos sus artículos idéntico régimen de protección. El artículo 53 distingue niveles; conviene conocerlos desde el principio, antes de estudiar su texto completo.</p>
          <table><caption>Mapa inicial de garantías: desarrollo en el artículo 53</caption><thead><tr><th>Grupo</th><th>Protección constitucional que debes relacionar</th></tr></thead><tbody>
            <tr><td>Capítulo II, artículos 14–38</td><td>Vinculan a todos los poderes públicos. Su ejercicio se regula por ley, que debe respetar el contenido esencial; tutela conforme al artículo 161.1.a.</td></tr>
            <tr><td>Artículo 14 y Sección 1.ª, artículos 15–29</td><td><mark>Procedimiento ante los tribunales ordinarios basado en preferencia y sumariedad y, en su caso, recurso de amparo ante el Tribunal Constitucional.</mark></td></tr>
            <tr><td>Objeción de conciencia del artículo 30</td><td>El artículo 53.2 extiende también a ella <mark>el recurso de amparo</mark>. No conviertas esta extensión en una inclusión de todo el artículo 30 en la Sección 1.ª.</td></tr>
            <tr><td>Capítulo III, artículos 39–52</td><td>Sus principios informan la legislación positiva, la práctica judicial y la actuación de los poderes públicos; solo pueden alegarse ante la jurisdicción ordinaria conforme a sus leyes de desarrollo.</td></tr>
          </tbody></table>
          <div class="callout"><strong>Precisión que evita una confusión importante:</strong> <mark>el artículo 14 está fuera de la Sección 1.ª, pero el artículo 53.2 le reconoce expresamente su protección reforzada</mark>. Tampoco debes confundir al Tribunal Constitucional con los tribunales ordinarios.</div>
          <h3>Cómo convertir este tema en rendimiento</h3>
          <p>Para cada artículo recupera sin mirar <strong>titular, derecho o deber, condiciones, excepciones y autoridad competente</strong>. Después compara conceptos cercanos: comunicación/autorización; inscripción/publicidad; detención/prisión provisional; expresión/información; sindicación/huelga.</p>
          <p>Las referencias a supuestos y distractores de esta lección son <strong>ejemplos de entrenamiento</strong>. No se presentan como preguntas de exámenes oficiales ni como frecuencias históricas. Su prioridad didáctica procede de la cantidad de condiciones y excepciones del texto, no de una predicción del examen.</p>
        `
      },
      {
        id: 'dignidad-articulo-10',
        title: 'Artículo 10: fundamento del orden político e interpretación de los derechos',
        html: `
          <h3>10.1 · Cinco elementos que fundamentan el orden político y la paz social</h3>
          <p>La Constitución identifica <mark>la dignidad de la persona, los derechos inviolables que le son inherentes, el libre desarrollo de la personalidad, el respeto a la ley y a los derechos de los demás</mark> como fundamento del orden político y de la paz social. Debes recordar tanto la dimensión de libertad individual como el respeto al ordenamiento y a otras personas.</p>
          <p><strong>Dignidad</strong> significa que la persona merece respeto por sí misma. Los derechos inviolables son inherentes a ella; el texto no los presenta como un favor que la Administración pueda conceder o retirar a voluntad. El libre desarrollo de la personalidad se estudia junto con el respeto a la ley y a los derechos ajenos, que aparecen en el mismo apartado.</p>
          <p>No confundas esta enumeración con los cuatro valores superiores del artículo 1.1: libertad, justicia, igualdad y pluralismo político. Esos valores están en el Título Preliminar; el artículo 10 abre el Título I.</p>
          <h3>10.2 · Qué instrumentos sirven para interpretar</h3>
          <p>Las normas sobre derechos fundamentales y libertades reconocidos por la Constitución se interpretan de conformidad con <mark>la Declaración Universal de Derechos Humanos y los tratados y acuerdos internacionales sobre las mismas materias ratificados por España</mark>.</p>
          <ul><li>Es una regla de <strong>interpretación</strong> de las normas relativas a esos derechos y libertades.</li><li>Para los tratados y acuerdos internacionales, recuerda dos condiciones del texto: <strong>misma materia</strong> y <strong>ratificación por España</strong>.</li><li>La fórmula no dice que cualquier tratado firmado por cualquier Estado cambie automáticamente el contenido de la Constitución.</li></ul>
          <div class="practice"><strong>Aplicación al puesto:</strong> atender una solicitud exige trato respetuoso, incluso si debe requerirse subsanación o finalmente denegarse por el órgano competente. La dignidad no elimina los requisitos legales del trámite; sí obliga a no tratar al ciudadano como un obstáculo o a humillarlo. El auxiliar informa y tramita dentro de sus funciones.</div>
          <div class="study-tip"><strong>Recuperación activa:</strong> sin consultar el artículo, escribe los cinco elementos del 10.1 y completa «tratados y acuerdos internacionales sobre… / ratificados por…». Si omites condiciones, el recuerdo está incompleto.</div>
          ${legal(10)}
        `
      },
      {
        id: 'espanoles-extranjeros-11-13',
        title: 'Artículos 11–13: nacionalidad, mayoría de edad y extranjeros',
        html: `
          <h3>Artículo 11 · Nacionalidad: adquisición, conservación, pérdida y origen</h3>
          <p>La nacionalidad española <mark>se adquiere, se conserva y se pierde de acuerdo con lo establecido por la ley</mark>. La Constitución fija una garantía concreta: <mark>ningún español de origen podrá ser privado de su nacionalidad</mark>. No sustituyas «de origen» por «cualquier español», ni confundas la privación prohibida con todos los supuestos de pérdida regulados legalmente.</p>
          <p>El Estado podrá concertar tratados de doble nacionalidad con <mark>países iberoamericanos o con aquellos que hayan tenido o tengan una particular vinculación con España</mark>. Son dos grupos, no exclusivamente los países iberoamericanos. En esos mismos países podrán naturalizarse los españoles sin perder su nacionalidad de origen, <strong>aun cuando no reconozcan a sus ciudadanos un derecho recíproco</strong>.</p>
          <div class="callout"><strong>Dos reglas de reciprocidad diferentes:</strong> el artículo 11.3 contempla esa naturalización incluso sin derecho recíproco; el artículo 13 emplea la reciprocidad para el sufragio municipal de extranjeros y para la extradición. No traslades una condición de un artículo al otro.</div>
          ${legal(11)}
          <h3>Artículo 12 · Mayoría de edad</h3>
          <p><mark>Los españoles son mayores de edad a los dieciocho años</mark>. El precepto es breve y no enumera las reglas de capacidad para todos los actos ni los requisitos concretos de ingreso en el empleo público. Esos requisitos se determinan por sus normas y por las bases aplicables.</p>
          ${legal(12)}
          <h3>Artículo 13 · Cuatro apartados, cuatro decisiones distintas</h3>
          <table><caption>Extranjeros, participación política, extradición y asilo</caption><thead><tr><th>Apartado</th><th>Regla constitucional</th><th>Condición o excepción decisiva</th></tr></thead><tbody>
            <tr><td>13.1</td><td>Los extranjeros gozan en España de las libertades públicas que garantiza este Título.</td><td><mark>En los términos que establezcan los tratados y la ley.</mark></td></tr>
            <tr><td>13.2</td><td>Solamente los españoles son titulares de los derechos del artículo 23.</td><td><mark>Por tratado o ley y atendiendo a reciprocidad</mark>, puede establecerse una excepción para el sufragio <mark>activo y pasivo en elecciones municipales</mark>.</td></tr>
            <tr><td>13.3</td><td>Extradición.</td><td>Solo en cumplimiento de <mark>un tratado o de la ley</mark>, atendiendo a reciprocidad. Se excluyen los delitos políticos; <mark>los actos de terrorismo no se consideran delitos políticos a estos efectos</mark>.</td></tr>
            <tr><td>13.4</td><td>Asilo en España.</td><td>La ley establece los términos para <mark>ciudadanos de otros países y apátridas</mark>.</td></tr>
          </tbody></table>
          <p><strong>Sufragio activo</strong> es votar; <strong>pasivo</strong> es poder ser elegido. La reforma constitucional de 1992 incorporó el pasivo al artículo 13.2. La excepción literal se refiere a <strong>elecciones municipales</strong>; no la amplíes sin fundamento a todas las elecciones. En una pregunta sobre qué dice el artículo 13.2, responde su fórmula exacta.</p>
          <p><strong>Extradición</strong> y <strong>asilo</strong> tienen objetos distintos. El artículo 13 no permite concluir que todos los extranjeros carezcan de derechos constitucionales; su apartado primero reconoce libertades públicas en los términos indicados.</p>
          <div class="practice"><strong>Aplicación al puesto:</strong> que una persona sea extranjera no permite rechazar de forma automática una solicitud o su acceso a un servicio. Debe comprobarse la norma concreta del trámite y trasladarse la cuestión al órgano competente. Para unas elecciones, hay que aplicar también la normativa electoral correspondiente; el auxiliar no decide la titularidad del derecho por intuición.</div>
          ${legal(13)}
        `
      },
      {
        id: 'igualdad-vida-creencias-14-16',
        title: 'Artículos 14–16: igualdad, vida e integridad, ideología y religión',
        html: `
          <h3>Artículo 14 · Igualdad ante la ley</h3>
          <p><mark>Los españoles son iguales ante la ley</mark>. No puede prevalecer discriminación por <mark>nacimiento, raza, sexo, religión, opinión o cualquier otra condición o circunstancia personal o social</mark>. La lista es abierta: la cláusula final impide tratarla como un catálogo de solo cinco causas.</p>
          <p>La literalidad comienza por «los españoles». No la cambies por «todos» cuando la pregunta exija el texto del artículo, ni deduzcas de ello que los extranjeros carecen de protección frente a la discriminación. Su régimen requiere considerar el artículo 13 y las normas aplicables.</p>
          <p>Relaciona tres planos: <strong>artículo 1.1</strong>, igualdad como valor superior; <strong>artículo 9.2</strong>, promoción de condiciones para una igualdad real y efectiva; <strong>artículo 14</strong>, igualdad ante la ley y prohibición de discriminación. Una diferencia de trato no se valora solo porque sea una diferencia: debe analizarse su fundamento y su adecuación al ordenamiento.</p>
          <div class="callout"><mark>El artículo 14 está en el Capítulo II, antes de sus secciones</mark>. Tiene la tutela del artículo 53.2 por mención expresa. Su protección no depende de colocarlo erróneamente en los artículos 15–29.</div>
          ${legal(14)}
          <h3>Artículo 15 · Vida e integridad física y moral</h3>
          <p><mark>Todos</mark> tienen derecho a la vida y a la integridad <mark>física y moral</mark>. El texto establece que, <mark>en ningún caso</mark>, pueden ser sometidos a tortura ni a penas o tratos inhumanos o degradantes. No reduzcas la integridad a daños físicos ni introduzcas una excepción a la prohibición de tortura por gravedad del delito.</p>
          <p><strong>Precisión sobre la pena de muerte:</strong> el texto constitucional conserva «Queda abolida la pena de muerte, salvo lo que puedan disponer las leyes penales militares para tiempos de guerra». La <a href="https://www.boe.es/buscar/act.php?id=BOE-A-1995-25714" target="_blank" rel="noopener noreferrer">Ley Orgánica 11/1995, de 27 de noviembre, de abolición de la pena de muerte en tiempo de guerra</a> abolió también esa pena en dicho ámbito. <mark>La excepción permanece en la literalidad del artículo 15; la legislación vigente ha abolido la pena también en tiempo de guerra.</mark> Son dos planos diferentes y hay que leer qué fuente pide la pregunta.</p>
          ${legal(15)}
          <h3>Artículo 16 · Libertad ideológica, religiosa y de culto</h3>
          <p>Se garantiza a <mark>individuos y comunidades</mark> la libertad ideológica, religiosa y de culto. La limitación del apartado primero se refiere a sus <strong>manifestaciones</strong>: solo la necesaria para mantener el <mark>orden público protegido por la ley</mark>. No lo conviertas en una potestad general para investigar o exigir una creencia.</p>
          <p><mark>Nadie podrá ser obligado a declarar sobre su ideología, religión o creencias</mark>. Además, <mark>ninguna confesión tendrá carácter estatal</mark>. La expresión «Estado aconfesional» es una explicación habitual de esta última regla; la fórmula literal es la anterior.</p>
          <p>Los poderes públicos tendrán en cuenta las creencias religiosas de la sociedad y mantendrán relaciones de cooperación <mark>con la Iglesia Católica y las demás confesiones</mark>. La ausencia de confesión estatal se estudia junto con esta cooperación, que también figura en el precepto.</p>
          <div class="practice"><strong>Aplicación al puesto:</strong> en un expediente no se pide a una persona que declare su religión o su ideología por simple curiosidad del empleado. La recogida de datos debe apoyarse en los requisitos y finalidades legales del trámite. Esta regla tampoco autoriza al auxiliar a crear requisitos nuevos de acceso al servicio.</div>
          ${legal(16)}
        `
      },
      {
        id: 'libertad-privacidad-circulacion-17-19',
        title: 'Artículos 17–19: libertad personal, intimidad, domicilio y circulación',
        html: `
          <h3>Artículo 17 · Libertad, seguridad y garantías de la detención</h3>
          <p><mark>Toda persona</mark> tiene derecho a la libertad y a la seguridad. La privación de libertad exige observar este artículo y los casos y formas previstos en la ley. Para la detención preventiva, el apartado segundo impone <strong>dos límites acumulativos</strong>:</p>
          <ol><li><mark>Solo el tiempo estrictamente necesario</mark> para las averiguaciones tendentes al esclarecimiento de los hechos.</li><li>En todo caso, <mark>máximo de 72 horas</mark> para poner al detenido en libertad o a disposición de la autoridad judicial.</li></ol>
          <p>Las 72 horas no son un tiempo que pueda agotarse siempre. Si las averiguaciones que justifican la detención requieren menos, no basta alegar que todavía no ha vencido el máximo. Estas son las reglas ordinarias del artículo 17.2; la suspensión excepcional de derechos se estudia en el artículo 55.</p>
          <p>La persona detenida debe ser informada <mark>inmediatamente y de forma comprensible</mark> de sus derechos y de las razones de su detención; <mark>no puede ser obligada a declarar</mark>. Se garantiza asistencia de abogado en las diligencias <strong>policiales y judiciales</strong>, en los términos legales.</p>
          <table><caption>Tres conceptos que no debes intercambiar</caption><thead><tr><th>Concepto</th><th>Qué dice el artículo 17</th><th>Confusión que evitar</th></tr></thead><tbody>
            <tr><td>Detención preventiva</td><td>Tiempo estrictamente necesario y máximo de 72 horas para libertad o disposición judicial.</td><td>«Todas las detenciones duran 72 horas».</td></tr>
            <tr><td>Habeas corpus</td><td>Procedimiento regulado por ley para la <mark>inmediata puesta a disposición judicial de toda persona detenida ilegalmente</mark>.</td><td>«Supone siempre una absolución o una puesta automática en libertad».</td></tr>
            <tr><td>Prisión provisional</td><td>Su plazo máximo de duración se determina <mark>por ley</mark>.</td><td>«Su duración máxima constitucional es de 72 horas».</td></tr>
          </tbody></table>
          ${legal(17)}
          <h3>Artículo 18 · Cuatro garantías relacionadas, cuatro reglas</h3>
          <table><caption>Intimidad, domicilio, comunicaciones e informática</caption><thead><tr><th>Apartado</th><th>Protección</th><th>Regla precisa</th></tr></thead><tbody>
            <tr><td>18.1</td><td>Honor, intimidad personal y familiar y propia imagen.</td><td>La Constitución garantiza <mark>los tres derechos</mark>; la propia imagen no se omite.</td></tr>
            <tr><td>18.2</td><td>Inviolabilidad del domicilio.</td><td>Entrada o registro con <mark>consentimiento del titular o resolución judicial</mark>, salvo <mark>flagrante delito</mark>.</td></tr>
            <tr><td>18.3</td><td>Secreto de las comunicaciones.</td><td>En especial postales, telegráficas y telefónicas; excepción: <mark>resolución judicial</mark>.</td></tr>
            <tr><td>18.4</td><td>Limitación legal del uso de la informática.</td><td>Para garantizar honor, intimidad personal y familiar y <mark>pleno ejercicio de los derechos</mark>.</td></tr>
          </tbody></table>
          <p>La redacción del artículo 18.2 dice <strong>titular</strong>; no la reduzcas sin más al propietario civil. Un domicilio constitucionalmente protegido no se trata como un espacio al que se pueda acceder por una simple instrucción administrativa. La <strong>mera sospecha</strong> no equivale al <strong>flagrante delito</strong> de la excepción constitucional.</p>
          <p>En el secreto de las comunicaciones, «en especial» introduce ejemplos, no una lista cerrada limitada a tres tecnologías. La expresión literal del 18.4 es «uso de la informática»; su aplicación actual a datos personales requiere también la legislación específica. No atribuyas al propio artículo 18 el texto de un reglamento europeo o de otra ley.</p>
          <div class="practice"><strong>Aplicación al puesto:</strong> consultar o compartir un expediente con datos personales exige una finalidad legítima y la habilitación aplicable. El hecho de trabajar en una Administración no permite entregar información a cualquier compañero o conocido. El auxiliar usa los canales autorizados y remite al órgano competente las dudas sobre acceso, intimidad y protección de datos.</div>
          ${legal(18)}
          <h3>Artículo 19 · Residencia, circulación y entrada o salida de España</h3>
          <p>El titular literal es <mark>los españoles</mark>. Tienen derecho a <mark>elegir libremente su residencia y circular por el territorio nacional</mark>, así como a <mark>entrar y salir libremente de España en los términos que la ley establezca</mark>.</p>
          <p>El artículo añade que este derecho no podrá limitarse <mark>por motivos políticos o ideológicos</mark>. «Libremente» se lee junto con las condiciones legales del texto; no debe transformarse en la afirmación de que ninguna norma puede ordenar nunca la entrada o salida. Para extranjeros hay que acudir también al artículo 13 y a la regulación aplicable.</p>
          <div class="study-tip"><strong>Comparación para recordar:</strong> 17 = libertad y detención; 18 = esfera personal, domicilio y comunicaciones; 19 = residencia y circulación. Relaciona las autoridades: disposición <strong>judicial</strong> en el 17, resolución <strong>judicial</strong> en el 18, condiciones de <strong>ley</strong> en el 19.</div>
          ${legal(19)}
        `
      },
      {
        id: 'expresion-reunion-asociacion-20-22',
        title: 'Artículos 20–22: expresión e información, reunión y asociación',
        html: `
          <h3>Artículo 20 · Expresar opiniones y comunicar información</h3>
          <table><caption>Los cuatro derechos del artículo 20.1</caption><thead><tr><th>Letra</th><th>Contenido</th><th>Detalle que distingue</th></tr></thead><tbody>
            <tr><td>a)</td><td>Expresar y difundir <mark>pensamientos, ideas y opiniones</mark>.</td><td>Mediante palabra, escrito o cualquier otro medio de reproducción.</td></tr>
            <tr><td>b)</td><td>Producción y creación <mark>literaria, artística, científica y técnica</mark>.</td><td>Recuerda las cuatro materias.</td></tr>
            <tr><td>c)</td><td><mark>Libertad de cátedra</mark>.</td><td>Figura aquí; la libertad de enseñanza está reconocida también en el artículo 27.</td></tr>
            <tr><td>d)</td><td>Comunicar o recibir libremente <mark>información veraz</mark> por cualquier medio de difusión.</td><td>La ley regulará la cláusula de conciencia y el secreto profesional en el ejercicio de estas libertades.</td></tr>
          </tbody></table>
          <p>El requisito textual de <strong>veracidad</strong> está en la información del apartado d). Las opiniones del apartado a) no se identifican por ese requisito como si fueran hechos comprobables. Esto no elimina los límites constitucionales de ambas libertades.</p>
          <p>El artículo 20.2 prohíbe restringir estos derechos mediante <mark>cualquier tipo de censura previa</mark>. El 20.5 permite acordar el secuestro de publicaciones, grabaciones y otros medios de información <mark>solo en virtud de resolución judicial</mark>. Debes distinguir la prohibición de censura previa del requisito judicial para esa medida: no son la misma figura.</p>
          <p>Respecto de los medios de comunicación social dependientes del <strong>Estado o de cualquier ente público</strong>, la ley regula organización y <mark>control parlamentario</mark>, y garantiza acceso de grupos sociales y políticos significativos, respetando el pluralismo de la sociedad y las diversas lenguas de España.</p>
          <p>Los límites del 20.4 son los derechos de este Título, las leyes que lo desarrollen y, especialmente, <mark>honor, intimidad, propia imagen y protección de la juventud y de la infancia</mark>. No confundas la enumeración destacada con una autorización ilimitada de difusión de datos de terceros.</p>
          ${legal(20)}
          <h3>Artículo 21 · Reunirse no requiere autorización previa</h3>
          <p>Se reconoce el derecho de reunión <mark>pacífica y sin armas</mark>. Su ejercicio <mark>no necesita autorización previa</mark>. Para reuniones en <mark>lugares de tránsito público</mark> y manifestaciones, se exige <mark>comunicación previa a la autoridad</mark>. Comunicar no equivale a solicitar autorización.</p>
          <p>La autoridad solo podrá prohibirlas cuando existan <mark>razones fundadas de alteración del orden público, con peligro para personas o bienes</mark>. Mantén unidos todos los elementos: razones fundadas, alteración del orden público y peligro para personas o bienes. Una expresión genérica de inconveniencia no reproduce ese presupuesto constitucional.</p>
          ${legal(21)}
          <h3>Artículo 22 · Asociación: constitución, publicidad y límites</h3>
          <p>Se reconoce el derecho de asociación. Las asociaciones que persiguen fines o utilizan medios <mark>tipificados como delito</mark> son ilegales. Se prohíben las <mark>secretas y las de carácter paramilitar</mark>.</p>
          <p>Las asociaciones constituidas al amparo del artículo deben inscribirse en un registro <mark>a los solos efectos de publicidad</mark>. La fórmula constitucional no configura esa inscripción como una autorización discrecional para permitir la asociación.</p>
          <p>La disolución o suspensión de actividades requiere <mark>resolución judicial motivada</mark>. «Judicial» y «motivada» son dos condiciones que debes conservar. Una instrucción del órgano administrativo encargado de un registro no sustituye esa resolución.</p>
          <table><caption>Reunión y asociación: tres diferencias que debes retener</caption><thead><tr><th>Cuestión</th><th>Artículo 21 · reunión</th><th>Artículo 22 · asociación</th></tr></thead><tbody>
            <tr><td>Trámite constitucional</td><td>Comunicación previa en tránsito público y manifestaciones.</td><td>Inscripción registral a los solos efectos de publicidad.</td></tr>
            <tr><td>Decisión restrictiva indicada</td><td>Prohibición por la autoridad con los presupuestos del 21.2.</td><td>Disolución o suspensión por resolución judicial motivada.</td></tr>
            <tr><td>Condiciones o prohibiciones</td><td>Reunión pacífica y sin armas.</td><td>Fines o medios delictivos; prohibición de asociaciones secretas y paramilitares.</td></tr>
          </tbody></table>
          <div class="practice"><strong>Aplicación al puesto:</strong> al registrar una comunicación sobre una manifestación, no la transformes por iniciativa propia en una solicitud de autorización. Debe remitirse a la autoridad competente conforme al procedimiento. Si se plantea disolver una asociación, el auxiliar no sustituye la resolución judicial por una decisión de registro.</div>
          ${legal(22)}
        `
      },
      {
        id: 'participacion-tutela-sanciones-23-25',
        title: 'Artículos 23–25: participación, tutela judicial y legalidad sancionadora',
        html: `
          <h3>Artículo 23 · Participación y acceso a funciones y cargos públicos</h3>
          <p>Los ciudadanos tienen derecho a participar en los asuntos públicos <mark>directamente o por representantes</mark> libremente elegidos en <mark>elecciones periódicas por sufragio universal</mark>. Esos elementos corresponden al 23.1.</p>
          <p>El 23.2 reconoce el derecho a acceder <mark>en condiciones de igualdad a las funciones y cargos públicos, con los requisitos que señalen las leyes</mark>. Igualdad de acceso no significa adjudicar un puesto sin acreditar los requisitos legales ni obtener necesariamente una plaza.</p>
          <p>Recuerda la conexión con el artículo 13.2: titularidad de los españoles y excepción del sufragio activo y pasivo municipal en los términos allí previstos. Los principios de <strong>mérito y capacidad</strong> para el acceso a la función pública se mencionan en el artículo <strong>103.3</strong>, fuera de este Título I: son una conexión útil, pero no las palabras literales del 23.2.</p>
          <div class="practice"><strong>Aplicación al puesto:</strong> un procedimiento de selección exige aplicar a las personas aspirantes las bases y los requisitos correspondientes, registrar sus documentos y respetar el trato igual. Que una persona conocida esté interesada no habilita a facilitarle información reservada ni a alterar el trámite.</div>
          ${legal(23)}
          <h3>Artículo 24 · Tutela judicial efectiva y garantías procesales</h3>
          <p><mark>Todas las personas</mark> tienen derecho a obtener tutela efectiva de <mark>jueces y tribunales</mark> al ejercer sus derechos e intereses legítimos, sin que pueda producirse indefensión. No se limita a ciudadanos españoles ni garantiza que toda pretensión deba resolverse a favor de quien la plantea.</p>
          <p>El apartado segundo incorpora una lista que debes poder reconstruir:</p>
          <ul>
            <li><mark>Juez ordinario predeterminado por la ley</mark>; no elegido a voluntad por una parte.</li>
            <li>Defensa y <mark>asistencia de letrado</mark>.</li>
            <li>Información de la <mark>acusación formulada</mark>.</li>
            <li>Proceso <mark>público, sin dilaciones indebidas y con todas las garantías</mark>.</li>
            <li>Uso de los medios de prueba <mark>pertinentes</mark> para la defensa.</li>
            <li><mark>No declarar contra sí mismo ni confesarse culpable</mark>.</li>
            <li><mark>Presunción de inocencia</mark>.</li>
          </ul>
          <p>«Pruebas pertinentes» no equivale a toda prueba propuesta sin límite; «sin dilaciones indebidas» no equivale a que un proceso carezca de plazos. La ley regulará en qué casos, por <mark>parentesco o secreto profesional</mark>, no se está obligado a declarar sobre hechos presuntamente delictivos.</p>
          <p>Distingue la <strong>tutela judicial</strong> del artículo 24 de la resolución de un recurso administrativo. El auxiliar tramita y facilita el acceso al expediente cuando corresponda, pero no ejerce la función de un juez. Las reglas concretas de audiencia, notificación y recurso se estudian en el procedimiento administrativo.</p>
          ${legal(24)}
          <h3>Artículo 25 · Legalidad de condenas y sanciones</h3>
          <p>Nadie puede ser condenado o sancionado por acciones u omisiones que <mark>en el momento de producirse</mark> no constituyan delito, falta o infracción administrativa, según la legislación vigente <mark>en aquel momento</mark>. Identifica el momento de la conducta, no solo la fecha en que la Administración inicia el expediente.</p>
          <p>La palabra «falta» permanece en el texto literal constitucional. Que la legislación penal haya cambiado sus categorías no autoriza a reescribir ese texto al contestar una pregunta de literalidad. Para resolver un expediente real hay que aplicar la normativa material y temporal correspondiente.</p>
          <h4>25.2 · Penas privativas de libertad y medidas de seguridad</h4>
          <p>Se orientan hacia la <mark>reeducación y reinserción social</mark> y no pueden consistir en <mark>trabajos forzados</mark>. El condenado que cumple prisión conserva los derechos fundamentales del Capítulo, salvo los expresamente limitados por <mark>fallo condenatorio, sentido de la pena y ley penitenciaria</mark>.</p>
          <p>En todo caso, el texto reconoce derecho a <mark>trabajo remunerado y beneficios correspondientes de Seguridad Social</mark>, así como acceso a la cultura y desarrollo integral de la personalidad. No conviertas la condena en una pérdida automática de todos los derechos fundamentales.</p>
          <h4>25.3 · Límite de la Administración civil</h4>
          <p><mark>La Administración civil no puede imponer sanciones que, directa o subsidiariamente, impliquen privación de libertad</mark>. «Subsidiariamente» también importa: no cabe deducir que una multa administrativa impagada pueda convertirse por decisión administrativa civil en encarcelamiento.</p>
          <div class="practice"><strong>Aplicación al puesto:</strong> en un expediente sancionador hay que cuidar la identificación de hechos, fechas, norma aplicable y trámites de defensa. El auxiliar no crea una infracción ni decide la sanción por su cuenta. Ante una duda de legalidad, se remite al órgano competente y se conserva la trazabilidad del trámite.</div>
          ${legal(25)}
        `
      },
      {
        id: 'honor-educacion-sindicacion-peticion-26-29',
        title: 'Artículos 26–29: educación, sindicación, huelga y petición',
        html: `
          <h3>Artículo 26 · Tribunales de Honor</h3>
          <p>Se prohíben los Tribunales de Honor <mark>en el ámbito de la Administración civil y de las organizaciones profesionales</mark>. Conserva ambos ámbitos y el adjetivo «civil». El artículo no es una prohibición de cualquier tribunal judicial ni sustituye los procedimientos disciplinarios previstos por las leyes.</p>
          ${legal(26)}
          <h3>Artículo 27 · Derecho a la educación y libertad de enseñanza</h3>
          <p>El artículo empieza con dos mandatos: <mark>todos tienen derecho a la educación</mark> y <mark>se reconoce la libertad de enseñanza</mark>. Desarrolla estos principios en diez apartados, que conviene estudiar por funciones.</p>
          <table><caption>Los diez apartados del artículo 27</caption><thead><tr><th>Apartado</th><th>Regla principal</th><th>Precisión que debes dominar</th></tr></thead><tbody>
            <tr><td>27.1</td><td>Educación y libertad de enseñanza.</td><td><mark>Todos</mark> tienen el derecho.</td></tr>
            <tr><td>27.2</td><td>Objeto de la educación.</td><td><mark>Pleno desarrollo de la personalidad humana</mark> en el respeto a principios democráticos de convivencia y derechos y libertades fundamentales.</td></tr>
            <tr><td>27.3</td><td>Derecho de los padres sobre formación religiosa y moral de los hijos.</td><td>Según sus propias convicciones; <mark>lo garantizan los poderes públicos</mark>.</td></tr>
            <tr><td>27.4</td><td>Enseñanza básica.</td><td><mark>Obligatoria y gratuita</mark>. La garantía literal no declara obligatoria toda enseñanza.</td></tr>
            <tr><td>27.5</td><td>Garantía del derecho a la educación.</td><td><mark>Programación general</mark>, participación efectiva de los sectores afectados y creación de centros docentes.</td></tr>
            <tr><td>27.6</td><td>Libertad de crear centros docentes.</td><td>Personas <mark>físicas y jurídicas</mark>, respetando los principios constitucionales.</td></tr>
            <tr><td>27.7</td><td>Intervención en control y gestión.</td><td>Profesores, padres y, <mark>en su caso, alumnos</mark>, en centros sostenidos por la Administración <mark>con fondos públicos</mark>, en los términos legales.</td></tr>
            <tr><td>27.8</td><td>Inspección y homologación del sistema educativo.</td><td>A cargo de los <mark>poderes públicos</mark> para garantizar el cumplimiento de las leyes.</td></tr>
            <tr><td>27.9</td><td>Ayuda a centros docentes.</td><td>Que reúnan los <mark>requisitos establecidos por ley</mark>.</td></tr>
            <tr><td>27.10</td><td>Autonomía universitaria.</td><td>Se reconoce a las <mark>Universidades</mark>, en los términos legales.</td></tr>
          </tbody></table>
          <p>Para el 27.7, la expresión constitucional es «centros sostenidos por la Administración con fondos públicos»; no la reduzcas a centros de titularidad pública. Tampoco deduzcas del 27.9 que cualquier centro tiene financiación automática sin cumplir requisitos.</p>
          <p>La <strong>libertad de cátedra</strong> aparece en el 20.1.c; la <strong>libertad de enseñanza</strong>, en el 27.1; y la <strong>libertad de creación de centros</strong>, en el 27.6. Relacionarlas ayuda, pero sus formulaciones no son intercambiables.</p>
          ${legal(27)}
          <h3>Artículo 28 · Dos apartados: sindicación y huelga</h3>
          <table><caption>Sindicación y huelga se estudian por separado</caption><thead><tr><th>Cuestión</th><th>28.1 · Libertad sindical</th><th>28.2 · Huelga</th></tr></thead><tbody>
            <tr><td>Titular literal</td><td><mark>Todos</mark> tienen derecho a sindicarse libremente.</td><td><mark>Los trabajadores</mark>, para defender sus intereses.</td></tr>
            <tr><td>Contenido o garantía</td><td>Fundar sindicatos, afiliarse al elegido; formar confederaciones y fundar organizaciones sindicales internacionales o afiliarse a ellas.</td><td>La ley reguladora establecerá garantías para mantener <mark>los servicios esenciales de la comunidad</mark>.</td></tr>
            <tr><td>Precisiones</td><td>La ley puede limitar o exceptuar a Fuerzas o Institutos armados y demás Cuerpos de disciplina militar; regula peculiaridades para <mark>funcionarios públicos</mark>.</td><td>No sustituir «esenciales» por todos los servicios sin distinción.</td></tr>
          </tbody></table>
          <p><mark>Nadie puede ser obligado a afiliarse a un sindicato</mark>. Se protege tanto afiliarse como no ser obligado a hacerlo. Respecto a funcionarios, el artículo dice que la ley <strong>regulará peculiaridades</strong>; no afirma una exclusión general del derecho para todos ellos.</p>
          <p>La garantía de servicios esenciales pertenece al apartado de <strong>huelga</strong>; las limitaciones y peculiaridades citadas del primer apartado se refieren a <strong>sindicación</strong>. No intercambies ambas reglas al contestar una pregunta literal.</p>
          <div class="practice"><strong>Aplicación al puesto:</strong> un auxiliar funcionario distingue sus derechos sindicales de la regulación concreta del ejercicio de huelga y de las instrucciones legalmente aplicables sobre servicios esenciales. La decisión de organizar o imponer medidas corresponde al órgano competente, dentro del marco legal; el texto constitucional no fija por sí mismo un porcentaje universal de servicios mínimos.</div>
          ${legal(28)}
          <h3>Artículo 29 · Petición</h3>
          <p><mark>Todos los españoles</mark> tienen derecho de petición <mark>individual y colectiva, por escrito</mark>, con la forma y efectos que determine la ley. Recuerda las tres parejas: individual/colectiva, escrito/forma legal, españoles/titular literal.</p>
          <p>Los miembros de <mark>Fuerzas o Institutos armados o Cuerpos sometidos a disciplina militar</mark> solo pueden ejercer este derecho <mark>individualmente</mark> y conforme a su legislación específica. No amplíes esa restricción a todo funcionario civil por el mero hecho de ser empleado público.</p>
          <p>El derecho de petición no se identifica automáticamente con cualquier solicitud de un procedimiento reglado ni con un recurso administrativo. Cada instrumento tiene su régimen, requisitos y efectos. La Constitución no garantiza que toda petición deba concederse.</p>
          <table><caption>Última comparación del bloque</caption><thead><tr><th>Derecho</th><th>Artículo</th><th>Palabras de control</th></tr></thead><tbody>
            <tr><td>Participación pública y acceso a funciones/cargos</td><td>23</td><td>Representantes, sufragio, igualdad y requisitos legales.</td></tr>
            <tr><td>Asociación</td><td>22</td><td>Registro/publicidad y resolución judicial motivada.</td></tr>
            <tr><td>Sindicación</td><td>28.1</td><td>Afiliación libre; nadie obligado.</td></tr>
            <tr><td>Huelga</td><td>28.2</td><td>Trabajadores y servicios esenciales de la comunidad.</td></tr>
            <tr><td>Petición</td><td>29</td><td>Españoles, por escrito, individual y colectiva; excepción militar.</td></tr>
          </tbody></table>
          <div class="study-tip"><strong>Comprobación final de este bloque:</strong> localiza diez derechos sin mirar y después explica una excepción de cada uno. Si aciertas el artículo pero confundes «autoridad» con «juez» o «comunicación» con «autorización», el tema necesita otro repaso antes de considerarlo dominado.</div>
          ${legal(29)}
        `
      }
    ],
    traps: [
      { wrong: 'Todo el Título I tiene idéntico sistema de garantías.', right: 'El artículo 53 diferencia el Capítulo II, la protección reforzada del artículo 14 y de la Sección 1.ª, y los principios del Capítulo III.', reference: 'CE, arts. 53.1–53.3.' },
      { wrong: 'El artículo 14 está en la Sección 1.ª del Capítulo II.', right: 'Está antes de las secciones del Capítulo II; el artículo 53.2 lo incluye expresamente en su tutela reforzada.', reference: 'CE, estructura del Título I y art. 53.2.' },
      { wrong: 'Cualquier tratado internacional sirve como criterio del artículo 10.2, aunque España no lo haya ratificado.', right: 'Además de la Declaración Universal, el artículo menciona tratados y acuerdos sobre las mismas materias ratificados por España.', reference: 'CE, art. 10.2.' },
      { wrong: 'La protección frente a la privación de nacionalidad del artículo 11.2 se formula para cualquier nacionalizado.', right: 'La garantía literal se refiere a los españoles de origen.', reference: 'CE, art. 11.2.' },
      { wrong: 'Los tratados de doble nacionalidad solo pueden celebrarse con países iberoamericanos.', right: 'También con países que hayan tenido o tengan una particular vinculación con España.', reference: 'CE, art. 11.3.' },
      { wrong: 'La excepción del artículo 13.2 solo menciona votar, no ser elegido.', right: 'Comprende sufragio activo y pasivo en elecciones municipales, por tratado o ley y atendiendo a reciprocidad.', reference: 'CE, art. 13.2.' },
      { wrong: 'Los actos de terrorismo son delitos políticos excluidos de extradición según el artículo 13.', right: 'El artículo 13.3 excluye los delitos políticos, pero no considera como tales los actos de terrorismo.', reference: 'CE, art. 13.3.' },
      { wrong: 'El artículo 14 contiene una lista cerrada de causas de discriminación.', right: 'Termina con cualquier otra condición o circunstancia personal o social.', reference: 'CE, art. 14.' },
      { wrong: 'La Ley Orgánica 11/1995 borró del texto del artículo 15 la referencia a tiempos de guerra.', right: 'La referencia sigue en la Constitución; la Ley Orgánica abolió la pena también en tiempo de guerra.', reference: 'CE, art. 15; Ley Orgánica 11/1995, de 27 de noviembre.' },
      { wrong: 'La libertad religiosa solo protege a individuos, y existe una confesión estatal.', right: 'El artículo protege a individuos y comunidades; ninguna confesión tiene carácter estatal.', reference: 'CE, arts. 16.1 y 16.3.' },
      { wrong: 'Toda detención preventiva puede durar siempre 72 horas.', right: 'Debe durar solo el tiempo estrictamente necesario; las 72 horas son un máximo para libertad o disposición judicial.', reference: 'CE, art. 17.2.' },
      { wrong: 'Las 72 horas del artículo 17 son la duración máxima de la prisión provisional.', right: 'Ese máximo se refiere a detención preventiva; el plazo máximo de prisión provisional se determina por ley.', reference: 'CE, arts. 17.2 y 17.4.' },
      { wrong: 'El habeas corpus equivale necesariamente a absolver o liberar automáticamente al detenido.', right: 'El precepto lo dirige a la inmediata puesta a disposición judicial de toda persona detenida ilegalmente.', reference: 'CE, art. 17.4.' },
      { wrong: 'Para entrar en un domicilio basta una autorización administrativa o una mera sospecha.', right: 'Se requiere consentimiento del titular o resolución judicial, salvo flagrante delito.', reference: 'CE, art. 18.2.' },
      { wrong: 'El secreto de las comunicaciones admite como excepción una resolución administrativa.', right: 'El artículo 18.3 exige resolución judicial para su excepción.', reference: 'CE, art. 18.3.' },
      { wrong: 'La veracidad figura como requisito literal de las opiniones del artículo 20.1.a.', right: 'La información veraz está en el artículo 20.1.d; la expresión de pensamientos, ideas y opiniones, en el 20.1.a.', reference: 'CE, arts. 20.1.a y 20.1.d.' },
      { wrong: 'El secuestro de publicaciones puede acordarlo libremente la Administración.', right: 'Solo puede acordarse en virtud de resolución judicial.', reference: 'CE, art. 20.5.' },
      { wrong: 'Una manifestación requiere autorización previa.', right: 'El derecho de reunión no necesita autorización previa; en tránsito público y manifestaciones se exige comunicación previa.', reference: 'CE, arts. 21.1 y 21.2.' },
      { wrong: 'La autoridad puede prohibir una reunión por una vaga molestia sin peligro para personas o bienes.', right: 'El artículo exige razones fundadas de alteración del orden público, con peligro para personas o bienes.', reference: 'CE, art. 21.2.' },
      { wrong: 'La inscripción de una asociación es una autorización y su disolución corresponde al registro administrativo.', right: 'La inscripción es a los solos efectos de publicidad; disolución y suspensión requieren resolución judicial motivada.', reference: 'CE, arts. 22.3 y 22.4.' },
      { wrong: 'El artículo 23.2 garantiza acceder a un cargo sin requisitos o conseguir plaza por presentarse.', right: 'Garantiza acceso en igualdad a funciones y cargos públicos, con los requisitos establecidos por las leyes.', reference: 'CE, art. 23.2.' },
      { wrong: 'La tutela judicial efectiva garantiza una sentencia favorable y permite cualquier prueba propuesta.', right: 'Garantiza tutela sin indefensión; el artículo 24.2 menciona medios de prueba pertinentes para la defensa.', reference: 'CE, arts. 24.1 y 24.2.' },
      { wrong: 'Una sanción es válida si la conducta se tipificó después, antes de resolver el expediente.', right: 'El artículo 25.1 se refiere a la legislación vigente en el momento de la acción u omisión.', reference: 'CE, art. 25.1.' },
      { wrong: 'La Administración civil puede encarcelar subsidiariamente a quien no paga una multa administrativa.', right: 'No puede imponer sanciones que directa ni subsidiariamente impliquen privación de libertad.', reference: 'CE, art. 25.3.' },
      { wrong: 'El artículo 27 declara que toda enseñanza es obligatoria y gratuita.', right: 'La regla literal de obligatoriedad y gratuidad se refiere a la enseñanza básica.', reference: 'CE, art. 27.4.' },
      { wrong: 'La intervención en centros con fondos públicos del artículo 27.7 se limita a los de titularidad pública.', right: 'El precepto habla de todos los centros sostenidos por la Administración con fondos públicos, en los términos legales.', reference: 'CE, art. 27.7.' },
      { wrong: 'Los funcionarios públicos quedan todos excluidos de la libertad sindical y pueden ser obligados a afiliarse.', right: 'La ley regula peculiaridades de su ejercicio; nadie puede ser obligado a afiliarse.', reference: 'CE, art. 28.1.' },
      { wrong: 'La garantía de servicios esenciales es una regla del apartado de sindicación.', right: 'Figura en el artículo 28.2, relativo al derecho de huelga.', reference: 'CE, art. 28.2.' },
      { wrong: 'El derecho de petición se ejerce solo individualmente por todos los empleados públicos.', right: 'La regla general es individual y colectiva por escrito; la restricción a ejercicio individual del artículo 29.2 se refiere a los miembros de los cuerpos militares allí indicados.', reference: 'CE, arts. 29.1 y 29.2.' }
    ],
    mastery: [
      'Sitúo el Título I en los artículos 10–55 y reconstruyo sus cinco capítulos y dos secciones.',
      'Ubico el artículo 14 fuera de la Sección 1.ª y explico por qué recibe la tutela del artículo 53.2.',
      'Recuerdo los cinco elementos del artículo 10.1 y las condiciones interpretativas del 10.2.',
      'Distingo nacionalidad de origen, tratados de doble nacionalidad y mayoría de edad.',
      'Explico la excepción municipal del artículo 13.2 con sufragio activo y pasivo, tratado o ley y reciprocidad.',
      'Diferencio extradición y asilo, e identifico la precisión sobre terrorismo y delitos políticos.',
      'Recupero las causas del artículo 14 y su cláusula abierta sin confundir igualdad ante la ley con el artículo 9.2.',
      'Distingo la literalidad del artículo 15 de la abolición completa establecida por la Ley Orgánica 11/1995.',
      'Explico libertad de creencias, derecho a no declarar sobre ellas y ausencia de confesión estatal.',
      'Aplico los dos límites de la detención: tiempo estrictamente necesario y máximo de 72 horas.',
      'Diferencio detención preventiva, habeas corpus y prisión provisional.',
      'Reconstruyo los cuatro apartados del artículo 18 y sus exigencias de consentimiento o resolución judicial.',
      'Identifico el titular literal y las garantías de residencia y circulación del artículo 19.',
      'Diferencio expresión de opiniones e información veraz; recuerdo censura previa y secuestro judicial.',
      'Distingo comunicación de una manifestación, inscripción de asociación y resolución judicial motivada.',
      'Relaciono participación y acceso a funciones/cargos con igualdad y requisitos legales.',
      'Enumero las garantías del artículo 24 y explico por qué tutela efectiva no significa resultado favorable.',
      'Aplico la referencia temporal del artículo 25.1 y el límite de privación de libertad para la Administración civil.',
      'Reconstruyo los diez apartados del artículo 27, especialmente básica, fondos públicos y autonomía universitaria.',
      'Separo sindicación y huelga e identifico las peculiaridades de funcionarios y servicios esenciales.',
      'Recuerdo petición individual y colectiva por escrito y la excepción específica de disciplina militar.',
      'Resuelvo supuestos nuevos identificando titular, condición, excepción y órgano competente, sin depender de reconocer una frase.'
    ]
  };
})();
