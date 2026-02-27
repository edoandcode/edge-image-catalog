"use strict";

const express = require("express");
const { User } = require('../models/user');
const _ = require('lodash')
const zod = require('zod');
const bcrypt = require('bcrypt');


const router = express.Router();

const validateAuth = (req) => {
    const schema = zod.object({
        email: zod.email("Invalid email address"),
        password: zod.string().min(6, "Password must be at least 6 characters long")
    });
    return schema.safeParse(req);
}

router.post('/login', async (req, res) => {
    const { success, error } = validateAuth(req.body);
    if (!success)
        return res.status(400).json({ error: error?.issues.map(issue => issue.message).join(", ") });

    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ error: "Invalid email or password" });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword)
        return res.status(400).json({ error: "Invalid email or password" });

    const token = user.generateAuthToken();

    res.json({ token });
});

module.exports = router;