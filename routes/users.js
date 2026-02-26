"use strict";

const express = require("express");
const { User, validateUser } = require('../models/user');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    return res.send(user)
})

router.post('/', async (req, res) => {
    const { success, error } = validateUser(req.body);
    if (!success)
        return res.status(400).json({ error: error?.issues.map(issue => issue.message).join(", ") });

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).json({ error: "User with this email already exists" });

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        await user.save();

        const token = user.generateAuthToken();

        res
            .status(201)
            .header('x-auth-token', token)
            .send(_.pick(user, ['_id', 'name', 'email']));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;