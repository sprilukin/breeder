import LogEntry from "./LogEntry";

class MemoryLogAdapter {

    private _memo: Array<any> = [];
    private _exitcode: Number = -1;

    constructor() {
    }

    onStdout(data) {
        this._memo.push({
            data: data,
            type: LogEntry.Stdout
        });
    }

    onStderr(data) {
        this._memo.push({
            data: data,
            type: LogEntry.Stderr
        });
    }

    onClose(code) {
        this._exitcode = code;
    }


    get memo(): Array<any> {
        return this._memo;
    }

    get exitcode(): Number {
        return this._exitcode;
    }
}

export default MemoryLogAdapter;