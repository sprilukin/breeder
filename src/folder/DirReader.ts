interface DirReader {
    read(parent: string, skip: RegExp[]): string[]
}

export default DirReader;