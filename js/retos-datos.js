function textoNoVacioEntre(codigo, etiquetaApertura, etiquetaCierre) {
  const coincidencia = codigo.match(new RegExp(`${etiquetaApertura}([\\s\\S]*?)${etiquetaCierre}`, "i"));
  return coincidencia ? coincidencia[1].trim() : null;
}

function contenidoEstilo(c) {
  const m = c.match(/<style>([\s\S]*?)<\/style>/i);
  return m ? m[1] : "";
}

const datosNiveles = {};
