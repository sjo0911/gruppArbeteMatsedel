const jwtCheck = require('../jwtMiddleware');

router.get('/menu', getMenus)

router.get('/menu/Name', getMenusNames)


router.get('/menu/:id', getMenuWithId)

router.get('/menu/Name/:id', (req, res) => {
    Menu.findOne({ _id: req.params.id }).select({'menuName':1}).then((menus) => {
        res.send(menus);
    })
})