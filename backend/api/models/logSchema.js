var mongoose = require('mongoose')
var Schema = mongoose.Schema

var logSchema = new Schema({
    type: String,
    details: String,
    duration: Number,
    mark: Boolean,
    itemType: String
}, { collection: 'bulletJournal' });

module.exports = mongoose.model('log', logSchema);