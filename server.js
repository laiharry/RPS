var express = require('express'),
    fs = require('fs'),
    app = express(),
    eps = require('ejs');
//    morgan = require('morgan');

// const http = require('http').Server(app);


var app = express();

var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var PORT = process.env.PORT || 3000;

// app is running!
app.get('/', function(req, res) {
//    res.render('index.ejs');
    res.send('Hello from NodeJS  at '+ new Date());
});

app.listen(8080, ip);

module.exports = app;