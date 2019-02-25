const chalk = require('chalk'); // Le da color al texto en la consola
const figlet = require('figlet'); // Texto bonito para titulo
const minimist = require('minimist'); // Permite leer parametros al ejecutar
const fs = require('fs'); // Permite manejar archivos



// imprimr titulo del proyecto
const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("MD-LINKS", {
                font: "Contrast",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};
const errorYFinalizar = (texto) => {
    console.log(chalk.red('Error: ' ,texto , '\nUse --help para ayuda'));
    process.exit(0);
};

const validarArchivo = (path) => {
    // Validar la ruta
    if (fs.existsSync(path)) {
        console.log('existe la ruta');
        // Verificamos que sea un archivo, por que una ruta puede ser valida, pero ser una carpeta
        if(fs.statSync(path).isFile()) {
            // Verificamos que sea un archivo .md
            const arrCadenas = path.split('.');
            if (arrCadenas[1] === 'md'){
                return true;
            }
        }
    }
    return false;
};

const getParams = () => {
    const args = minimist(process.argv.slice(2));
    let parametros = {
        validate: false,
        stats: false,
        file: []
    };
    if (args._.length) {
        args._.forEach((url) => {
            const existe = validarArchivo(url);
            if(!existe) {
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
    init,
    getParams
};