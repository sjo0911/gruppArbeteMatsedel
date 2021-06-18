const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');
const User = require('./db/routes/user.route');
const privateRoute = require('./db/routes/private.route');
const publicRoute = require('./db/routes/public.route');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(express.static('./dist/'));
app.use(function(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if(req.get('host') != "localhost:8080" && req.get('host') != "http://localhost:4200/"){
        if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
            return res.redirect('https://' + req.get('host') + req.url);
        }
        next();
    } else {
        next();
    }
})

app.use('/private', privateRoute)
app.use('/public', publicRoute)

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/' }
    );
});

app.listen(process.env.PORT || 8080);

//
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("USERMAIL");
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});



// app.use('/auth/municipality', Municipality)
// app.use('/auth/menu', Menu)
// app.use('/auth/user', User)
