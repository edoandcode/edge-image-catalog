const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { pageTitle: "Edge Image Catalog" });
});

module.exports = router;