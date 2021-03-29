"use strict";

//Basic Setup
var express = require("express");

var app = express();

var bodyParser = require('body-parser'); //Routes


var blogs = require('./routes/blogs.js');

var pages = require('./routes/pages.js');

var DbContext = require("./services/db");

var dbc = new DbContext();
dbc.useCollection("blogs.json"); // serving static files

app.use(express["static"]('public')); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/json

app.use(bodyParser.json()); // setting template engine

app.set("view engine", "pug"); //urls

app.use('/blogs', blogs);
app.use('/', pages);
app.listen(8088, function (err) {
  if (err) console.log(err);
  console.log("App is running on port http://localhost:8000/...");
});