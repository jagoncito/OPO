# Validación del programa general y específico: 33 temas

## Contenido

- 240 preguntas por tema: 200 de entrenamiento y 40 reservadas para evaluación, 7.920 en total. Los IDs son únicos en cada banco y no se comparten entre los once cuestionarios de un mismo tema. Para los temas 3–33 se comprueba que no se repitan preguntas completas (enunciado + opciones); algunas instrucciones se reutilizan con opciones distintas. Los conceptos se recuperan en varias tareas.
- Tres opciones por pregunta, una clave, fundamento y explicación individual de los distractores.
- Tema 1: características, fechas, estructura y artículos 1–9. Tema 2: todos los artículos 10–55 y diez categorías de 24 preguntas (20 de entrenamiento + 4 de evaluación).
- Los temas 1 y 2 conservan la revisión jurídica independiente documentada en sus entregas. El tema 2 mantiene el cotejo íntegro de los 46 artículos del Título I.
- Los temas 3–16 incluyen 350 citas completas cotejadas con sus fuentes, las claves de 3.318 ejercicios de literalidad verificadas contra esos textos y 42 casos de interpretación revisados por separado. El cotejo textual no certifica por sí solo la interpretación jurídica, la vigencia de toda la jurisprudencia ni la calidad psicométrica de cada pregunta.
- El corte normativo es 19/11/2024, no la fecha actual. El tema 9 conserva las notas competenciales de la STC 55/2018. La fuente del Reglamento de Melilla y la limitación de la búsqueda de modificaciones quedan visibles en el tema 14.
- La parte específica añade 4.080 preguntas: 4.049 originales y 31 transcritas de Administrativo CAM, 06/09/2026. El texto y opciones de estas 31 se cotejan con la transcripción del PDF conservado; sus soluciones son revisión normativa propia, sin plantilla definitiva localizada. La etiqueta no las atribuye a Auxiliar.
- Los temas 3–33 suman 962 citas completas, 7.265 claves de literalidad cotejadas, 144 casos originales (42 generales + 102 específicos) y las 31 preguntas oficiales relacionadas. Los casos específicos incluyen tres reservados para evaluación por tema; sus enunciados y soluciones no se publican en los casos resueltos de teoría.

## Funcionamiento

Comandos de comprobación:

```sh
node tools/check-content.mjs
python3 tools/check-literals.py
python3 tools/check-all-sources.py
python3 -m unittest discover -s tests -v
```

28 pruebas de navegador, completadas en Chromium por HTTP local: 21 pruebas conservadas de los temas 1 y 2 y siete adicionales: tres recorren los temas generales 3–16, otras tres los específicos 1–17, y una comprueba procedencia oficial visible y corrección. Las nueve pruebas siguientes se ejecutan para cada tema inicial; otras tres verifican cobertura de los 46 artículos, separación del progreso y rechazo de una importación de otro tema.

1. Contenido, reparto de los once tests y ausencia de solapamiento de preguntas.
2. Puntuación de todos los cuestionarios con aciertos, errores, blancos y casos mixtos.
3. Respuesta real a veinte preguntas, corrección completa y persistencia del historial.
4. Borrado de respuesta, marcas, cancelación de entrega y recuperación de intento.
5. Corrección única de un intento vencido al volver a abrirlo.
6. Exportación, importación, recálculo de notas y rechazo de datos incompatibles.
7. Diseño móvil, foco e aislamiento de los diálogos para teclado.
8. Realización y corrección sin red después de cargar los archivos; ausencia de peticiones externas.
9. Funcionamiento del test cuando el navegador impide guardar datos.

Las pruebas por página comprueban, con subcasos para cada tema general 3–16 y específico 1–17:

1. Carga de la página, navegación a los 33 temas, fuentes locales existentes, 240 preguntas, reparto 10×20 + 40, tiempos 1.271/2.542 segundos, cuatro preguntas de evaluación por bloque y cálculo de notas de los 341 cuestionarios de estas páginas con aciertos, errores, blancos y mezclas.
2. Respuesta real, confianza, marca, salida, recuperación, entrega, corrección de todas las alternativas y conservación independiente del historial al volver a cada tema.
3. Ausencia de desbordamiento móvil a 390 px, evaluación de 40 preguntas sin red y corrección íntegra sin peticiones adicionales.

La prueba de procedencia abre una pregunta oficial del tema específico 1, verifica cuerpo y número antes de responder, la contesta y comprueba que la corrección enlace el PDF y distinga la revisión normativa propia.

Se revisaron además capturas de páginas y correcciones en escritorio y móvil. Los tests de desarrollo no son necesarios para usar las páginas.

La apertura directa como archivo no pudo probarse en este navegador administrado: la política del entorno bloquea el protocolo `file://`. No hay dependencias remotas, importaciones de módulos ni peticiones `fetch` que requieran servidor para ejecutar la aplicación en un navegador local normal. Otros navegadores no se han probado.

## Documentos aportados

Se incluyen las copias exactas de los PDF que aportó el usuario. SHA-256:

```text
bases-2024.pdf
091340542ab663f259cbcfe91b6ac76546ec00f25083a107f9be47100735447c

aviso-examen-2026.pdf
3d8b49115dee87a4b56f05fa2e304f511e3389b8c4eb1045078a3091aedbaa31
```

## Pendientes externos

El 14/10/2026 se completaron el acceso al BOE, el cotejo de los textos constitucionales y la localización de la modificación de 22 a 30 plazas y de la rectificación de tiempo. Continúa pendiente localizar cuestionarios y plantillas de años anteriores de Auxiliar Administrativo. Sí se ha conservado un cuestionario oficial relacionado de Administrativo de Melilla de 2026; se diferencia el cuerpo y no se presenta la solución propia como plantilla del tribunal. Se documenta el recorrido en `INVESTIGACION-EXAMENES.md`.
