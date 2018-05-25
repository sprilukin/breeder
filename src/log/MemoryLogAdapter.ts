const LogEntryTypes = require("./LogEntryTypes");

class MemoryLogAdapter {

    constructor() {
        this._memo = [];
        this._exitcode = null;
    }

    onStdout(data) {
        this._memo.push({
            data: data,
            type: LogEntryTypes.STDOUT
        });
    }

    onStderr(data) {
        this._memo.push({
            data: data,
            type: LogEntryTypes.STDERR
        });
    }

    onClose(code) {
        this._exitcode = code;
    }


    get memo() {
        return this._memo;
    }


    get exitcode() {
        return this._exitcode;
    }
}

module.exports = MemoryLogAdapter;