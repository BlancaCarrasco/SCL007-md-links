const chalk = require('chalk'); // Le da color al texto en la consola
const Util = require('./modulos/utilidades/inicio'); // Utilidades basicas
const fs = require('fs'); // Permite manejar archivos
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch');
const path = require('path');
const read = process.argv[2]
const pathIsAbsolute= path.resolve(read)



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

const mdLinks = (texto) => {
  console.log('Texto archivo');
  const textInLines = texto.split('\n');
  textInLines.forEach((linea, numeroLinea, ) => {
    const textoLink = specialCharacter(linea, '[', ']');
    const textoUrl = specialCharacter(linea, '(', ')');
    const linksStatus= specialCharacter(linea,);
    if (textoLink !== '' && textoUrl && linksStatus) {
      console.log(chalk.red('Numero Linea: ', numeroLinea + 1));
      console.log('texto link : ', '[', textoLink, ']');
      console.log('texto url : ', '(', textoUrl, ')');
      // console.log('texto statusUrl : ', '(', http.status, ')');
    }
  })
}

function links(pathIsAbsolute) {
  let myPromise = new Promise((res, reject) => {
    let markdown = fs.readFileSync(pathIsAbsolute).toString()
    const linksStatus = markdownLinkExtractor(markdown);
  
     
    console.log(links)
      links.forEach(function (link) {
        console.log(link);
    });
    const arrPromise = [];
    for (let i = 0; i < links.length; i++) {
      const links = linksStatus[i];
      const text = linksStatus[i].text;
      const fetchLinks = fetch(links).then(res => {
          if (process.argv[3] === "--validate") {
            const objectLinks = {
              url: res.url,
              statusLinks: res.status,
              File: pathIsAbsolute,
              statusText: res.statusText
            };
            return objectLinks;
          } else {
            const objectLinks = {
              url: res.url,
              File: pathIsAbsolute
            }
            return objectLinks;
          }
        })
        .catch(error => {
          const objectLinks = {
            url: link,
            statusLinks: "FAIL",
          };
          return objectLinks;
        });
      arrPromise.push(fetchLinks);
    }
    Promise.all(arrPromise).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error);
    })
  })
};

mdLinks(pathIsAbsolute);

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
      mdLinks(content.toString('utf8'))

    });
  });

  // console.log(chalk.blue('Parametros para mi'));
  // console.log(chalk.yellow('validate: ', params.validate));
  // console.log(chalk.yellow('stats: ', params.stats));
};
run()