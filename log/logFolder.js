const chalk = require('chalk'),
    log = console.log;

function dataToString(data) {
    if (data instanceof Buffer) {
        return data.toString('utf8');
    } else {
        return data;
    }
}

function logFolder(folder, logEntriesContainer) {
    let logEntries = logEntriesContainer.memo;

    if (logEntries.length > 0) {
        log(chalk.blue(folder));
    }

    logEntries.forEach(entry => {
        if (entry.type === "stdout") {
            log(dataToString(entry.data));
        } else if (entry.type === "stderr") {
            log(chalk`{red ${dataToString(entry.data)}}`);
        }
    });
}

module.exports = logFolder;