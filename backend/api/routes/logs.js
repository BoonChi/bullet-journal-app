var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const logSchema = require("../models/logSchema")
mongoose.connect('mongodb://admin:password@db:27017/mydb?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
console.log(mongoose.connection.readyState);

/* GET specific log listing. */
router.get('/:type', function (req, res, next) {
    let searchQuery = {
        ...req.params,
        day: "",
        month: "",
        year: ""
    }
    switch (req.params.type) {
        case "daily":
            searchQuery.day = req.query.currentDate.split('/')[0]
            searchQuery.month = req.query.currentDate.split('/')[1]
            searchQuery.year = req.query.currentDate.split('/')[2]
            break;
        case "monthly":
            searchQuery.month = req.query.currentDate.split('/')[0]
            searchQuery.year = req.query.currentDate.split('/')[1]
            break;
        case "future":
            searchQuery.year = req.query.currentDate
            break;
    }
    logSchema.find(searchQuery)
        .exec(function (err, logs) {
            if (err) {
                res.json(err);
            } else {
                res.json(logs);
            }
        });
});
/* POST log listing. */
router.post('/', function (req, res, next) {
    logSchema.create(req.body, function (err, data) {
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
    if (req.body.type) {
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
