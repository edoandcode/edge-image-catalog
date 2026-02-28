const users = require("../routes/users");
const welcome = require("../routes/welcome");
const auth = require("../routes/auth");
const images = require("../routes/images");

module.exports = function (app) {
    app.use("/", welcome);
    app.use("/users", users);
    app.use("/auth", auth);
    app.use("/images", images);
}