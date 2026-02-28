const express = require("express");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const router = express.Router();

const IMAGES_DIR = path.join(__dirname, "../public/images");

router.get("/:filename", async (req, res) => {

    try {
        const { filename } = req.params
        const { width, quality } = req.query

        const imagePath = path.join(IMAGES_DIR, filename)

        if (!imagePath.startsWith(IMAGES_DIR))
            return res.status(400).json({ error: "Invalid filename" });


        if (!fs.existsSync(imagePath))
            return res.status(404).json({ error: "Image not found" });


        const parsedWidth = width ? parseInt(width) : null
        const parsedQuality = quality ? parseInt(quality) : null

        if (parsedWidth && (parsedWidth < 1 || parsedWidth > 2000))
            return res.status(400).json({ error: "Invalid width value" });


        if (parsedQuality && (parsedQuality < 1 || parsedQuality > 100))
            return res.status(400).json({ error: "Invalid quality value" });


        const ext = path.extname(filename).toLowerCase();
        const contentTypeMap = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".webp": "image/webp",
        }

        const contentType = contentTypeMap[ext] || "application/octet-stream";

        res.setHeader("Content-Type", contentType);
        res.setHeader("Cache-Control", "public, max-age=31536000");


        let transformer = sharp(imagePath);

        if (parsedWidth)
            transformer = transformer.resize({ width: parsedWidth });


        if (ext === ".jpg" || ext === ".jpeg")
            transformer = transformer.jpeg({ quality: parsedQuality || 80 });
        else if (ext === ".png")
            transformer = transformer.png({ quality: parsedQuality || 80 });
        else if (ext === ".webp")
            transformer = transformer.webp({ quality: parsedQuality || 80 });

        transformer.pipe(res);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }

});

module.exports = router;