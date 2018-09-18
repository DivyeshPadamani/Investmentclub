const mongoose = require('mongoose');

const position = require('./models/position');

export default (callback) => {
    const mongoDB = "mongodb://admin:password@ds215089.mlab.com:15089/heroku_g4dz6dr1";
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    callback(db);
};
