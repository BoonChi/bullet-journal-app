var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const logSchema = require("../models/logSchema")
mongoose.connect('mongodb://admin:password@localhost:27017/mydb?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
console.log(mongoose.connection.readyState);
/* GET all log listing. */
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

/* GET specific log listing. */
router.get('/:type/:day/:month/:year', function (req, res, next) {
    console.log(req.params)
    logSchema.find(req.params)
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
    logSchema.create({ type: req.body.type, details: req.body.details, duration: req.body.duration, mark: req.body.mark, itemType: req.body.itemType, day: req.body.day, month: req.body.month, year: req.body.year }, function (err, data) {
        if (err) return handleError(err);
        // saved!
        data.save(function (err, logs) {
            if (err) return handleError(err); // saved!
            res.json(logs);
        });
    });
});

/* delete log. */
router.delete('/', function (req, res, next) {
    logSchema.findByIdAndRemove(req.body.id, function (err, data) {
        if (err) return handleError(err);
        res.json(data);
    });
});

/* edit log. */
router.put('/', function (req, res, next) {
    let update = null
    if (req.body.details && req.body.type) {
        update = {
            details: req.body.details,
            duration: req.body.duration,
            type: req.body.type,
            itemType: req.body.itemType,
            day: req.body.day,
            month: req.body.month,
            year: req.body.year

        }
    } else {
        update = {
            mark: req.body.mark
        }
    }
    logSchema.findByIdAndUpdate(req.body.id, update, function (err, data) {
        if (err) return handleError(err);
        // saved!
        data.save(function (err, callback) {
            if (err) return handleError(err); // saved!
            res.json(callback)
        });
    });
});

module.exports = router;
