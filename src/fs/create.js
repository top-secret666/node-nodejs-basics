import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fresh.txt');

const fileContent = 'I am fresh and young';

const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
};

const createFile = async () => {
const exists = await fileExists(filePath);

    if (exists) {
        console.error('FS operation failed: The file already exists');
        return;
    }

    try {
        await fs.writeFile(filePath, fileContent);
        console.log('File created successfully with the content:', fileContent);
    } catch (error) {
        console.error('Error while creating the file:', error.message);
    }
};

createFile();

