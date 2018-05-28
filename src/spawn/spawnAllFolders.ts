import * as emoji from 'node-emoji';
import chalk from "chalk";
import spawnCommand from "./spawnCommand";
import DefaultTimer from "../time/DefaultTimer";
import logFolder from "../log/logFolder";
import MemoryLogAdapter from "../log/MemoryLogAdapter";

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

export default function (spawnopts, folders) {
    const allPromises = [];

    let orange = chalk.keyword('orange');
    let command = [spawnopts.command].concat(spawnopts.args).join(" ");

    console.log(emoji.get("rocket"), chalk.blue("executing:"), orange(`\`${command}\``));

    folders.forEach(folder => {
        let log = new MemoryLogAdapter();
        let timer = new DefaultTimer();

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