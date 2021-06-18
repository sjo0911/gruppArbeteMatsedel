const { User } = require('../models');
const patchValidation = { runValidators: true };

exports.postUser = function(req, res) {
    if(checkPermissions(req)){
        let user = new User(req.body);
        user.save().then((userDoc) => {
            res.send(userDoc)
        }).catch((e) => {
            res.send(e);
        });
    } else {
        res.send({"message": "Bara admin kan skapa användare"})
    }
};

exports.patchUser = function(req, res) {
    if(checkPermissions(req)){
        console.log("hej hej");
        User.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body
        }, patchValidation).then(() => {
            res.send({'message': 'de gick bra'})
        }).catch((e) => {
            res.send(e);
        });
    } else {
        res.send({"message": "Bara admin kan updatera användare"})
    }
};

exports.deleteUser = function(req, res) {
    if(checkPermissions(req)){
        User.findOneAndRemove({
            _id: req.params.id
        }).then((removedUserDoc) => {
            res.send(removedUserDoc);
        }).catch((e) => {
            res.send(e);
        });
    } else {
        res.send({"message": "Bara admin kan updatera användare"})
    }
};

exports.getUser = function(req, res) {
    User.find().then((users) => {
        res.send(users);
    }).catch((e) => {
        res.send(e);
    })
};

function checkPermissions(req) {
    if(req.headers.usermail) {
        return User.findOne({"email": req.headers.usermail}, function (err, myUser){
            if(err){
                return false;
            } else if (myUser.permissions.some((perm) => perm === 'admin')){
                return true;
            }
        })
    } else {
        return false;
    }
}