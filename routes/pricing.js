"use strict";

const express = require("express");

const router = express.Router();

// Geolocation logic: resolve country from request with required priority.
function resolveCountry(req) {
  const headerCountry = normalizeCountry(req.headers["cf-ipcountry"]);
  if (headerCountry) {
    return headerCountry;
  }

  const queryCountry = normalizeCountry(req.query.country);
  if (queryCountry) {
    return queryCountry;
  }

  return null;
}

// Shared country normalization.
function normalizeCountry(value) {
  if (!value || typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toUpperCase();
  return normalized || null;
}

// Pricing logic: map country code to pricing data.
function getPricingData(country) {
  const pricingByCountry = {
    IT: {
      price: 19,
      currency: "EUR",
      marketingMessage: "Soluzione ideale per il mercato italiano.",
      heroImage: "/images/hero-it.jpg"
    },
    US: {
      price: 21,
      currency: "USD",
      marketingMessage: "Perfect solution for the US market.",
      heroImage: "/images/hero-us.jpg"
    },
    FR: {
      price: 18,
      currency: "EUR",
      marketingMessage: "Solution adaptée au marché français.",
      heroImage: "/images/hero-fr.jpg"
    }
  };

  return (
    pricingByCountry[country] || {
      price: 25,
      currency: "USD",
      marketingMessage: "Global solution for international customers.",
      heroImage: "/images/hero-default.jpg"
    }
  );
}

// Rendering logic.
router.get("/", (req, res) => {
  const country = resolveCountry(req);
  const { price, currency, marketingMessage, heroImage } = getPricingData(country);

  res.render("pricing", {
    country,
    price,
    currency,
    marketingMessage,
    heroImage
  });
});

module.exports = router;
module.exports.getPricingData = getPricingData;
module.exports.resolveCountry = resolveCountry;
