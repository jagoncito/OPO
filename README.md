# Auxiliar Administrativo de Melilla · Legislación, temas 1–16

Web local con los **16 temas de la parte general** de la convocatoria. Mantiene la plantilla, apartados, controles, tiempos y corrección de los temas 1 y 2. El menú permite cambiar de tema; el historial y los intentos se guardan por separado. La parte específica y los simulacros generales de todo el programa no forman parte de esta entrega.

| Página | Tema | Ámbito |
|---|---|---|
| [index.html](index.html) | 1. Constitución: características, estructura y Título Preliminar | Artículos 1–9 |
| [tema2.html](tema2.html) | 2. Constitución: derechos y deberes fundamentales | Título I, artículos 10–55 |
| [tema3.html](tema3.html) | 3. La Constitución Española de 1978: Título II. De la Corona | La Corona · Artículos 56–65 |
| [tema4.html](tema4.html) | 4. La Constitución Española de 1978: Título III. De las Cortes Generales | Cortes Generales · Artículos 66–96 |
| [tema5.html](tema5.html) | 5. La Constitución Española de 1978: Títulos IV y V. Gobierno, Administración y relaciones con las Cortes | Gobierno y Administración · Artículos 97–116 |
| [tema6.html](tema6.html) | 6. La Constitución: Título VI. Poder Judicial y CGPJ en la Ley Orgánica 6/1985 | Poder Judicial · Composición y funcionamiento del CGPJ |
| [tema7.html](tema7.html) | 7. La Constitución: Título VIII. Organización territorial y acceso de Melilla a la autonomía | Organización territorial · Artículos 137–158 y autonomía de Melilla |
| [tema8.html](tema8.html) | 8. Tribunal Constitucional: regulación, organización, atribuciones y reforma constitucional | Tribunal Constitucional y reforma · Artículos 159–169 |
| [tema9.html](tema9.html) | 9. Fuentes del Derecho Público. La ley y el reglamento: concepto y clases | Fuentes, jerarquía normativa, leyes y reglamentos |
| [tema10.html](tema10.html) | 10. Estatuto de Autonomía de Melilla: Títulos Preliminar y I. Organización institucional | Estatuto de Melilla · Artículos 1–20 |
| [tema11.html](tema11.html) | 11. Estatuto de Autonomía de Melilla: Título II. Competencias de la Ciudad | Competencias estatutarias · Artículos 21–27 |
| [tema12.html](tema12.html) | 12. Estatuto de Autonomía de Melilla: Título III. Régimen jurídico | Régimen jurídico · Artículos 28–32 |
| [tema13.html](tema13.html) | 13. Estatuto de Melilla: cooperación, régimen económico y financiero y reforma | Títulos IV, V y VI · Artículos 33–41 |
| [tema14.html](tema14.html) | 14. Reglamento del Gobierno y de la Administración de Melilla: órganos de la Administración | Órganos superiores, directivos y administrativos de Melilla |
| [tema15.html](tema15.html) | 15. Régimen local español: principios, entidades y Municipio. Concepto y elementos | Régimen local · Constitución y Ley 7/1985 |
| [tema16.html](tema16.html) | 16. Ley Orgánica 3/2007: Títulos Preliminar y I. Igualdad y tutela contra la discriminación | Igualdad efectiva · Artículos 1–13 |

## Abrir en tu ordenador

1. Descarga el repositorio con **Code → Download ZIP**, o clónalo.
2. Descomprime la carpeta completa.
3. Abre **index.html** con un navegador actualizado y selecciona el tema. También puedes abrir cualquier `temaN.html` directamente.

No requiere instalación, cuenta, base de datos ni conexión a Internet. Conserva las carpetas `js` y `docs` junto a los HTML. Los enlaces al BOE requieren Internet; los textos de referencia y PDF incluidos son locales.

Opcionalmente, puedes servir esta carpeta con `python3 -m http.server 8000`. El progreso pertenece al navegador y al origen: al cambiar de apertura directa a servidor local, o mover la carpeta, puede cambiar el almacenamiento disponible. Exporta antes si necesitas conservarlo.

## Qué incluye

- Una página por tema, con teoría, subrayados amarillos, confusiones, criterios de dominio y fuentes. Los temas añadidos incluyen los preceptos de su ámbito y casos resueltos.
- **Por tema: 10 tests de 20 preguntas + evaluación de 40. En total: 3.840 preguntas originales, 160 entrenamientos y 16 evaluaciones.**
- Tres alternativas y una correcta. Entrega manual o automática al agotarse el tiempo, navegación, preguntas marcadas, blancos y confianza opcional.
- Corrección debajo de **cada pregunta**, tanto acertada como fallada o en blanco: elección, clave, fundamento, artículo y explicación de cada opción.
- Historial, diagnóstico por bloques, errores con confianza alta y exportación/importación del progreso.

