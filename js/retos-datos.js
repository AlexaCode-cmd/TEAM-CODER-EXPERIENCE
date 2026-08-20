function textoNoVacioEntre(codigo, etiquetaApertura, etiquetaCierre) {
  const coincidencia = codigo.match(new RegExp(`${etiquetaApertura}([\\s\\S]*?)${etiquetaCierre}`, "i"));
  return coincidencia ? coincidencia[1].trim() : null;
}

function contenidoEstilo(c) {
  const m = c.match(/<style>([\s\S]*?)<\/style>/i);
  return m ? m[1] : "";
}

const datosNiveles = {
    1: {
    nombre: "Introducción a HTML",
    retos: {
      1: {
        id: 1,
        nombre: "Estructura HTML Básica",
        objetivo: "Crear la estructura mínima de un documento HTML válido.",
        conceptoClave: 'Todo documento HTML necesita <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> y <code>&lt;body&gt;</code>. El título puede decir lo que tú quieras.',
        masInformacion: "Es como construir una casa: primero los cimientos (DOCTYPE), luego las paredes (html), y dentro, una zona de planos invisibles (head) y otra habitable y visible (body).",
        duracionVideo: "2:30",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    
    <title></title>
  </head>
  <body>
  </body>
</html>`,
        criterios: [
          { descripcion: "El documento empieza con &lt;!DOCTYPE html&gt;", cumple: (c) => /^\s*<!DOCTYPE html>/i.test(c) },
          { descripcion: "Existe la etiqueta &lt;html&gt; y está cerrada", cumple: (c) => /<html>[\s\S]*<\/html>/i.test(c) },
          { descripcion: "Existe &lt;head&gt; dentro de &lt;html&gt;", cumple: (c) => /<head>[\s\S]*<\/head>/i.test(c) },
          { descripcion: "Existe &lt;body&gt; después de &lt;/head&gt;", cumple: (c) => /<\/head>[\s\S]*<body>[\s\S]*<\/body>/i.test(c) },
          { descripcion: "Existe un &lt;title&gt; con cualquier texto dentro del head", cumple: (c) => { const h = c.match(/<head>([\s\S]*?)<\/head>/i); if (!h) return false; const t = textoNoVacioEntre(h[1], "<title>", "<\\/title>"); return !!(t && t.length > 0); } },
        ],
        pistaGeneral: "Estructura HTML: primero DOCTYPE, luego &lt;html&gt; que contiene &lt;head&gt; y &lt;body&gt;. Dentro del head va el &lt;title&gt; — puede decir lo que quieras.",
        pistaCodigo: `<!DOCTYPE html>
<html>
  <head>
    <title>[Escribe aquí cualquier título]</title>
  </head>
  <body>
  </body>
</html>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>[Escribe aquí cualquier título]</title>
  </head>
  <body>
  </body>
</html>`,
      },

      2: {
        id: 2,
        nombre: "Crear Párrafos y Encabezados",
        objetivo: "Usar etiquetas de texto semántico para crear encabezados y párrafos.",
        conceptoClave: 'Usa <code>&lt;h1&gt;</code> para el título principal, <code>&lt;h2&gt;</code> para un subtítulo, y <code>&lt;p&gt;</code> para cada párrafo. El tema es libre.',
        masInformacion: "Puedes escribir sobre lo que quieras: tu colegio, un hobby, o incluso mencionar https://movilis.edu.ec/ si te gusta la idea.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página</title>
  </head>
  <body>
    <!-- Agrega un encabezado principal -->

    <!-- Agrega un encabezado secundario -->

    <!-- Agrega al menos 2 párrafos, del tema que quieras -->
  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;h1&gt; con contenido", cumple: (c) => { const t = textoNoVacioEntre(c, "<h1>", "<\\/h1>"); return !!(t && t.length > 0); } },
          { descripcion: "Existe un &lt;h2&gt; con contenido", cumple: (c) => { const t = textoNoVacioEntre(c, "<h2>", "<\\/h2>"); return !!(t && t.length > 0); } },
          { descripcion: "Existen al menos 2 elementos &lt;p&gt;", cumple: (c) => (c.match(/<p[^>]*>/gi) || []).length >= 2 },
          { descripcion: "Todo el contenido está dentro del &lt;body&gt;", cumple: (c) => { const b = c.match(/<body>([\s\S]*?)<\/body>/i); return !!(b && /<h1>/i.test(b[1]) && /<h2>/i.test(b[1]) && (b[1].match(/<p[^>]*>/gi) || []).length >= 2); } },
        ],
        pistaGeneral: "Usa &lt;h1&gt; para el título principal, &lt;h2&gt; para un subtítulo, y &lt;p&gt; para cada párrafo. Escribe sobre lo que quieras.",
        pistaCodigo: `<h1>[Tu título]</h1>
<h2>[Tu subtítulo]</h2>
<p>[Escribe lo que quieras aquí]</p>
<p>[Otro párrafo, del tema que quieras]</p>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página</title>
  </head>
  <body>
    <h1>Mi colegio</h1>
    <h2>Por qué me gusta</h2>
    <p>Estudio en un lugar donde aprendo cosas nuevas todos los días.</p>
    <p>Puedes conocer más en https://movilis.edu.ec/</p>
  </body>
</html>`,
      },

      3: {
        id: 3,
        nombre: "Crear Listas en HTML",
        objetivo: "Crear listas ordenadas y desordenadas.",
        conceptoClave: 'Usa <code>&lt;ul&gt;</code> para listas sin orden específico y <code>&lt;ol&gt;</code> para listas numeradas. Cada elemento va dentro de un <code>&lt;li&gt;</code> y puede decir lo que quieras.',
        masInformacion: "El navegador dibuja viñetas para <ul> y números automáticos para <ol> — tú no escribes los números, el navegador lo hace por ti.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Mis Listas</title>
  </head>
  <body>
    <!-- Agrega un título -->

    <!-- Agrega una lista desordenada (ul) con al menos 2 elementos -->

    <!-- Agrega una lista ordenada (ol) con al menos 2 elementos -->
  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;h1&gt; con contenido", cumple: (c) => { const t = textoNoVacioEntre(c, "<h1>", "<\\/h1>"); return !!(t && t.length > 0); } },
          { descripcion: "Existe &lt;ul&gt; con al menos 2 elementos &lt;li&gt;", cumple: (c) => { const u = c.match(/<ul>([\s\S]*?)<\/ul>/i); return !!(u && (u[1].match(/<li>/gi) || []).length >= 2); } },
          { descripcion: "Existe &lt;ol&gt; con al menos 2 elementos &lt;li&gt;", cumple: (c) => { const o = c.match(/<ol>([\s\S]*?)<\/ol>/i); return !!(o && (o[1].match(/<li>/gi) || []).length >= 2); } },
          { descripcion: "Todo está dentro del &lt;body&gt;", cumple: (c) => { const b = c.match(/<body>([\s\S]*?)<\/body>/i); return !!(b && /<h1>/i.test(b[1]) && /<ul>/i.test(b[1]) && /<ol>/i.test(b[1])); } },
        ],
        pistaGeneral: "Usa &lt;ul&gt; para listas sin orden y &lt;ol&gt; para listas numeradas. Cada elemento va dentro de &lt;li&gt; — escribe lo que quieras en cada uno.",
        pistaCodigo: `<ul>
  <li>[Elemento 1]</li>
  <li>[Elemento 2]</li>
</ul>
<ol>
  <li>[Elemento 1]</li>
  <li>[Elemento 2]</li>
</ol>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Mis Listas</title>
  </head>
  <body>
    <h1>Mis cosas favoritas</h1>
    <ul>
      <li>Programar</li>
      <li>Jugar videojuegos</li>
    </ul>
    <ol>
      <li>Despertar</li>
      <li>Estudiar en Movilis</li>
    </ol>
  </body>
</html>`,
      },

      4: {
        id: 4,
        nombre: "Insertar Imágenes",
        objetivo: "Usar la etiqueta <img> correctamente.",
        conceptoClave: 'La etiqueta <code>&lt;img&gt;</code> necesita un atributo <code>src</code> (de dónde sale la imagen) y un atributo <code>alt</code> (una descripción). Puedes usar cualquier imagen.',
        masInformacion: "El atributo alt no es opcional: es lo que ven las personas con lectores de pantalla y lo que se muestra si la imagen no carga.",
        duracionVideo: "2:45",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Imagen</title>
  </head>
  <body>
    <!-- Agrega un título -->

    <!-- Inserta una imagen con src y alt -->

  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;h1&gt; con contenido", cumple: (c) => { const t = textoNoVacioEntre(c, "<h1>", "<\\/h1>"); return !!(t && t.length > 0); } },
          { descripcion: "Existe al menos una etiqueta &lt;img&gt;", cumple: (c) => (c.match(/<img[^>]*>/gi) || []).length >= 1 },
          { descripcion: "La imagen tiene atributo src", cumple: (c) => { const m = c.match(/<img([^>]*)>/i); return !!(m && /src\s*=\s*["'][^"']+["']/i.test(m[1])); } },
          { descripcion: "La imagen tiene atributo alt", cumple: (c) => { const m = c.match(/<img([^>]*)>/i); return !!(m && /alt\s*=\s*["'][^"']+["']/i.test(m[1])); } },
        ],
        pistaGeneral: "La etiqueta &lt;img&gt; necesita src (de dónde sale la imagen) y alt (una descripción). Puedes usar cualquier imagen, por ejemplo https://via.placeholder.com/200",
        pistaCodigo: `<img src="https://via.placeholder.com/200" alt="[Describe tu imagen]">`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Imagen</title>
  </head>
  <body>
    <h1>Mi imagen favorita</h1>
    <img src="https://via.placeholder.com/200" alt="Una imagen de ejemplo">
  </body>
</html>`,
      },

      5: {
        id: 5,
        nombre: "Crear Enlaces Hipertexto",
        objetivo: "Usar la etiqueta <a> para crear enlaces, incluyendo uno a https://movilis.edu.ec/.",
        conceptoClave: 'El atributo <code>href</code> define a dónde apunta el enlace. En este reto, uno de tus enlaces debe ir a <code>https://movilis.edu.ec/</code>.',
        masInformacion: "Puedes agregar más enlaces además del de Movilis — el destino y el texto de esos son completamente libres.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Mis Enlaces</title>
  </head>
  <body>
    <!-- Agrega un título -->

    <!-- Agrega un enlace a https://movilis.edu.ec/ -->

    <!-- Agrega otro enlace, el que quieras -->
  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;h1&gt; con contenido", cumple: (c) => { const t = textoNoVacioEntre(c, "<h1>", "<\\/h1>"); return !!(t && t.length > 0); } },
          { descripcion: "Existe al menos un &lt;a&gt; con atributo href", cumple: (c) => { const enlaces = [...c.matchAll(/<a([^>]*)>/gi)].map((m) => m[1]); return enlaces.some((a) => /href\s*=\s*["'][^"']+["']/i.test(a)); } },
          { descripcion: "Al menos un enlace apunta a https://movilis.edu.ec/", cumple: (c) => { const enlaces = [...c.matchAll(/<a([^>]*)>/gi)].map((m) => m[1]); return enlaces.some((a) => { const m = a.match(/href\s*=\s*["']([^"']*)["']/i); return !!(m && /movilis\.edu\.ec/i.test(m[1])); }); } },
          { descripcion: "Cada enlace tiene texto descriptivo", cumple: (c) => { const enlaces = [...c.matchAll(/<a([^>]*)>([\s\S]*?)<\/a>/gi)]; return enlaces.length > 0 && enlaces.every(([, , texto]) => texto.replace(/<[^>]*>/g, "").trim().length > 0); } },
        ],
        pistaGeneral: 'Usa &lt;a href="URL"&gt;texto&lt;/a&gt;. Uno de tus enlaces debe tener href="https://movilis.edu.ec/" — el otro puede ir a donde quieras.',
        pistaCodigo: `<a href="https://movilis.edu.ec/">[Texto del enlace]</a>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Mis Enlaces</title>
  </head>
  <body>
    <h1>Enlaces que me gustan</h1>
    <p><a href="https://movilis.edu.ec/">Mi colegio, Movilis</a></p>
    <p><a href="https://www.google.com">Google</a></p>
  </body>
</html>`,
      },
    },
  },
 
