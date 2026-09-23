const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");


async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Music file is required" });
    }

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = new musicModel({
      uri: result.url,
      title,
      artist: req.user.id
    });

    await music.save();
    res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createAlbum(req, res) {
  try {
    const { title, musics } = req.body;

    const album = new albumModel({
      title,
      artist: req.user.id,
      musics: musics,
    });

    await album.save();
    res.status(201).json({
      message: "Album created successfully",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getAllMusics(req, res) {
  try {
    const musics = await musicModel.find().limit(10).populate("artist", "username email");
    res.status(200).json({
      message: "Musics retrieved successfully",
      musics,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAllAlbums(req, res) {
    try {
        const albums = await albumModel.find().select("title artist") .populate("artist", "username email");
        res.status(200).json({
            message: "Albums retrieved successfully",
            albums
        })
    } catch (error){
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function getAlbumById(req, res) {

    try {
        const albumId = req.params.albumId;

        const album = await albumModel.findById(albumId).populate("musics", "title uri").populate("artist", "username email");

        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }

        res.status(200).json({
            message: "Album retrieved successfully",
            album
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };
