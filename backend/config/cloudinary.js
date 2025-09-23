import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (fileBuffer, folder, filename, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType, // ✅ use parameter
        public_id: filename ? filename.split(".")[0] : undefined, // optional
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url); // sirf URL return karenge
      }
    );
    stream.end(fileBuffer);
  });
};

export { cloudinary };
