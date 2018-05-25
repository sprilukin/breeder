import * as moment from "moment";

class Timer {
    _start: number;
    _end: number;

    constructor() {
        this._start = Date.now();
        this._end = null;
    }

    stop() {
        if (!this._end) {
            this._end = Date.now();
        }
    }

    format() {
        this.stop();

        let diff = moment(this._end).diff(this._start);

        let duration = moment.duration(diff);

        let sec = Number(moment.utc(duration.asMilliseconds()).format("s"));
        let min = Number(moment.utc(duration.asMilliseconds()).format("m"));
        let hour = Number(moment.utc(duration.asMilliseconds()).format("H"));

        let format = sec + "s";

        if (min > 0 || hour > 0) {
            format = min + "m " + format;
        }

        if (hour > 0) {
            format = hour + "h " + format;
        }

        return format;
    }

    get start() {
        return this._start;
    }

    get end() {
        this.stop();

        return this._end;
    }

    diff() {
        this.stop();

        return this._end - this._start;
    }
}

export default Timer;