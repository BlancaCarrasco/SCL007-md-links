const chalk = require('chalk'); // Le da color al texto en la consola
const figlet = require('figlet'); // Texto bonito para titulo
const minimist = require('minimist'); // Permite leer parametros al ejecutar
const fs = require('fs'); // Permite manejar archivos
// const markdownLinkExtractor = require('markdown-link-extractor');

// Imprime inicio de script
const init = () => {
    console.log(
        chalk.yellow(
            figlet.textSync("MD-LINKS", {
                font: "Contrast",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

const errorYFinalizar = (texto) => {
    console.log(chalk.red('Error: ', texto, '\nUse --help para ayuda'));
    process.exit(0);
};

const mdLinks = (path) => {
    // Validar la ruta
    if (fs.existsSync(path)) {
        console.log('existe la ruta');
        // Verificamos que sea un archivo, por que una ruta puede ser valida, pero ser una carpeta
        if (fs.statSync(path).isFile()) {
            // Verificamos que sea un archivo .md
            const arrCadenas = path.split('.');
            if (arrCadenas[1] === 'md') {
                return true;
            }
        }
        return false;
    }
};
// const markdown = fs.readFileSync(path).toString();
//  const links = markdownLinkExtractor(markdown);
//  let resultLinks = [];
//  let line=0
//   for (let i = 0; i < links.length; i++) {
//      let text = links[i].text;
//        line++
            
//  const arrPromise = fetch(links[i])
//      .then(res => {
//         if (option === "--stats") {
//            total= `${line}`
                            
//        return total
//    }else  if (option === "--validate") {
//     let objetLinks = {
//      statusLinks: `${res.status}`,
//      statusTextLinks: `${res.statusText}`,
//      ruta: `${path}`
//    };
//    return objetLinks
//     .catch((err) => {
//    const objetErr = { statusLinks: "Fail" };
//        return objetErr;
//    })
//    resultLinks.push(arrPromise)
//   }
        
        
    
const getParams = () => {
    const args = minimist(process.argv.slice(2));
    let parametros = {
        validate: false,
        stats: false,
        file: []
    };

    if (args._.length) {
        args._.forEach((url) => {
            const existe = mdLinks(url);
            if (!existe) {
                errorYFinalizar(`Archivo invalido: ${url}`);
            }
            parametros.file.push(url);
        })
    } else {
        errorYFinalizar('Debe haber al menos un archivo');
    }

    if (args.validate) {
        parametros.validate = true;
    }

    if (args.stats) {
        parametros.stats = true
    }
    return parametros;
};
module.exports = {
    mdLinks,
    init,
    getParams
};
// return Promise.all(resultLinks) // devuleve una sola promesa 