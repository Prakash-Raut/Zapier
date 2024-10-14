/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
import {resolve} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: resolve(__dirname, '../../env')});

const nextConfig = {
    env: {
        NEXT_PUBLIC_BACKEND_PROD_URL: process.env.NEXT_PUBLIC_BACKEND_PROD_URL,
    },
};

export default nextConfig;
