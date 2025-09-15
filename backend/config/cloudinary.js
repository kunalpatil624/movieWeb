// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // export const uploadImage = async (filePath) => {
// //   try {
// //     const result = await cloudinary.uploader.upload(filePath, {
// //       folder: 'my_uploads'
// //     });
// //     console.log('Uploaded URL:', result.secure_url);
// //     return result.secure_url;
// //   } catch (error) {
// //     console.error('Upload error:', error);
// //   }
// // };

// export default cloudinary;

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url); // 👈 sirf URL return karenge
      }
    );
    stream.end(fileBuffer);
  });
};
export { cloudinary };