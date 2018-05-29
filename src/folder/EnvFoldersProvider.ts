import FoldersProvider from "./FoldersProvider";

class EnvFoldersProvider implements FoldersProvider {

    get(): string[] {
        return process.env.SPAWN_FOLDERS && process.env.SPAWN_FOLDERS.split(",");
    }
}

export default EnvFoldersProvider;