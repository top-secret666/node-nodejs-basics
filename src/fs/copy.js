import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files_copy');

const copyDir = async (src, dest) => {
    await fs.mkdir(dest, { recursive: true });

    const entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else if (entry.isFile()) {
            await fs.copyFile(srcPath, destPath);
        }
    }
};

const copyFolder = async () => {
    try {
        await fs.access(srcFolder);
        
        try {
            await fs.access(destFolder);
            throw new Error('files_copy already exists');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await copyDir(srcFolder, destFolder);
        console.log('Folder copied successfully');
    } catch (error) {
        console.error('FS operation failed:', error.message);
    }
};

copyFolder();
