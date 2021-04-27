
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

router.post('/', (req, res) => {
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let meals = req.body.meals;
    let newMenu = new Menu({
        startDate,
        endDate,
        meals
    });
    newMenu.save().then((menuDoc) => {
        res.send(menuDoc);
    })
})

router.patch('/:id', (req, res) => {
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

module.exports = router