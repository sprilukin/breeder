import {spawn} from 'child_process';

export default function (command, options) {
    return spawn(command, Object.assign({}, options, {
        shell: true
    }));
};