const chalk = require('chalk'); // Le da color al texto en la consola
const Util = require('./modulos/utilidades/inicio'); // Utilidades basicas
const fs = require('fs'); // Permite manejar archivos

/*
let parametros = {
        validate: false,
        stats: false,
        file: []
    };
*/


const specialCharacter = (linea, characterOpen, characterClose) => {
  let openIndex = -1;
  let closeIndex = -1;
  for (let indice = 0; indice <= linea.length; indice++) {
    // Buscamos el primer indice del corchete que abre
    if (linea[indice] === characterOpen && openIndex === -1) {
      openIndex = indice;
    }
    // Si ya hemos encontrado un corchete que abre lee la linea y encuentra el que cierra [] ]
    if (openIndex !== -1 && linea[indice] === characterClose) {
      closeIndex = indice;
    }
  }
  if (openIndex !== -1 && closeIndex !== -1) {
    //console.log('linea: ', linea);
    //console.log(openIndex, closeIndex);
    return linea.substring(openIndex + 1, closeIndex)
  }
  return '';
};

const procesarTextoArchivo = (texto) => {
  console.log('Texto archivo');
  const textoEnLineas = texto.split('\n');
  textoEnLineas.forEach((linea, numeroLinea, status) => {
    const textoLink = specialCharacter(linea, '[', ']');
    const textoUrl = specialCharacter(linea, '(', ')');
    if (textoLink !== '' && textoUrl) {
      console.log(chalk.red('Numero Linea: ', numeroLinea + 1));
      console.log('texto link : ', '[', textoLink, ']');
      console.log('texto url : ', '(', textoUrl, ')');
    }
  })
};

// let xhttp= new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     this.getAllResponseHeaders();
//   }
// };


// Script principal del programa
const run = async () => {
  // Primero leemos parametros
  const params = Util.getParams();
  // Imprimimos pantalla de inicio
  Util.init();

  console.log(chalk.blue(`Parametros a utilizar:`));
  console.log(params);

  params.file.forEach((urlPath) => {
    fs.readFile(urlPath, function read(err, data) {
      if (err) {
        throw err;
      }
      content = data;
      procesarTextoArchivo(content.toString('utf8'))

    });
  });
  //   function existeUrl(url) {
  //     var http = new XMLHttpRequest();
  //     http.open('HEAD', url, false);
  //     http.send();
  //     return http.status!=404;
  //  }
  // console.log(chalk.blue('Parametros para mi'));
  // console.log(chalk.yellow('validate: ', params.validate));
  // console.log(chalk.yellow('stats: ', params.stats));
};



run()