var mongoose = require('mongoose')
var Schema = mongoose.Schema

var logSchema = new Schema({
    title: String,
    type: String,
    details: String,
    duration: Number,
}, { collection: 'bulletJournal' });

module.exports = mongoose.model('log', logSchema);