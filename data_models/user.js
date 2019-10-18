const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: {type: String, required: [true, 'You must submit a first name.']},
    lastName: {type: String, required: [true, 'You must submit a last name.']},
});

module.exports = mongoose.model('User', UserSchema);