2: {
    nombre: "Estructuras HTML Avanzadas",
    retos: {
      1: {
        id: 1,
        nombre: "Elementos Semánticos",
        objetivo: "Organizar una página con etiquetas semánticas.",
        conceptoClave: 'Usa <code>&lt;header&gt;</code> para la cabecera, <code>&lt;main&gt;</code> para el contenido principal y <code>&lt;footer&gt;</code> para el pie de página.',
        masInformacion: "Estos elementos no cambian cómo se ve la página por defecto, pero le dicen al navegador (y a quien lee el código) qué función tiene cada parte.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página con Secciones</title>
  </head>
  <body>
    <!-- Agrega un <header> con lo que quieras -->

    <!-- Agrega un <main> con tu contenido principal -->

    <!-- Agrega un <footer> con un enlace a https://movilis.edu.ec/ -->

  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;header&gt;", cumple: (c) => /<header>[\s\S]*<\/header>/i.test(c) },
          { descripcion: "Existe un &lt;main&gt;", cumple: (c) => /<main>[\s\S]*<\/main>/i.test(c) },
          { descripcion: "Existe un &lt;footer&gt;", cumple: (c) => /<footer>[\s\S]*<\/footer>/i.test(c) },
          { descripcion: "El &lt;footer&gt; incluye un enlace a https://movilis.edu.ec/", cumple: (c) => { const f = c.match(/<footer>([\s\S]*?)<\/footer>/i); return !!(f && /movilis\.edu\.ec/i.test(f[1])); } },
          { descripcion: "&lt;header&gt;, &lt;main&gt; y &lt;footer&gt; están dentro del &lt;body&gt;", cumple: (c) => { const b = c.match(/<body>([\s\S]*?)<\/body>/i); return !!(b && /<header>/i.test(b[1]) && /<main>/i.test(b[1]) && /<footer>/i.test(b[1])); } },
        ],
        pistaGeneral: 'Los elementos semánticos describen el rol de cada parte: &lt;header&gt; para la cabecera, &lt;main&gt; para el contenido principal, &lt;footer&gt; para el pie. En el footer agrega un enlace con href="https://movilis.edu.ec/".',
        pistaCodigo: `<header>
  <h1>[Tu título]</h1>
</header>
<main>
  <p>[Tu contenido]</p>
</main>
<footer>
  <a href="https://movilis.edu.ec/">[Texto del enlace]</a>
</footer>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página con Secciones</title>
  </head>
  <body>
    <header>
      <h1>Bienvenido a mi página</h1>
    </header>
    <main>
      <p>Aquí va el contenido principal de mi sitio.</p>
    </main>
    <footer>
      <a href="https://movilis.edu.ec/">Visita Movilis</a>
    </footer>
  </body>
</html>`,
      },

      2: {
        id: 2,
        nombre: "Formularios Básicos",
        objetivo: "Crear un formulario simple con campos y un botón.",
        conceptoClave: 'Un formulario usa <code>&lt;form&gt;</code>, con un <code>&lt;label&gt;</code> que describe el campo, un <code>&lt;input&gt;</code> donde se escribe, y un <code>&lt;button&gt;</code> para enviarlo.',
        masInformacion: "Por ahora no necesitas que el formulario \"funcione\" de verdad — solo que tenga la estructura correcta.",
        duracionVideo: "3:15",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Formulario</title>
  </head>
  <body>
    <!-- Agrega un <form> con al menos un <label>, un <input> y un <button> -->

  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;form&gt", cumple: (c) => /<form[^>]*>[\s\S]*<\/form>/i.test(c) },
          { descripcion: "Existe al menos un &lt;input&gt", cumple: (c) => /<input[^>]*>/i.test(c) },
          { descripcion: "Existe al menos un &lt;label&gt;", cumple: (c) => /<label[^>]*>[\s\S]*?<\/label>/i.test(c) },
          { descripcion: "Existe un &lt;button&gt;", cumple: (c) => /<button[^>]*>[\s\S]*?<\/button>/i.test(c) },
        ],
        pistaGeneral: "Un formulario simple necesita &lt;form&gt;, dentro un &lt;label&gt; que describe el campo, un &lt;input&gt; donde se escribe, y un &lt;button&gt; para enviar.",
        pistaCodigo: `<form>
  <label>[Pregunta o etiqueta]</label>
  <input type="text">
  <button>[Texto del botón]</button>
</form>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Formulario</title>
  </head>
  <body>
    <form>
      <label>¿Cuál es tu nombre?</label>
      <input type="text">
      <button>Enviar</button>
    </form>
  </body>
</html>`,
      },

      3: {
        id: 3,
        nombre: "Tablas",
        objetivo: "Crear una tabla simple con encabezados y datos.",
        conceptoClave: 'Una tabla usa <code>&lt;table&gt;</code>, cada fila es <code>&lt;tr&gt;</code>, los encabezados son <code>&lt;th&gt;</code> y las celdas normales <code>&lt;td&gt;</code>.',
        masInformacion: "Puedes pensar en una tabla como una hoja de cálculo: filas y columnas que organizan información.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Tabla</title>
  </head>
  <body>
    <!-- Crea una tabla con al menos 2 filas: una de encabezado (th) y una de datos (td) -->

  </body>
</html>`,
        criterios: [
          { descripcion: "Existe una &lt;table&gt;", cumple: (c) => /<table>[\s\S]*<\/table>/i.test(c) },
          { descripcion: "Existen al menos 2 filas &lt;tr&gt;", cumple: (c) => { const t = c.match(/<table>([\s\S]*?)<\/table>/i); return !!(t && (t[1].match(/<tr>/gi) || []).length >= 2); } },
          { descripcion: "Existe al menos un encabezado &lt;th&gt;", cumple: (c) => { const t = c.match(/<table>([\s\S]*?)<\/table>/i); return !!(t && /<th>/i.test(t[1])); } },
          { descripcion: "Existe al menos una celda &lt;td&gt;", cumple: (c) => { const t = c.match(/<table>([\s\S]*?)<\/table>/i); return !!(t && /<td>/i.test(t[1])); } },
        ],
        pistaGeneral: "Una tabla usa &lt;table&gt;, cada fila es &lt;tr&gt;, los encabezados son &lt;th&gt; y las celdas normales &lt;td&gt;.",
        pistaCodigo: `<table>
  <tr>
    <th>[Encabezado 1]</th>
    <th>[Encabezado 2]</th>
  </tr>
  <tr>
    <td>[Dato 1]</td>
    <td>[Dato 2]</td>
  </tr>
</table>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Tabla</title>
  </head>
  <body>
    <table>
      <tr>
        <th>Materia</th>
        <th>Nota</th>
      </tr>
      <tr>
        <td>Programación</td>
        <td>10</td>
      </tr>
    </table>
  </body>
</html>`,
      },

      4: {
        id: 4,
        nombre: "Atributos Avanzados",
        objetivo: "Usar los atributos id, class y data-* en elementos HTML.",
        conceptoClave: '<code>id</code> identifica un elemento único, <code>class</code> agrupa varios elementos parecidos, y <code>data-*</code> guarda información personalizada.',
        masInformacion: "Estos atributos no se ven en la página, pero son la base de cómo CSS y JavaScript después podrán encontrar y modificar elementos específicos.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Mis Atributos</title>
  </head>
  <body>
    <!-- Agrega un elemento con id, otro con class, y otro con un atributo data-* -->

  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un elemento con atributo id", cumple: (c) => /\sid\s*=\s*["'][^"']+["']/i.test(c) },
          { descripcion: "Existe un elemento con atributo class", cumple: (c) => /\sclass\s*=\s*["'][^"']+["']/i.test(c) },
          { descripcion: "Existe un elemento con un atributo data-*", cumple: (c) => /\sdata-[\w-]+\s*=\s*["'][^"']*["']/i.test(c) },
        ],
        pistaGeneral: "id identifica un elemento único, class agrupa varios elementos con el mismo estilo, y los atributos data-* (como data-nivel) guardan información personalizada.",
        pistaCodigo: `<p id="[nombre-unico]">[Texto]</p>
<p class="[nombre-de-grupo]">[Texto]</p>
<p data-nivel="1">[Texto]</p>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Mis Atributos</title>
  </head>
  <body>
    <p id="saludo">Hola, soy un párrafo único.</p>
    <p class="destacado">Este párrafo tiene una clase.</p>
    <p data-nivel="2">Este párrafo guarda datos personalizados.</p>
  </body>
</html>`,
      },

      5: {
        id: 5,
        nombre: "Validación HTML",
        objetivo: "Combinar lo aprendido en una página HTML5 completa y válida.",
        conceptoClave: "Una página bien formada combina un título, al menos un encabezado y al menos un elemento semántico (header, main, footer, section, article o nav).",
        masInformacion: "Este reto es un repaso: usa lo que ya practicaste en los retos anteriores de este nivel.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página Final del Nivel 2</title>
  </head>
  <body>
    <!-- Usa lo que aprendiste: un encabezado y al menos un elemento semántico -->

  </body>
</html>`,
        criterios: [
          { descripcion: "El documento empieza con &lt;!DOCTYPE html&gt;", cumple: (c) => /^\s*<!DOCTYPE html>/i.test(c) },
          { descripcion: "Existe un &lt;title&gt; con texto", cumple: (c) => { const t = textoNoVacioEntre(c, "<title>", "<\\/title>"); return !!(t && t.length > 0); } },
          { descripcion: "Existe al menos un encabezado (h1 a h6)", cumple: (c) => /<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/i.test(c) },
          { descripcion: "Existe al menos un elemento semántico (header, main, footer, section, article o nav)", cumple: (c) => /<(header|main|footer|section|article|nav)[^>]*>/i.test(c) },
        ],
        pistaGeneral: "Combina lo que ya sabes: un título en el head, un encabezado (h1-h6) y al menos un elemento semántico como header, main, footer, section, article o nav.",
        pistaCodigo: `<header>
  <h1>[Tu título]</h1>
</header>
<main>
  <p>[Tu contenido]</p>
</main>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página Final del Nivel 2</title>
  </head>
  <body>
    <header>
      <h1>Lo que aprendí en este nivel</h1>
    </header>
    <main>
      <p>Aprendí a usar elementos semánticos, formularios, tablas y atributos.</p>
    </main>
  </body>
</html>`,
      },
    },
},
  3: {
    nombre: "Fundamentos CSS",
    retos: {
      1: {
        id: 1,
        nombre: "Colores y Fondos",
        objetivo: "Aplicar color de texto y color de fondo con CSS.",
        conceptoClave: 'Dentro de <code>&lt;style&gt;</code>, usa <code>color</code> para el texto y <code>background-color</code> para el fondo de un elemento.',
        masInformacion: "El CSS va dentro de la etiqueta <style>, en el head del documento. Cada regla tiene un selector (a quién le aplica) y propiedades entre llaves.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Colores y Fondos</title>
    <style>
      /* Escribe aquí tus reglas CSS */

    </style>
  </head>
  <body>
    <h1>Mi título con color</h1>
    <p>Mi párrafo con un fondo de color.</p>
  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;style&gt; con contenido", cumple: (c) => contenidoEstilo(c).trim().length > 0 },
          { descripcion: "Usas la propiedad color", cumple: (c) => /\bcolor\s*:/i.test(contenidoEstilo(c)) },
          { descripcion: "Usas la propiedad background-color", cumple: (c) => /background-color\s*:/i.test(contenidoEstilo(c)) },
        ],
        pistaGeneral: "Dentro de &lt;style&gt;, escribe un selector (como h1 o p) seguido de llaves { }, y dentro las propiedades color: [tu color]; y background-color: [tu color];",
        pistaCodigo: `h1 {
  color: [tu color];
}
p {
  background-color: [tu color];
}`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Colores y Fondos</title>
    <style>
      h1 {
        color: purple;
      }
      p {
        background-color: lightyellow;
      }
    </style>
  </head>
  <body>
    <h1>Mi título con color</h1>
    <p>Mi párrafo con un fondo de color.</p>
  </body>
</html>`,
      },

      2: {
        id: 2,
        nombre: "Fuentes y Textos",
        objetivo: "Cambiar la tipografía y el tamaño del texto con CSS.",
        conceptoClave: 'Usa <code>font-family</code> para el tipo de letra y <code>font-size</code> para el tamaño del texto.',
        masInformacion: "Puedes combinar varias fuentes separadas por coma; el navegador usará la primera que tenga disponible.",
        duracionVideo: "2:45",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Fuentes y Textos</title>
    <style>
      /* Escribe aquí tus reglas CSS */

    </style>
  </head>
  <body>
    <h1>Un título con otra fuente</h1>
    <p>Un párrafo con otro tamaño de letra.</p>
  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;style&gt; con contenido", cumple: (c) => contenidoEstilo(c).trim().length > 0 },
          { descripcion: "Usas la propiedad font-family", cumple: (c) => /font-family\s*:/i.test(contenidoEstilo(c)) },
          { descripcion: "Usas la propiedad font-size", cumple: (c) => /font-size\s*:/i.test(contenidoEstilo(c)) },
        ],
        pistaGeneral: "font-family cambia el tipo de letra (por ejemplo Arial) y font-size cambia el tamaño (por ejemplo 20px).",
        pistaCodigo: `p {
  font-family: [tu fuente];
  font-size: [tu tamaño]px;
}`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Fuentes y Textos</title>
    <style>
      h1 {
        font-family: Georgia;
      }
      p {
        font-family: Arial;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <h1>Un título con otra fuente</h1>
    <p>Un párrafo con otro tamaño de letra.</p>
  </body>
</html>`,
      },

      3: {
        id: 3,
        nombre: "Espaciado (Margin y Padding)",
        objetivo: "Usar margin y padding para separar y dar aire a los elementos.",
        conceptoClave: '<code>margin</code> es el espacio fuera del elemento (lo aleja de sus vecinos) y <code>padding</code> es el espacio dentro (entre el borde y el contenido).',
        masInformacion: "Una forma fácil de recordarlo: el padding es como el relleno de un sándwich, el margin es la distancia con el siguiente plato.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Espaciado</title>
    <style>
      /* Escribe aquí tus reglas CSS */

    </style>
  </head>
  <body>
    <div class="caja">Una caja con espacio alrededor y adentro</div>
  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;style&gt; con contenido", cumple: (c) => contenidoEstilo(c).trim().length > 0 },
          { descripcion: "Usas la propiedad margin", cumple: (c) => /\bmargin\s*:/i.test(contenidoEstilo(c)) },
          { descripcion: "Usas la propiedad padding", cumple: (c) => /\bpadding\s*:/i.test(contenidoEstilo(c)) },
        ],
        pistaGeneral: "margin: [valor]px; aleja el elemento de sus vecinos. padding: [valor]px; agranda el espacio interno entre el borde y el contenido.",
        pistaCodigo: `.caja {
  margin: [tu valor]px;
  padding: [tu valor]px;
}`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Espaciado</title>
    <style>
      .caja {
        margin: 24px;
        padding: 16px;
        background-color: lightgray;
      }
    </style>
  </head>
  <body>
    <div class="caja">Una caja con espacio alrededor y adentro</div>
  </body>
</html>`,
      },

      4: {
        id: 4,
        nombre: "Bordes y Sombras",
        objetivo: "Agregar bordes y sombras a un elemento con CSS.",
        conceptoClave: '<code>border</code> dibuja un borde alrededor del elemento y <code>box-shadow</code> agrega una sombra.',
        masInformacion: "border necesita 3 valores: grosor, estilo (solid, dashed...) y color. Por ejemplo: border: 2px solid black;",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Bordes y Sombras</title>
    <style>
      /* Escribe aquí tus reglas CSS */

    </style>
  </head>
  <body>
    <div class="tarjeta">Una tarjeta con borde y sombra</div>
  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;style&gt; con contenido", cumple: (c) => contenidoEstilo(c).trim().length > 0 },
          { descripcion: "Usas la propiedad border", cumple: (c) => /\bborder\s*:/i.test(contenidoEstilo(c)) },
          { descripcion: "Usas la propiedad box-shadow", cumple: (c) => /box-shadow\s*:/i.test(contenidoEstilo(c)) },
        ],
        pistaGeneral: "border: [grosor]px solid [color]; dibuja un borde. box-shadow: [x] [y] [difuminado] [color]; agrega una sombra, por ejemplo box-shadow: 2px 2px 8px gray;",
        pistaCodigo: `.tarjeta {
  border: [tu grosor]px solid [tu color];
  box-shadow: 2px 2px 8px gray;
}`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Bordes y Sombras</title>
    <style>
      .tarjeta {
        border: 2px solid purple;
        box-shadow: 2px 2px 8px gray;
        padding: 12px;
      }
    </style>
  </head>
  <body>
    <div class="tarjeta">Una tarjeta con borde y sombra</div>
  </body>
</html>`,
      },

      5: {
        id: 5,
        nombre: "Selectores Avanzados",
        objetivo: "Usar selectores de clase y de id para aplicar estilos específicos.",
        conceptoClave: 'Un selector de clase empieza con punto (<code>.miClase</code>) y un selector de id empieza con gato (<code>#miId</code>). Se usan junto con los atributos <code>class</code> e <code>id</code> en el HTML.',
        masInformacion: "Una clase puede repetirse en varios elementos; un id debería usarse una sola vez por página.",
        duracionVideo: "3:00",
        plantilla: `<!DOCTYPE html>
<html>
  <head>
    <title>Selectores Avanzados</title>
    <style>
      /* Escribe aquí un selector de clase (.algo) y uno de id (#algo) */

    </style>
  </head>
  <body>
    <!-- Agrega un elemento con class="..." y otro con id="..." -->

  </body>
</html>`,
        criterios: [
          { descripcion: "Existe un &lt;style&gt; con contenido", cumple: (c) => contenidoEstilo(c).trim().length > 0 },
          { descripcion: "Usas un selector de clase (.algo)", cumple: (c) => /\.[a-zA-Z_][\w-]*\s*\{/.test(contenidoEstilo(c)) },
          { descripcion: "Usas un selector de id (#algo)", cumple: (c) => /#[a-zA-Z_][\w-]*\s*\{/.test(contenidoEstilo(c)) },
          { descripcion: "El HTML tiene un elemento con class y otro con id", cumple: (c) => /\sclass\s*=\s*["'][^"']+["']/i.test(c) && /\sid\s*=\s*["'][^"']+["']/i.test(c) },
        ],
        pistaGeneral: "En el CSS, .miClase { } aplica a cualquier elemento con class=\"miClase\". #miId { } aplica al elemento con id=\"miId\".",
        pistaCodigo: `<style>
  .[nombre-clase] {
    color: [tu color];
  }
  #[nombre-id] {
    font-size: 20px;
  }
</style>
<p class="[nombre-clase]">Texto con clase</p>
<p id="[nombre-id]">Texto con id</p>`,
        solucion: `<!DOCTYPE html>
<html>
  <head>
    <title>Selectores Avanzados</title>
    <style>
      .destacado {
        color: purple;
      }
      #principal {
        font-size: 22px;
      }
    </style>
  </head>
  <body>
    <p class="destacado">Este texto usa un selector de clase.</p>
    <p id="principal">Este texto usa un selector de id.</p>
  </body>
</html>`,
      },
    },
  },
