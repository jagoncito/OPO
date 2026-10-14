# Auxiliar Administrativo de Melilla · Temas 1 y 2

Web local para preparar los dos primeros temas de la parte general del programa:

| Página | Tema | Ámbito |
|---|---|---|
| `index.html` | 1. Constitución: características, estructura y Título Preliminar | Artículos 1–9 |
| `tema2.html` | 2. Constitución: Título I, derechos y deberes fundamentales | Artículos 10–55 |

Puedes cambiar de tema desde el menú. El historial, los intentos en curso y la lista de dominio se guardan por separado; añadir el tema 2 conserva los datos del tema 1.

## Abrir en tu ordenador

1. Descarga el repositorio con **Code → Download ZIP**, o clónalo.
2. Descomprime la carpeta completa.
3. Abre **index.html** y selecciona el tema, o abre directamente **tema2.html**, con un navegador actualizado.

No requiere instalación, cuenta, base de datos ni conexión a Internet. Conserva las carpetas `js` y `docs` junto a `index.html`. Los enlaces al BOE requieren Internet; los PDF incluidos son locales.

Opcionalmente, desde esta carpeta puedes servirla con `python3 -m http.server 8000` y abrirla en el navegador. El progreso pertenece al navegador y al origen: al cambiar de apertura directa a servidor local, o mover la carpeta, puede cambiar el almacenamiento disponible. Exporta antes si necesitas conservarlo.

## Qué incluye

- Contenido explicado y subrayados amarillos. Tema 1: cronología, estructura y artículos 1–9. Tema 2: los 46 artículos del Título I completos, mapas, garantías y suspensión de derechos.
- Tema 1: 23 confusiones. Tema 2: 61 confusiones y 39 criterios de dominio sin mirar el texto.
- **Por tema: 10 tests de 20 preguntas + evaluación de 40, 240 preguntas originales** sin repetir enunciados entre sus once cuestionarios. En total: 480 preguntas, 20 entrenamientos y 2 evaluaciones.
- Tres alternativas y una correcta. Entrega manual o automática al agotarse el tiempo, navegación, preguntas marcadas, respuestas en blanco y confianza opcional.
- Corrección debajo de **cada pregunta**, con respuesta elegida, correcta, fundamento, artículo y explicación de los distractores.
- Historial, diagnóstico por bloques, errores con confianza alta y exportación/importación del progreso.

En el tema 1, los títulos de los tests indican un foco y cada tarjeta muestra su contenido real. En el tema 2, cada test cubre un bloque concreto y la evaluación contiene cuatro preguntas nuevas de cada uno de los diez bloques; todos los artículos 10–55 tienen preguntas. El reparto es pedagógico, no una frecuencia histórica de examen. La dificultad se estima editorialmente; no está calibrada con una muestra de aspirantes.

## Tiempo y puntuación

El primer ejercicio publicado tiene **80 preguntas + 5 reservas, tres alternativas y 90 minutos**. Estos tests por tema son una **adaptación reducida**, no ese ejercicio completo:

| Tipo | Preguntas | Tiempo |
|---|---:|---:|
| Entrenamiento | 20 | 21 min 11 s |
| Evaluación | 40 | 42 min 22 s |

El tiempo se calcula como `ceil(preguntas × 5.400 / 85)` segundos, tomando también las reservas como carga de lectura del examen. Los tests temáticos no incluyen reservas.

Nota temática: `10 / número de preguntas × (aciertos − errores / 2)`. Los blancos no penalizan. La nota visible se limita a 0–10 y se explica si el cálculo es negativo. El mínimo de 5 es una referencia del ejercicio oficial; alcanzar 9 es una meta de preparación, no un corte oficial ni una garantía de plaza.

El reloj **continúa aunque salgas del test o cierres la página**. Al reabrir y continuar un intento vencido se corrige automáticamente. Cambiar el reloj del dispositivo afecta al temporizador: es una herramienta de práctica, no un sistema de examen supervisado.

## Método de trabajo

