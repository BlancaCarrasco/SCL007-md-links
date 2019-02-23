const chalk = require('chalk'); // Le da color al texto en la consola
const figlet = require('figlet'); // Texto bonito para titulo
const minimist = require('minimist'); // Permite leer parametros al ejecutar



// Print Log startup
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

const getParams = () => {
    const args = minimist(process.argv.slice(2));

    let parametros = {
        validate: false,
        stats: false,
        file: []
    };

    if (args._.length) {
        console.log('vino un parametro');
        parametros.file = args._.length;
    } else {
        console.log(chalk.red(`Error: Debe haber al menos un archivo \nUse --help para ayuda`));
        process.exit(0);
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