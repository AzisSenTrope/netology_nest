import fs from 'fs'


export function deleteFile(path) {
    fs.unlinkSync(path);
}
