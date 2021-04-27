const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');
const District = require('./db/routes/district.route');
const Menu = require('./db/routes/menu.route');
const User = require('./db/routes/user.route');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})

app.use('/district', District)
app.use('/menu', Menu)
app.use('/user', User)