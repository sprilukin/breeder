import * as dotenv from 'dotenv';
import {spawn} from './spawn/spawn';
import {getFolders} from './folder/getFolders';

export = function () {
    dotenv.config();

    const command = process.argv[2];
    const args = process.argv.slice(3);
    const folders = getFolders();

    spawn(command, args, folders);
};