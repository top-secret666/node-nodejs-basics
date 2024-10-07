import { promises as fs } from 'fs';
import path from 'path';

const renameFile = async () => {
    const wrongFilename = path.join(__dirname, 'wrongFilename.txt');
    const properFilename = path.join(__dirname, 'properFilename.md');

    try {
        await fs.access(wrongFilename);

        try {
            await fs.access(properFilename);
            throw new Error('FS operation failed: properFilename.md already exists');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await fs.rename(wrongFilename, properFilename);
        console.log('File renamed successfully');
        
    } catch (error) {
        console.error('FS operation failed:', error.message);
    }
};

renameFile();
