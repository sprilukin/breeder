import { exec } from 'child_process';

export default function (command, args, options) {
    return exec(command, options);
};