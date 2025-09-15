import multer from "multer";

const storage = multer.memoryStorage();

// 🎬 Movies ke liye
export const uploadMovie = multer({ storage }).fields([
  { name: "poster", maxCount: 1 },
  { name: "castImages", maxCount: 20 },
]);

// 🎭 Theater request ke liye
export const uploadTheater = multer({ storage }).fields([
  { name: "theaterLogo", maxCount: 1 },
  { name: "documents", maxCount: 5 },       
  { name: "theaterImages", maxCount: 10 },  
]);
