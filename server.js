"use strict";

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const connectToDatabase = require("./config/db");
const routes = require("./config/routes");
const auth = require("./middleware/auth");

const app = express();

connectToDatabase();

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);

//app.use(express.static(path.join(__dirname, "public")));

routes(app);

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
