import * as emoji from 'node-emoji';
import chalk from "chalk";
import DefaultTimer from "../time/DefaultTimer";
import logResults from "../log/logResults";
import spawnAllFolders from "./spawnAllFolders";

export function spawn(command, args, folders) {
    let timer = new DefaultTimer();

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
}