const express = require("express");
const { Users } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
    const { avatar, name, email, password } = req.body;
    try {
        if (!avatar || !name || !email || !password) {
            return res.status(400).send({ "msg": "all fields mandatory" });
        } else {
            const isPresent = await Users.findOne({ email });
            if (isPresent) {
                return res.status(400).send({ "msg": "user is already present" });
            } else {
                bcrypt.hash(password, 5, (err, hash) => {
                    if (err) {
                        res.status(400).send({ "msg": "something wrong in bcrypt" });
                    } else {
                        const user = new Users({ avatar, name, email, password: hash });
                        user.save();
                        res.status(200).send({ "msg": "A new user has been registered" });
                    }
                });
            }
        }
    } catch (err) {
        res.status(401).send({ "error": "something wrong in catch block for user", err });
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({ "msg": "all fields mandatory" });
        } else {
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(202).send("Please Register first");
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ userID: user._id, name: user.name }, "masai", { expiresIn: 84600 });
                        res.status(200).send({ "msg": "Login Successful!", "token": token });
                    } else {
                        res.status(200).send({ "error": "Wrong Credentials" });
                    }
                });
            }
        }
    } catch (err) {
        res.status(400).send({ "error": err });
    }
});

module.exports = {
    authRouter
};
