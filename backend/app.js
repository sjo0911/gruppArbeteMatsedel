const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');
const Municipality = require('./db/routes/municipality.route');
const Menu = require('./db/routes/menu.route');
const User = require('./db/routes/user.route');
const privateRoute = require('./db/routes/private.route');
const publicRoute = require('./db/routes/public.route');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});



app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})

// app.use('/auth/municipality', Municipality)
// app.use('/auth/menu', Menu)
// app.use('/auth/user', User)

app.use('/private', privateRoute)
app.use('/public', publicRoute)


