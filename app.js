const express = require("express");
const app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});

app.listen(8000, (err) => {
    if (err) console.log(err);
    console.log("App is running on port 8000...");
});
