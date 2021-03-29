//Basic Setup
const express = require("express");
const app = express();
const bodyParser = require('body-parser')

//Routes
const blogs = require('./routes/blogs.js')
const pages = require('./routes/pages.js')

const DbContext = require("./services/db")
const dbc = new DbContext()
dbc.useCollection("blogs.json");

// serving static files
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setting template engine
app.set("view engine", "pug");

//urls
app.use('/blogs', blogs);
app.use('/', pages);

app.listen(8088, (err) => {
    if (err) console.log(err);
    console.log("App is running on port http://localhost:8000/...");
});