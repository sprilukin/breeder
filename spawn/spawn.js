const emoji = require('node-emoji'),
    chalk = require("chalk"),
    Timer = require("../time/timer"),
    logResults = require("../log/logResults"),
    spawnAllFolders = require("./spawnAllFolders");

require('dotenv').config();

module.exports = function(command, args, folders) {
    let timer = new Timer();

    let loader = setInterval(function () {
        console.log(".");
    }, 1000);

    spawnAllFolders({
        command: command,
        args: args
    }, folders).then(function (result) {
        clearInterval(loader);

        logResults(result);

        let magenta = chalk.keyword('magenta');

        console.log(emoji.get("rainbow"), magenta(chalk.underline("All done!")), emoji.get("hourglass_flowing_sand"), chalk.yellow(timer.format()));
    });
};