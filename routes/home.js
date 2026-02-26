const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, (req, res) => {
    res.render("index", { pageTitle: "Edge Image Catalog" });
});

module.exports = router;