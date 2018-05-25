import {lstatSync, readdirSync} from 'fs';
import {join} from 'path';

const SKIP_FOLDERS = [
    /^\./g
];

function isDirectory(source, name) {
    let folder = join(source, name);

    return lstatSync(folder).isDirectory();
}

function isNotIgnored(source) {
    let result = SKIP_FOLDERS.find(regex => Boolean(source.match(regex)));

    return !Boolean(result);
}


export default function (parentFolder) {
    return readdirSync(parentFolder)
        .filter(isNotIgnored)
        .filter(isDirectory.bind(null, parentFolder));
};