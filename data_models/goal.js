const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: [true, 'You must submit a goal title.']},
    detail: {type: String},
    //TODO figure out how to handle the dates
    completionDate: {type: String},
    goalDate: {type: String},
    goalType: {type: String}
});

GoalSchema.index({"user": 1, "title": 1}, {unique: true});

module.exports = mongoose.model('Goal', GoalSchema);