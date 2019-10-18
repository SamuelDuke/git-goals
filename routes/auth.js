const jwt = require('jsonwebtoken');
const configMain = require('../config/main');

const User = require('../data_models/user');

const generateToken = (user) => {
    return jwt.sign(user, configMain.jwtSecret, {
        expiresIn: configMain.jwtExpiration // in seconds
    });
};

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

exports.loginUser = (req, res, next) => {
    res.json({Data: "Login"})
};

exports.registerUser = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    User({ firstName, lastName, email: email.toLowerCase(), password })
        .save()
        .then(user => {
        return res.json(user.infoToSend());
    })
.catch(err => {
        return res.json({msg: "There was an error",error: err});
    })
};

exports.generateJWTLocal = (req, res, next) => {
    const { email: email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'This post request requires the following in the body of the request: [password, email]'})
    }

    User.findOne({email: email.toLowerCase()}).exec()
        .then(user => {
            if (user === null) {
                return res.status(400).json({error: 'That email is not registered.'});
            }

            if (user.validPassword(req.body.password)) {
                const token = generateToken(user.infoToSend());
                return res.status(200).json({token: token});
            } else {
                return res.status(400).json({error: 'That is the wrong password.'});
            }
        }).then(null, err => { return next(err); });
};