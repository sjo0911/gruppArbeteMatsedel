const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Menu } = require('../models');
const jwtCheck = require('../jwtMiddleware');
const { postMenu, patchMeal } = require('../controllers/menu.controller');

router.post('/menu', jwtCheck, postMenu)

router.patch('/menu/:id',jwtCheck, patchMenu)

router.delete('/menu/:id',jwtCheck, deleteMenu)

router.delete('/menu/:id/meal/:mealId',jwtCheck, deleteMeal)

router.post('/menu/:id/meal/', jwtCheck,postMeal)

router.patch('/menu/:id/meal/:mealId',jwtCheck , patchMeal)



module.exports = router