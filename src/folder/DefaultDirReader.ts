import DirReader from "./DirReader";
import {lstatSync, readdirSync} from 'fs';
import {join} from 'path';

class DefaultDirReader implements DirReader {

    read(parent: string, skip: RegExp[]): string[] {
        return readdirSync(parent)
            .filter(this._isNotIgnored.bind(null, skip))
            .filter(this._isDirectory.bind(null, parent));
    }

    _isDirectory(source: string, name: string) {
        let folder = join(source, name);

        return lstatSync(folder).isDirectory();
    }

    _isNotIgnored(skip: RegExp[], source: string) {
        let result = skip.find(regex => Boolean(source.match(regex)));

        return !Boolean(result);
    }
}

export default DefaultDirReader;