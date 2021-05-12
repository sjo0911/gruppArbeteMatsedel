const { Menu } = require('../models');


exports.postMenu = function (req, res) {
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let dateStart = new Date(startDate);
    let dateEnd = new Date(endDate);
    let meals = req.body.meals;
    let menuName = req.body.menuName;

    let checkDate = true;

    if(meals) {
        meals.forEach(meal => {
            let dateMeal = new Date(meal.mealDate);
            if (dateMeal < dateStart || dateMeal > dateEnd) {
                checkDate = false;
            }
        });
    }

    if (checkDate) {
        let newMenu = new Menu({
            startDate,
            endDate,
            meals,
            menuName
        });
        newMenu.save().then((menuDoc) => {
            res.send(menuDoc);
        })
    } else {
        res.send({message: 'EXCEPTION! Date is incorrect, please check date...'})
    }
};

exports.deleteMenu = function(req, res) {
    console.log(req);
    Menu.findOneAndRemove({
        _id: req.params.id
    }).then((removedMenuDoc) => {
        res.send(removedMenuDoc);
    })
}

exports.patchMenu = function (req, res)  {

    // Lägg till datum-validering här också
    Menu.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({message: 'Completed successfully'});
    });
}

exports.deleteMeal = function(req, res) {
    Menu.findOneAndUpdate({
        _id: req.params.id
    }, {
        $pull: {
            'meals': {
                _id: req.params.mealId
            }
        }
    }).then(() => {
        res.send({message: 'Completed successfully'});
    })

}

exports.postMeal = function(req, res) {
    Menu.findOneAndUpdate({
        _id: req.params.id,
    }, {
        $push: {
            'meals': req.body
        }
    }).then(() => {
        res.send({message: 'Completed successfully'});
    })
}

exports.patchMeal = function(req, res) {
    Menu.findOneAndUpdate({
        _id: req.params.id,
        "meals._id": req.params.mealId
    }, {
        $set: {
            'meals.$': req.body
        }
    }).catch((err) => {
        res.send(err);
    }).then(() => {
        res.send({message: 'Completed successfully'});
    })
}

exports.getMenus = function(req, res) {
    Menu.find().then((menus) => {
        res.send(menus);
    }).catch((e) => {
        res.send(e);
    });
}

exports.getMenusNames = function (req, res)  {
    Menu.find().select({'menuName':1}).then((menus) => {
        res.send(menus);
    })
}

exports.getMenuWithId = function(req, res)  {
    Menu.findOne({ _id: req.params.id }).then((menu) => {
        res.send(menu);
    })
}