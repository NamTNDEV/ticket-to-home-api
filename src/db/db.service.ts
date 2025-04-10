import { Inject, Injectable } from '@nestjs/common';
import { writeFile, access, readFile } from 'fs/promises';
import { DbModuleOptions } from './db.module';

@Injectable()
export class DbService {

    constructor(
        @Inject('OPTIONS')
        private readonly options: DbModuleOptions,
    ) { }

    async read() {
        const filePath = this.options.path;
        try {
            await access(filePath);

            const data = await readFile(filePath, {
                encoding: 'utf-8',
            });

            const parsedData = JSON.parse(data || '[]');
            return Array.isArray(parsedData) ? parsedData : [];

        } catch (error) {
            console.error(`Error reading file at ${filePath}:`, error);
            return error;
        }
    }

    async write(object: Record<string, any>) {
        await writeFile(this.options.path, JSON.stringify(object || []), {
            encoding: 'utf-8',
        });
    }
}
