const express = require("express");
const musicController = require("../controllers/music.controller");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/x-wav",
      "audio/ogg",
      "audio/mp4",
      "audio/aac",
      "audio/webm",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only audio files are allowed"));
    }
  },
});

const uploadMusic = (req, res, next) => {
  upload.single("music")(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File size must be less than 20 MB",
        });
      }

      return res.status(400).json({
        message: error.message,
      });
    }

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    next();
  });
};

const router = express.Router();

router.post(
  "/upload",
  authMiddleware.authMiddleware,
  uploadMusic,
  musicController.createMusic,
);

router.post(
  "/album",
  authMiddleware.authMiddleware,
  musicController.createAlbum,
);

router.get("/", authMiddleware.authUser, musicController.getAllMusics);

router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);

router.get(
  "/albums/:albumId",
  authMiddleware.authUser,
  musicController.getAlbumById,
);

module.exports = router;