const { exec } = require('child_process');

module.exports = function (command, args, options) {
    return exec(command, options);
};