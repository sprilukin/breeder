let spawnAdapter = require("./spawnAdapter");

function logOnSpawnedProcess(spawned, promise, log) {
    spawned.stdout.on('data', log.onStdout.bind(log));

    spawned.stderr.on('data', log.onStderr.bind(log));

    spawned.on('close', (code) => {
        log.onClose(code);

        if (code === 0) {
            promise.resolve();
        } else {
            promise.reject(code);
        }
    });
}

function spawnInPromise(options) {
    const spawn = options.spawn || spawnAdapter,
        command = options.command,
        args = options.args,
        opts = options.options,

        log = options.log,
        deferred = options.deferred;

    const spawned = spawn(command, args, opts);

    logOnSpawnedProcess(spawned, deferred, log);
}

module.exports = function(options) {
    return new Promise(function (resolve, reject) {
        let deferred = {resolve: resolve, reject: reject};

        spawnInPromise(Object.assign({deferred: deferred}, options));
    });
};