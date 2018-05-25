import { spawn } from 'child_process';

export default function (command, args, options) {
    return spawn(command, args, options);
};