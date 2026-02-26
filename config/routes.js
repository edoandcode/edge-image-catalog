const pricing = require("../routes/pricing");
const users = require("../routes/users");
const home = require("../routes/home");
const auth = require("../routes/auth");

module.exports = function (app) {
    app.use("/", home);
    app.use("/pricing", pricing);
    app.use("/users", users);
    app.use("/auth", auth);
}