# Validación de los temas 1 y 2

## Contenido

- 240 preguntas por tema, con IDs y enunciados distintos: 200 de entrenamiento y 40 reservadas para evaluación en cada uno; 480 en total.
- Tres opciones por pregunta, una clave, fundamento y explicación individual de los distractores.
- Tema 1: características, fechas, estructura y artículos 1–9. Tema 2: todos los artículos 10–55 y diez categorías de 24 preguntas (20 de entrenamiento + 4 de evaluación).
- Textos literales cotejados con el BOE oficial, redacción de 17/02/2024 aplicable a la fecha de las bases; revisión jurídica independiente de teoría y claves. No se afirma calibración psicométrica.
- Todos los orígenes están identificados como preguntas originales; no hay preguntas atribuidas sin evidencia a exámenes anteriores.

## Funcionamiento

Comandos de comprobación:

```sh
node tools/check-content.mjs
python3 tools/check-literals.py
python3 -m unittest discover -s tests -v
```

21 comprobaciones de navegador, completadas en Chromium por HTTP local: las nueve siguientes se ejecutan para cada tema; otras tres verifican cobertura de los 46 artículos, separación del progreso y rechazo de una importación de otro tema.

1. Contenido, reparto de los once tests y ausencia de solapamiento de preguntas.
2. Puntuación de todos los cuestionarios con aciertos, errores, blancos y casos mixtos.
3. Respuesta real a veinte preguntas, corrección completa y persistencia del historial.
4. Borrado de respuesta, marcas, cancelación de entrega y recuperación de intento.
5. Corrección única de un intento vencido al volver a abrirlo.
6. Exportación, importación, recálculo de notas y rechazo de datos incompatibles.
7. Diseño móvil, foco e aislamiento de los diálogos para teclado.
8. Realización y corrección sin red después de cargar los archivos; ausencia de peticiones externas.
9. Funcionamiento del test cuando el navegador impide guardar datos.

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

El 14/10/2026 se completaron el acceso al BOE, el cotejo de los textos constitucionales y la localización de la modificación de 22 a 30 plazas y de la rectificación de tiempo. Continúa pendiente localizar cuestionarios y plantillas de exámenes anteriores de Auxiliar Administrativo: los anuncios comprobados no permiten atribuir preguntas. Se documenta el recorrido en `INVESTIGACION-EXAMENES.md`.
