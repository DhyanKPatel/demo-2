const jwt = require("jsonwebtoken");
const logger = require('../logger/logger');
const config = require('config');
const res = require("express/lib/response");

const generateToken = (req, res, next) => {
    let token = jwt.sign({ Email: req.body.Email }, config.get('jwtPrivateKey'));
    res.cookie("jwt", token)
    next();
};

const authenticate = (req, res, next) => {
    try {

        const token = req.cookies?.jwt;

        if (token == undefined) {
            res.status(401).send('unauthorizaion');
        }

        const verifyUser = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = verifyUser;

        next();
    } catch (err) {
        logger.error(err);
        console.log("error",err);
    }
}

module.exports = {
    authenticate,
    generateToken
};