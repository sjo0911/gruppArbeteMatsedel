const { User } = require('../models');
const patchValidation = { runValidators: true };
const bcrypt = require('bcrypt');

exports.postUser = function(req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let school = req.body.school;
    let permission = req.body.permission;
    let menu = req.body.menu;

    let user = new User({
        firstName,
        lastName,
        email,
        password,
        school,
        permission,
        menu

    });

    user.save().then((userDoc) => {
        res.send(userDoc)
    });

}

exports.patchUser = function(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, patchValidation).then(() => {
        res.send({ message: 'Completed successfully' });
    }).catch((e) => {
        res.send(e);
    });
}
exports.deleteUser = function(req, res) {
    User.findOneAndRemove({
        _id: req.params.id
    }).then((removedUserDoc) => {
        res.send(removedUserDoc);
    }).catch((e) => {
        res.send(e);
    });
}
exports.getUser = function(req, res) {
    User.find().then((users) => {
        res.send(users);
    }).catch((e) => {
        res.send(e);
    })
}