const User = require('../data_models/user');

exports.getMe = (req, res, next) => {
    User.findOne({_id: req.user._id})
        //.populate('groups')
        .exec()
        .then(me => {
            return res.status(200).json(me.infoToSend());
        }).catch(err => {
        res.status(400).json({error: 'There was an error'});
        return next(err);
    })
};