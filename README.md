# Auxiliar Administrativo de Melilla · Tema 1

Página de estudio y entrenamiento de **Constitución Española de 1978: características, estructura y Título Preliminar**. Esta entrega desarrolla únicamente el tema general 1 del programa aportado.

## Abrir en tu ordenador

1. Descarga el repositorio con **Code → Download ZIP**, o clónalo.
2. Descomprime la carpeta completa.
3. Abre **index.html** con Chrome, Firefox, Edge o Safari.

No requiere instalación, cuenta, base de datos ni conexión a Internet. Conserva las carpetas `js` y `docs` junto a `index.html`. Los enlaces al BOE requieren Internet; los PDF incluidos son locales.

Opcionalmente, desde esta carpeta puedes servirla con `python3 -m http.server 8000` y abrirla en el navegador. El progreso pertenece al navegador y al origen: al cambiar de apertura directa a servidor local, o mover la carpeta, puede cambiar el almacenamiento disponible. Exporta antes si necesitas conservarlo.

## Qué incluye

- Contenido explicado, los artículos 1–9 completos, cronología, estructura, tablas y subrayados amarillos.
- 23 confusiones y criterios para comprobar el dominio sin mirar el texto.
- **10 tests de 20 preguntas + evaluación de 40: 240 preguntas originales**, sin repetir preguntas entre esos once cuestionarios.
- Tres alternativas y una correcta. Entrega manual o automática al agotarse el tiempo, navegación, preguntas marcadas, respuestas en blanco y confianza opcional.
- Corrección debajo de **cada pregunta**, con respuesta elegida, correcta, fundamento, artículo y explicación de los distractores.
- Historial, diagnóstico por bloques, errores con confianza alta y exportación/importación del progreso.

Los títulos de los tests indican un foco. Cada tarjeta muestra su **contenido real por artículo**, incluido el repaso de otros bloques. El reparto es pedagógico, no una frecuencia histórica de examen. La dificultad se estima editorialmente; no está calibrada con una muestra de aspirantes.

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

## Fuentes y estado de verificación

- `docs/bases-2024.pdf`: PDF aportado, BOME n.º 6227, 19/11/2024, artículo 1011. Tema general 1 en página 3169; programa completo en 3169–3170. Las bases convocan 22 plazas.
- `docs/aviso-examen-2026.pdf`: PDF aportado, BOME extraordinario n.º 44, 07/10/2026, artículo 119. Confirma 30 plazas y primer ejercicio el **25/10/2026 a las 18:00**. No reproduce el temario.
- [Constitución Española, BOE-A-1978-31229](https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229): referencia normativa por artículos. **El acceso directo quedó bloqueado por la red del entorno de elaboración.** El contenido se revisó internamente; no se presenta como un cotejo externo completado.

No se ha localizado la modificación intermedia de 22 a 30 plazas ni verificado un examen anterior. Por ello **ninguna pregunta se atribuye a un examen oficial**, no se indican frecuencias de aparición y no se afirma haber comprobado la continuidad de todo el programa. Los artículos reformados 13, 135 y 49 quedan fuera del Título Preliminar y no alteran los artículos 1–9 de esta entrega.

## Privacidad y conservación

Las respuestas se guardan solo en el almacenamiento local del navegador. No hay analítica, fuentes remotas, peticiones automáticas ni envío de resultados. Navegación privada, limpieza de datos o restricciones al abrir archivos pueden impedir la persistencia; la página lo avisa. Usa **Progreso → Exportar progreso** para guardar una copia JSON e importarla posteriormente.

## Comprobaciones para desarrollo

No hay compilación ni dependencias de ejecución. El banco y el contenido se pueden validar con Node:

```sh
node tools/check-content.mjs
```

La comprobación de navegador usa Python y Playwright (solo para desarrollo, no para utilizar la web):

```sh
python3 -m pip install playwright
python3 -m playwright install chromium
python3 -m unittest discover -s tests -v
```

Los módulos de datos son scripts locales; no se usa `fetch`, lo que permite abrir la página directamente como archivo.

Las pruebas usan un servidor local temporal. Si tu navegador de desarrollo permite abrir archivos, puedes comprobar esa modalidad con `OPO_TEST_FILE=1 python3 -m unittest discover -s tests -v`. En el entorno de elaboración, la política administrada del navegador bloquea `file://`; la validación funcional se realizó por HTTP local, incluyendo uso de los tests tras desconectar la red.
