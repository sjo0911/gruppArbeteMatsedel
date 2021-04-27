
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
    let districtName = req.body.name;
    let schools = req.body.schools;
    let newDistrict = new District({
        districtName,
        schools
    });
    newDistrict.save().then((districtDoc) => {
        res.send(districtDoc);
    })
})

module.exports = router