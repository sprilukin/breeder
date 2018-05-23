const emoji = require('node-emoji'),
    chalk = require("chalk");

require('dotenv').config();

module.exports = function(result) {
    result.forEach(folder => {
        let time = emoji.get("hourglass_flowing_sand");

        let logData = [
            emoji.get("point_right"),
            chalk.blue(folder.name)
        ];

        if (folder.exitcode > 0) {
            logData.push(chalk.red(`exit code ${folder.exitcode}`));
        }

        logData.push(time);
        logData.push(chalk.yellow(folder.formattedTime));

        console.log.apply(null, logData);
    });
};