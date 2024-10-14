/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
import {resolve} from 'path';

dotenv.config({path: resolve(__dirname, '../../env')});

const nextConfig = {
    env: {
        NEXT_PUBLIC_BACKEND_PROD_URL: process.env.NEXT_PUBLIC_BACKEND_PROD_URL,
    },
};

export default nextConfig;
