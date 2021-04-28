const express = require('express');
const router = express.Router();

const { Municipality } = require('../models');

router.get('/', (req, res) => {
    // Return array of all districts in database
    Municipality.find().then((municipalities) => {
        res.send(municipalities);
    }).catch((e) => {
        res.send(e);
    });
})

router.post('/', (req, res) => {
    // Create district and return new district to user
    let municipalityName = req.body.municipalityName;
    let schools = req.body.schools;
    let newMunicipality = new Municipality({
        municipalityName,
        schools
    });
    newMunicipality.save().then((municipalityDoc) => {
        res.send(municipalityDoc);
    })
})

router.patch('/:id', (req, res) => {
    Municipality.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
})

router.delete('/:id', (req, res) => {
    Municipality.findOneAndRemove({
        _id: req.params.id
    }).then((removedMunicipalityDoc) => {
        res.send(removedMunicipalityDoc);
    })
})

module.exports = router