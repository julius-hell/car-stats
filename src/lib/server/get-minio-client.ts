import { env } from "$env/dynamic/private";
import { Client as MinioClient } from "minio";

export function getMinioClient() {
    const endPoint = env.MINIO_ENDPOINT;
    if(!endPoint) {
        throw new Error("Missing MINIO_ENDPOINT env");
    }

    const port = parseInt(env.MINIO_PORT, 10);
    if(isNaN(port)) {
        throw new Error("Missing MINIO_PORT env");
    }
    const useSSL = env.MINIO_USE_SSL === "true";

    const accessKey = env.MINIO_ACCESS_KEY;
    if(!accessKey) {
        throw new Error("Missing access key env");
    }

    const secretKey = env.MINIO_SECRET;
    if(!secretKey) {
        throw new Error("Missing secretKey env");
    }

    return new MinioClient({
        endPoint,
        port,
        useSSL,
        accessKey,
        secretKey,
    });
}
