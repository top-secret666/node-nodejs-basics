const fs = require('fs');
const path = require('path');

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');

    try {
        // Проверяем, существует ли файл
        await fs.access(filePath);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Если файла нет, создаем его
            await fs.writeFile(filePath, 'I am fresh and young');
            console.log('File created successfully');
        } else {
            // Ловим любую другую ошибку
            throw error;
        }
    }
};

create().catch(console.error);
await create();
