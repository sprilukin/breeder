const readdir = require("./readdir");
const emoji = require('node-emoji');
const chalk = require("chalk");
const path = require('path');

function resolveFolders(folders, cwd) {
    cwd = cwd || process.cwd();

    return folders.map(folder => {
        return {
            name: folder,
            path: path.resolve(cwd, folder)
        }
    });
}

module.exports = function (cwd) {
    cwd = cwd || process.cwd();

    const spawnFolders = process.env.SPAWN_FOLDERS && process.env.SPAWN_FOLDERS.split(",");
    const spawnExcept = process.env.SPAWN_EXCEPT && process.env.SPAWN_EXCEPT.split(",");
    const spawnUseExcept = process.env.SPAWN_USE_EXCEPT === "true";

    let folders = spawnFolders || readdir(cwd);

    if (spawnExcept && spawnUseExcept) {
        const foldersToExcept = spawnExcept.reduce((memo, folder) => {
            memo[folder] = true;

            return memo;
        }, {});

        folders = folders.filter(function (folder) {
            return !Boolean(foldersToExcept[folder]);
        });
    }

    let resolvedFolders = resolveFolders(folders, cwd);

    console.log(emoji.get("house"), chalk.yellow("current working directory: "), chalk.cyan(cwd));
    console.log(emoji.get("cyclone"), chalk.yellow("folders: "), chalk.blue(`[${folders.join(",")}]`));

    return resolvedFolders;
};