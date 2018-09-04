import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
    api: process.env['API_URL']
};
