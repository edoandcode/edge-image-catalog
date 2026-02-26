const mongoose = require('mongoose');
const zod = require('zod');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET_KEY);
    return token;
}

const User = mongoose.model('User', userSchema)




const validateUser = (data) => {
    const schema = zod.object({
        name: zod.string().min(1, "Name is required"),
        email: zod.email("Invalid email address"),
        password: zod.string().min(6, "Password must be at least 6 characters long")
    });
    return schema.safeParse(data);
}

module.exports = { User, validateUser };