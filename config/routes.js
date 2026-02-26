const pricing = require("../routes/pricing");
const users = require("../routes/users");
const home = require("../routes/home");

module.exports = function (app) {
    app.use("/", home);
    app.use("/pricing", pricing);
    app.use("/users", users);
}