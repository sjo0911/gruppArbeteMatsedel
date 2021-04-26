const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

