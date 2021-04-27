
const express = require('express');
const router = express.Router();

const{ District } = require('../models');

router.get('/', (req, res) => {
    // Return array of all districts in database
    District.find().then((districts) => {
        res.send(districts);
    }).catch((e) => {
        res.send(e);
    });
})

router.post('/', (req, res) => {
    // Create district and return new district to user
    let districtName = req.body.districtName;
    let schools = req.body.schools;
    let newDistrict = new District({
        districtName,
        schools
    });
    newDistrict.save().then((districtDoc) => {
        res.send(districtDoc);
    })
})

router.patch('/:id', (req, res) => {
    District.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
})

router.delete('/:id', (req, res) => {
    District.findOneAndRemove({
        _id: req.params.id
    }).then((removedDistrictDoc) => {
        res.send(removedDistrictDoc);
    })
})

module.exports = router