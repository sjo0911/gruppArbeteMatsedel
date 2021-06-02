const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Menu } = require('../models');
const jwtCheck = require('../jwtMiddleware');
const { postMenu, patchMenu, deleteMenu, deleteMeal, postMeal, patchMeal } = require('../controllers/menu.controller');
const { postMunicipality, patchMunicipality, patchSchool, deleteMunicipality } = require('../controllers/municipality.controller');
const { postUser, patchUser, deleteUser, getUser } = require('../controllers/user.controller');

router.post('/menu', jwtCheck, postMenu)

router.patch('/menu/:id', jwtCheck, patchMenu)

router.delete('/menu/:id', jwtCheck, deleteMenu)

router.delete('/menu/:id/meal/:mealId', jwtCheck, deleteMeal)

router.post('/menu/:id/meal/', jwtCheck, postMeal)

router.patch('/menu/:id/meal/:mealId', jwtCheck, patchMeal)


router.post('/municipality', jwtCheck, postMunicipality)

router.patch('/municipality/:id', jwtCheck, patchMunicipality)

router.patch('/municipality/:id/school/:schoolId', jwtCheck, patchSchool)

router.delete('/municipality/:id', jwtCheck, deleteMunicipality)

router.post('/user', jwtCheck, postUser)

router.patch('/user/:id', jwtCheck, patchUser)

router.delete('/user/:id', jwtCheck, deleteUser)

router.get('/user', jwtCheck, getUser)

module.exports = router