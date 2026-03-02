"use strict";
const express = require("express");
const geoip = require("geoip-lite");

const router = express.Router();

function getClientIp(req) {
    return (
        req.headers["cf-connecting-ip"] ||
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress
    );
}

router.get("/", (req, res) => {
    const clientIp = getClientIp(req);
    const geo = geoip.lookup(clientIp);

    const country = geo?.country || "UNKNOWN";

    res.json({
        message: `Welcome! Your country is detected as ${country}`,
        country,
        source: "origin",
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;