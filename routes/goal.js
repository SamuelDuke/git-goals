const Goal = require('../data_models/goal');

exports.getAll = (req, res, next) => {
    Goal.find({user: req.user._id})
        .exec()
        .then(goals => {
            return res.status(200).json(goals);
        }).catch(err => {
        res.status(400).json({error: 'There was an error'});
        return next(err);
    })
};

exports.create = (req, res, next) => {
    const { title, detail, goalDate, goalType } = req.body;

    Goal({ user: req.user._id, title, detail, goalDate, goalType })
        .save()
        .then(goal => {
            return res.json(goal);
        })
        .catch(err => {
            return res.json({msg: "There was an error",error: err});
        })
};