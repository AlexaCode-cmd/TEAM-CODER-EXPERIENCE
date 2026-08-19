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
};
