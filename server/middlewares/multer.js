const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

function uploadMiddleware(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const folderPath = folderName.trim();
      const fileExtension = path.extname(file.originalname).substring(1);
      const publicId = `${file.fieldname}-${Date.now()}`;

      const resourceType = file.mimetype.startsWith("video")
        ? "video"
        : file.mimetype === "application/pdf"
        ? "raw"
        : "image";

      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension,
        resource_type: resourceType,
      };
    },
  });

  return multer({
    storage,
    limits: {
      fileSize: 100 * 1024 * 1024,
    },
  });
}

module.exports = uploadMiddleware;
