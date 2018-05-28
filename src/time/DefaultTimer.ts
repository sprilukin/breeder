import * as moment from "moment";
import Timer1 from "./Timer1";

class DefaultTimer implements Timer1 {
    _start: number;
    _end: number;

    constructor(start = Date.now()) {
        this._start = start;
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

    start() {
        return this._start;
    }

    end() {
        this.stop();

        return this._end;
    }

    diff() {
        this.stop();

        return this._end - this._start;
    }
}

export default DefaultTimer;