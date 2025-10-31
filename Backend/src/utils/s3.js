import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const endpoint = process.env.AWS_S3_ENDPOINT; // ← obligatorio si usas Cloudflare R2


const s3Client = new S3({
  region,
  endpoint, // Cloudflare R2 usa un endpoint distinto, ej: https://<tu_cuenta>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});


export async function uploadFile(fileName, fileBuffer, mimeType = "image/png") {
  try {
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName, // <-- Key real
      Body: fileBuffer,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Devuelve solo la key
    return fileName; 
  } catch (err) {
    console.error("Error al subir a S3:", err);
    throw err;
  }
}


export async function getSignedUrlForFile(fileName, expiresIn = 3600) {
  try {
    const getObjectParams = {
      Bucket: bucketName,
      Key: fileName,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, command, { expiresIn }); // 3600 = 1 hora

    return url;
  } catch (err) {
    console.error("Error generando Signed URL:", err);
    throw err;
  }
}
