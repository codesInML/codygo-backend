import multer from "multer";
const directoryPath = __dirname + "/../resources/static/assets/uploads/";

export const imageFilter = (req: any, file: any, cb: any) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const imageMaxSize = 10 * 1024 * 1024;

export const hotelImagesUploader = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, directoryPath);
    },
    filename: (req, file, cb) => {
      const fileName = `hotel_${Date.now()}___${file.originalname}`;
      cb(null, fileName);
    },
  });

  return multer({
    storage,
    limits: { fileSize: imageMaxSize },
    fileFilter: imageFilter,
  }).fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "otherImages", maxCount: 20 },
  ]);
};
