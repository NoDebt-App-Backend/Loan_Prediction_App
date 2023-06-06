import { S3Client } from "@aws-sdk/client-s3";
import { config } from '../config/index.js';

export const s3 = new S3Client({
    credentials: {
        accessKeyId: config.access_key,
        secretAccessKey: config.secret_access_key,
    },
    region: config.bucket_region
})