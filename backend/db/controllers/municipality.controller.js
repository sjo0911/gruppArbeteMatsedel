const { Municipality } = require('../models');

exports.getMunicipalities = function (req, res) {
    // Return array of all districts in database
    Municipality.find().then((municipalities) => {
        res.send(municipalities);
    }).catch((e) => {
        res.send(e);
    });
}

exports.postMunicipality = function (req, res) {
    // Create district and return new district to user
    let municipalityName = req.body.municipalityName;
    let schools = req.body.schools;
    let newMunicipality = new Municipality({
        municipalityName,
        schools
    });
    newMunicipality.save().then((municipalityDoc) => {
        res.send(municipalityDoc);
    }).catch((e) => {
        res.send(e);
    });
}

exports.patchMunicipality = function (req, res) {
    Municipality.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).catch((e) => {
        res.send(e);
    }).then(() => {
        res.sendStatus(200);
    });
}

exports.patchSchool = function (req, res) {
    Municipality.findOneAndUpdate({
        _id: req.params.id,
        "schools._id": req.params.schoolId
    }, {
        $set: {
            'schools.$': req.body
        }
    }).catch((err) => {
        res.send(err);
    }).then(() => {
        res.send({message: 'Completed successfully'});
    });
}

exports.deleteMunicipality = function (req, res) {
    Municipality.findOneAndRemove({
        _id: req.params.id
    }).catch((e) => {
        res.send(e);
    }).then((removedMunicipalityDoc) => {
        res.send(removedMunicipalityDoc);
    });
}