El tema 1 distribuye sus tests según los focos indicados en las tarjetas. En los temas 2–16, cada entrenamiento cubre uno de diez bloques; la evaluación contiene cuatro preguntas reservadas de cada bloque. Las preguntas de evaluación no aparecen en los entrenamientos, aunque recuperan conceptos estudiados.

Los temas 3–16 combinan recuperación de términos, corrección de formulaciones, contraste de reglas y casos. El tema 3 parte de 80 contrastes normativos; los demás, de 40 por tema, practicados mediante varias tareas. **240 preguntas no equivalen a 240 conceptos jurídicos independientes**. Hay 42 casos de interpretación redactados y revisados por separado, tres en cada tema añadido. El reparto es pedagógico; la dificultad es editorial y no está calibrada con aspirantes ni basada en frecuencias históricas verificadas.

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
- [Constitución, redacción de 17/02/2024](https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229&tn=1&p=20240217): versión oficial aplicable a la fecha de las bases, con el artículo 49 reformado en 2024. Se incluyen las copias locales del Preliminar y del Título I y una lectura local de toda la Constitución en `docs/normas/ce.html`.
- [LO 11/1995](https://www.boe.es/buscar/act.php?id=BOE-A-1995-25714): consultada para distinguir el texto literal del artículo 15 y la abolición efectiva de la pena de muerte en tiempo de guerra.

Para los temas añadidos se incluyen textos de referencia y datos cotejables en `docs/normas/`. Cada página enlaza su versión oficial y su lectura sin conexión:

| Norma | Redacción de referencia |
|---|---|
| Constitución | 17/02/2024 |
| LO 6/1985, Poder Judicial | 05/08/2024 |
| LO 2/1979, Tribunal Constitucional | 02/08/2024 |
| LO 2/1995, Estatuto de Melilla | 14/03/1995 |
| Código Civil | 01/03/2023 |
| Ley 39/2015 | 06/11/2024 |
| Ley 7/1985, régimen local | 12/11/2024 |
| LO 3/2007, igualdad | 02/08/2024 |
| Reglamento del Gobierno y de la Administración de Melilla | Publicación oficial de 30/01/2017 |

Se usan las redacciones vigentes a **19/11/2024**, conforme a las bases, aunque el ejercicio se celebre en 2026. El tema 9 incorpora las notas oficiales de la STC 55/2018 en los artículos 129, 130, 132 y 133 de la Ley 39/2015: leer su literalidad no basta para determinar su ámbito de aplicación.

Para el Reglamento de Melilla se conserva el PDF original y se ha buscado una modificación anterior al corte sin localizarla en el recorrido documentado. La consolidación del portal de marzo de 2026 no se sustituye automáticamente por la fuente de 2017; la búsqueda no permite certificar la inexistencia de cualquier modificación o sentencia. Esta limitación queda indicada en la documentación y en el propio tema.

Las 3.840 preguntas son originales y llevan ese origen explícito. La búsqueda de exámenes anteriores sigue sin ser exhaustiva: se han localizado anuncios oficiales de convocatorias anteriores, pero no cuestionarios ni plantillas de Auxiliar Administrativo que permitan atribuir preguntas. Véase `docs/INVESTIGACION-EXAMENES.md`. No se inventan frecuencias ni preguntas «caídas».

## Privacidad y conservación

Las respuestas se guardan solo en el almacenamiento local del navegador. No hay analítica, fuentes remotas, peticiones automáticas ni envío de resultados. Navegación privada, limpieza de datos o restricciones al abrir archivos pueden impedir la persistencia; la página lo avisa. Usa **Progreso → Exportar progreso** para guardar una copia JSON e importarla posteriormente.

## Comprobaciones para desarrollo

No hay compilación ni dependencias de ejecución. El banco y el contenido se pueden validar con Node:

```sh
node tools/check-content.mjs
python3 tools/check-literals.py
python3 tools/check-all-sources.py
```

La comprobación de navegador usa Python y Playwright (solo para desarrollo, no para utilizar la web):

```sh
python3 -m pip install playwright
python3 -m playwright install chromium
python3 -m unittest discover -s tests -v
```

Los módulos de datos son scripts locales; no se usa `fetch`, lo que permite abrir la página directamente como archivo.

Las pruebas usan un servidor local temporal. Si tu navegador de desarrollo permite abrir archivos, puedes comprobar esa modalidad con `OPO_TEST_FILE=1 python3 -m unittest discover -s tests -v`. La validación funcional se realizó por HTTP local, incluyendo uso de los tests tras desconectar la red. La apertura directa como archivo no ha podido verificarse en el navegador administrado del entorno; no se ha probado en otros navegadores.
