import { promises as fs } from 'fs';
import path from 'path';

const create = async () => {
const filePath = path.join(__dirname, 'files', 'fresh.txt');

    try {
        await fs.access(filePath);
        throw new Error('FS operation failed: File already exists');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, 'I am fresh and young');
            console.log('File created successfully');
        } else {
            throw error;
        }
    }
};

create().catch(console.error);

