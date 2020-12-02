var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const logSchema = require("../models/logSchema")
mongoose.connect('mongodb://admin:password@localhost:27017/mydb?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
console.log(mongoose.connection.readyState);

/* GET log listing. */
router.get('/', function (req, res, next) {
    logSchema.find({})
        .exec(function (err, logs) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(logs);
            }
        });
});
/* POST log listing. */
router.post('/', function (req, res, next) {
    logSchema.create({ type: req.body.type, details: req.body.details, duration: req.body.duration }, function (err, data) {
        if (err) return handleError(err);
        // saved!
        data.save(function (err) {
            if (err) return handleError(err); // saved!
        });
    });
});

/* delete log. */
router.delete('/', function (req, res, next) {
    logSchema.findByIdAndRemove(req.body.id, function (err, data) {
        if (err) return handleError(err);
    });
});

/* edit log. */
router.put('/', function (req, res, next) {
    const update = {
        details: req.body.details,
        duration: req.body.duration,
        type: req.body.type
    }
    console.log("edit route")
    logSchema.findByIdAndUpdate(req.body.id, update, function (err, data) {
        if (err) return handleError(err);
        // saved!
        data.save(function (err, callback) {
            if (err) return handleError(err); // saved!
            console.log(callback)
        });
    });
});

module.exports = router;
