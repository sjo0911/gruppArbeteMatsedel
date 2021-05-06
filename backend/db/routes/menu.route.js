
const express = require('express');
const router = express.Router();

const{ Menu } = require('../models');

router.get('/', (req, res) => {
    Menu.find().then((menus) => {
        res.send(menus);
    }).catch((e) => {
        res.send(e);
    });
})

router.get('/:id', (req, res) => {
    Menu.findOne({ _id: req.params.id }).then((menu) => {
        res.send(menu);
    })
})

router.post('/', (req, res) => {
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let dateStart = new Date(startDate);
    let dateEnd = new Date(endDate);
    let meals = req.body.meals;

    let checkDate = true;

    meals.forEach(meal => {
        let dateMeal = new Date(meal.mealDate);
        if(dateMeal<dateStart || dateMeal>dateEnd) {
            checkDate = false;
        }
    });

    if(checkDate) {
        let newMenu = new Menu({
            startDate,
            endDate,
            meals
        });
        newMenu.save().then((menuDoc) => {
            res.send(menuDoc);
        })
    } else {
        res.send("EXCEPTION! Date is incorrect, please check date...")
    }
})

router.patch('/:id', (req, res) => {

    // Lägg till datum-validering här också
    Menu.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
})

router.delete('/:id', (req, res) => {
    Menu.findOneAndRemove({
        _id: req.params.id
    }).then((removedMenuDoc) => {
        res.send(removedMenuDoc);
    })
})

router.delete('/:id/meal/:mealId', (req, res) => {
    Menu.findOneAndUpdate({
        _id: req.params.id
    }, {
        $pull: {'meals': {
            _id: req.params.mealId
        }}
    }).then(() => {
        res.sendStatus(200);
    })
    
})

router.post('/:id/meal/', (req, res) => {
    Menu.findOneAndUpdate({
        _id:req.params.id,
    }, {
        $push: {'meals': req.body


    }
    }).then((removedMealDoc) => {
        res.send(removedMealDoc)
    })
})

router.patch('/:id/meal/:mealId', (req, res) => {
    Menu.findOneAndUpdate({
        _id:req.params.id,
        "meals._id":req.params.mealId
        
    }, {
        $set: {'meals':     req.body   
        } 

    }).catch((err) => {
        res.send(err);
    }).then(() => {
        res.sendStatus(200)
    })
})

module.exports = router