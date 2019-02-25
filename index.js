const chalk = require('chalk'); // Le da color al texto en la consola
const figlet = require('figlet'); // Texto bonito para titulo
const minimist = require('minimist'); // Permite leer parametros al ejecutar
const Util = require('./modulos/utilidades/inicio'); // Utilidades basicas

// Script principal del programa
const run = async () => {
    // const params = getParams();
    Util.init();
    const params = Util.getParams();
    console.log(chalk.blue('Parametros para mi'));
    console.log(chalk.yellow('validate: ', params.validate));
    console.log(chalk.yellow('stats: ', params.stats));
};

run();