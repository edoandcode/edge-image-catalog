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
    const cfCountry = req.headers["cf-ipcountry"];

    let country = null
    let source = null

    if (cfCountry) {
        country = cfCountry.trim().toUpperCase();
        source = "cloudflare header";
    } else {
        const clientIp = getClientIp(req);
        const geo = geoip.lookup(clientIp);

        country = geo?.country || 'UNKNOWN';
        source = "origin IP geolocation";
    }

    res.json({
        message: `Welcome! Your country is detected as ${country}`,
        country,
        source,
        timestamp: new Date().toISOString(),
    });


});

module.exports = router;