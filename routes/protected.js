"use strict";
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    const userId = req.user._id;

    res.json({
        message: 'Authenticated',
        userId,
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;