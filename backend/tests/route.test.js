const publicRoute = require('../db/routes/public.route');
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use("/public", publicRoute);
app.use(express.json());
beforeAll(async() => { const { mongoose } = require('../db/mongoose'); });

describe('PublicRoute', () => {

    /*it('can get menu route', async() => {
        request(app).get('/public/menu').then((menu) => {
            expect("content-Type", /json/).expect({menuName: ""});
        });
    })*/

});