// Formatea rut chileno en formato de miles y con guión
export function formateaRut(rutInit) {
  if (rutInit === null) {
    rutInit = "";
  }

  let rut = rutInit;
  const ultimoDigito = rut.substr(rut.length - 1, 1);
  const terminaEnK = ultimoDigito.toLowerCase() === "k";
  rut = rut.replace(/\D/g, "");
  let dv = rut.substr(rut.length - 1, 1);
  if (!terminaEnK) {
    rut = rut.substr(0, rut.length - 1);
  } else {
    dv = "K";
  }
  if (rut && dv) {
    return formatearMillones(rut) + "-" + dv;
  }
  return rutInit;

  function formatearMillones(nNmb) {
    let sRes = "";
    for (let j = 0, i = nNmb.length - 1; i >= 0; i--, j++)
      sRes = nNmb.charAt(i) + (j > 0 && j % 3 === 0 ? "." : "") + sRes;
    return sRes;
  }
}

// Checkea si es un rut chileno válido
export const checkRut = (rut) => {
  let valor = rut.replace(".", "");
  valor = valor.replace("-", "");
  valor = valor.replace(".", "");
  const cuerpo = valor.slice(0, -1);
  let dv = valor.slice(-1).toUpperCase();
  let suma = 0;
  let multiplo = 2;

  if (cuerpo.length < 7) return false;

  for (let i = 1; i <= cuerpo.length; i++) {
    let index = multiplo * valor.charAt(cuerpo.length - i);
    suma = suma + index;
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }

  let dvEsperado = 11 - (suma % 11);
  dv = dv === "K" ? 10 : dv;
  dv = parseInt(dv) === 0 ? 11 : dv;

  if (parseInt(dvEsperado) !== parseInt(dv)) {
    return false;
  }
  return true;
};
