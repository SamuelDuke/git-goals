const mongoose = require('mongoose');
const config = require('./config/main');

module.exports = () => {
    // Connect mongoose to handle promises
    mongoose.Promise = global.Promise;

    // Database Setup
    mongoose.connect(config.database, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).catch((err) => {
        console.log("There was an error connecting to the database: ", err);
});
};
