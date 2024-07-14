const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();


app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
const empRoutes = require('./routes/employe');

app.use('/employee' ,empRoutes );




app.get('/' ,(req,res) => {
    res.send("Server is running you can add routes to start")
    } );


module.exports = app;