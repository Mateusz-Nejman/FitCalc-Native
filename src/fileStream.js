import * as FileSystem from 'expo-file-system';

const writeFile = (filepath, content) => {
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + filepath, content);
}

const readFile = async (filepath) => {
    if (await existsFile(filepath)) {
        return await FileSystem.readAsStringAsync(FileSystem.documentDirectory + filepath);
    }
    else return false;
}

const existsFile = async (filepath) => {
    const info = await FileSystem.getInfoAsync(FileSystem.documentDirectory + filepath);
    return info.exists;
}

const deleteFile = async (filepath) => {
    const exists = await existsFile(filepath);

    if (exists)
        await FileSystem.deleteAsync(FileSystem.documentDirectory + filepath);
}

export { writeFile, readFile, existsFile, deleteFile };
export default writeFile;