1. Lee y explica las reglas sin consultar el texto.
2. Haz los tests en orden, sin apuntes. La evaluación usa 40 preguntas reservadas.
3. Revisa también las preguntas acertadas por duda o descarte accidental.
4. Prioriza los errores con confianza alta: muestran reglas que creías dominar.
5. Repite la recuperación de esas reglas después de 48 horas. Una nota obtenida al repetir un cuestionario conocido no equivale a resolver preguntas nuevas.

El diagnóstico usa la **última respuesta por pregunta**, para que repetir no aumente artificialmente la muestra. La confianza no cambia la nota. Con tres opciones y esta penalización, el valor esperado de responder es positivo cuando la probabilidad real de acertar supera 1/3; el acierto observado con pocas preguntas no demuestra esa probabilidad.

## Fuentes y versión normativa

El 14/10/2026 se accedió directamente al BOE y a los portales oficiales de Melilla. Queda resuelto el bloqueo de acceso que afectó a la primera entrega.

- `docs/bases-2024.pdf`: BOME n.º 6227, 19/11/2024, artículo 1011. Programa en páginas 3169–3170. La base décima fija la normativa vigente a la fecha de publicación de la convocatoria.
- `docs/ampliacion-30-plazas-2026.pdf`: BOME n.º 6368, 07/04/2026, artículo 367. Explica el paso a 30 plazas, cuatro reservadas para personas con discapacidad. No modifica el programa.
- `docs/rectificacion-tiempo-2024.pdf`: BOME n.º 6239, 31/12/2024, artículo 1151. Corrige la duración del primer ejercicio de 60 a 90 minutos.
- `docs/aviso-examen-2026.pdf`: BOME extraordinario n.º 44, 07/10/2026, artículo 119. Confirma el primer ejercicio del **25/10/2026 a las 18:00** y sus reglas.
- [Constitución, redacción de 17/02/2024](https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229&tn=1&p=20240217): versión oficial aplicable a la fecha de las bases, con el artículo 49 reformado en 2024. Se incluyen copias locales del texto del Preliminar y del Título I extraído del BOE.
- [LO 11/1995](https://www.boe.es/buscar/act.php?id=BOE-A-1995-25714): consultada para distinguir el texto literal del artículo 15 y la abolición efectiva de la pena de muerte en tiempo de guerra.

Las 480 preguntas son originales y llevan ese origen explícito. La búsqueda de exámenes anteriores sigue sin ser exhaustiva: se han localizado anuncios oficiales de convocatorias anteriores, pero no cuestionarios ni plantillas de Auxiliar Administrativo que permitan atribuir preguntas. Véase `docs/INVESTIGACION-EXAMENES.md`. No se inventan frecuencias ni preguntas «caídas».

## Privacidad y conservación

Las respuestas se guardan solo en el almacenamiento local del navegador. No hay analítica, fuentes remotas, peticiones automáticas ni envío de resultados. Navegación privada, limpieza de datos o restricciones al abrir archivos pueden impedir la persistencia; la página lo avisa. Usa **Progreso → Exportar progreso** para guardar una copia JSON e importarla posteriormente.

## Comprobaciones para desarrollo

No hay compilación ni dependencias de ejecución. El banco y el contenido se pueden validar con Node:

```sh
node tools/check-content.mjs
python3 tools/check-literals.py
```

La comprobación de navegador usa Python y Playwright (solo para desarrollo, no para utilizar la web):

```sh
python3 -m pip install playwright
python3 -m playwright install chromium
python3 -m unittest discover -s tests -v
```

Los módulos de datos son scripts locales; no se usa `fetch`, lo que permite abrir la página directamente como archivo.

Las pruebas usan un servidor local temporal. Si tu navegador de desarrollo permite abrir archivos, puedes comprobar esa modalidad con `OPO_TEST_FILE=1 python3 -m unittest discover -s tests -v`. La validación funcional se realizó por HTTP local, incluyendo uso de los tests tras desconectar la red. La apertura directa como archivo no ha podido verificarse en el navegador administrado del entorno; no se ha probado en otros navegadores.
