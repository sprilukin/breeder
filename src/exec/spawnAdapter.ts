const { spawn } = require('child_process');

module.exports = function (command, options) {
    return spawn(command, Object.assign({}, options, {
        shell: true
    }));
};