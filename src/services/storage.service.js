const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  try {
    const result = await imagekit.files.upload({
      file,
      fileName: "music_" + Date.now(),
      folder: "spotify/music",
    });

    return result;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

module.exports = { uploadFile };