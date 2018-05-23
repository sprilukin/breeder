const { spawn } = require('child_process');

module.exports = function (command, args, options) {
    return spawn(command, args, options);
};