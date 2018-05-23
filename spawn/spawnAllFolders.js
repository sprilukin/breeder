const emoji = require('node-emoji'),
    chalk = require("chalk"),
    spawnCommand = require("./spawnCommand"),
    Timer = require("../time/timer"),
    logFolder = require("../log/logFolder"),
    MemoryLogAdapter = require("../log/MemoryLogAdapter");

function done(folder, timer, log) {
    timer.stop();

    logFolder(folder, log);

    return {
        name: folder,
        time: timer.diff(),
        formattedTime: timer.format(),
        exitcode: log.exitcode
    };
}

module.exports = function (spawnopts, folders) {
    const allPromises = [];

    let orange = chalk.keyword('orange');
    let command = [spawnopts.command].concat(spawnopts.args).join(" ");

    console.log(emoji.get("rocket"), chalk.blue("executing:"), orange(`\`${command}\``));

    folders.forEach(folder => {
        let log = new MemoryLogAdapter();
        let timer = new Timer();

        let then = done.bind(null, folder.name, timer, log);

        let promise = spawnCommand(Object.assign({
            log: log,
            options: {
                cwd: folder.path
            }
        }, spawnopts)).then(then, then);

        allPromises.push(promise);
    });

    return Promise.all(allPromises);
};