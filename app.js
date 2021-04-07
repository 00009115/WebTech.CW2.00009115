//Basic Setup
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

//Routes
const blogs = require('./routes/blogs.js');
const sign = require('./routes/sign.js');
const pages = require('./routes/pages.js');

//Database
const DbContext = require("./services/db");
const dbc = new DbContext();

//Ports
const PORT = 8080;

//setting a database file that should be used
dbc.useCollection("blogs.json");

// serving static files
app.use(express.static('public'));

// other set-ups
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting template engine
app.set("view engine", "pug");

//route urls
app.use('/blogs', blogs);
app.use('/sign', sign);
app.use('/', pages);

//api
app.get("/api/v1/blogs", (req, res) => {
    dbc.getAll(records => res.json(records));
});

//listening to certain port
app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`App is running on port http://localhost:${ PORT }/...`);
});