const User = require('../data_models/user');

exports.loginUser = (req, res, next) => {
    res.json({Data: "Login"})
};

exports.registerUser = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;


    User({ firstName, lastName, email, password })
        .save()
        .then(user => {
        return res.json(user);
    })
.catch(err => {
        return res.json({msg: "There was an error",error: err});
    })
};