const { User } = require('../models');
const patchValidation = { runValidators: true };

exports.postUser = function(req, res) {
    let user = new User(req.body);
    user.save().then((userDoc) => {
        res.send(userDoc)
    }).catch((e) => {
        res.send(e);
    });
};

exports.patchUser = function(req, res) {
    console.log(req.body);
    console.log(req);
    User.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, patchValidation).then(() => {
        console.log("hejsan!");
        res.send({'message': 'de gick bra'})
    }).catch((e) => {
        res.send(e);
    });
};

exports.deleteUser = function(req, res) {
    User.findOneAndRemove({
        _id: req.params.id
    }).then((removedUserDoc) => {
        res.send(removedUserDoc);
    }).catch((e) => {
        res.send(e);
    });
};

exports.getUser = function(req, res) {
    User.find().then((users) => {
        res.send(users);
    }).catch((e) => {
        res.send(e);
    })
};