import FoldersProvider from "./FoldersProvider";
import {resolve} from "path";
import DirReader from "./DirReader";

class DefaultFoldersProvider implements FoldersProvider {

    _cwd: string;
    _envFoldersProvider: FoldersProvider;
    _dirReader: DirReader;
    _skip: RegExp[];

    constructor(cwd: string, envFoldersProvider: FoldersProvider, dirReader: DirReader, skip: RegExp[]) {
        this._cwd = cwd;
        this._envFoldersProvider = envFoldersProvider;
        this._dirReader = dirReader;
        this._skip = skip;
    }

    _resolveFolders(folders, cwd) {
        cwd = cwd || process.cwd();

        return folders.map(folder => {
            return {
                name: folder,
                path: resolve(cwd, folder)
            }
        });
    }

    _filterByExcept(folders:string[], except: string[]) {
        const foldersToExcept = except.reduce((memo, folder) => {
            memo[folder] = true;

            return memo;
        }, {});

        return folders.filter(folder => {
            return !Boolean(foldersToExcept[folder]);
        });
    }

    get(): string[] {
        const spawnExcept = process.env.SPAWN_EXCEPT && process.env.SPAWN_EXCEPT.split(",");
        const spawnUseExcept = process.env.SPAWN_USE_EXCEPT === "true";

        let foldersFromEnv = this._envFoldersProvider.get();

        let folders = foldersFromEnv || this._dirReader.read(this._cwd, this._skip);

        if (spawnExcept && spawnUseExcept) {
            folders = this._filterByExcept(folders, spawnExcept);
        }

        return this._resolveFolders(folders, this._cwd);
    }
}

export default DefaultFoldersProvider;