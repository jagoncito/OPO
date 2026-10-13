# Validación de esta entrega

## Contenido

- 240 preguntas con IDs y enunciados distintos: 200 de entrenamiento y 40 reservadas para evaluación.
- Tres opciones por pregunta, una clave, fundamento y explicación individual de los distractores.
- Cobertura de características, fechas, estructura y todos los artículos 1–9.
- Revisión interna independiente del contenido didáctico y las claves jurídicas. Esta revisión no sustituye la consulta del BOE ni acredita dificultad psicométrica.
- Todos los orígenes están identificados como preguntas originales; no hay preguntas atribuidas sin evidencia a exámenes anteriores.

## Funcionamiento

Comandos de comprobación:

```sh
node tools/check-content.mjs
python3 -m unittest discover -s tests -v
```

Nueve comprobaciones de navegador, completadas en Chromium por HTTP local:

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

El acceso al BOE y los portales oficiales de Melilla devolvió bloqueo de red. No se ha completado el cotejo externo del texto constitucional, la búsqueda de exámenes anteriores ni la localización de la modificación de 22 a 30 plazas. Estas limitaciones también figuran en la web y en el README.
