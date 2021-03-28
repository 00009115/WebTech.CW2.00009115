const express = require("express");
const app = express();

const blogs = [
    {
        id: 0,
        type: "pet",
        title: "Hello!",
        date: "12:28",
        text: "salfmasvlk lpsdmdflk mapsoflp maspeefpo psepofk opkas[eekf [ppk[pasek [pkp[sef kp["
    },
    {
        id: 1,
        type: "science",
        title: "Hello!",
        date: "12:28",
        text: "salfmasvlk lpsdmdflk mapsoflp maspeefpo psepofk opkas[eekf [ppk[pasek [pkp[sef kp["
    },
    {
        id: 2,

        type: "christmas",
        title: "Yehhooo!",
        date: "05:09",
        text: "salfmasvlk lpsdmdflk mapsoflp maspeefpo psepofk opkas[eekf [ppk[pasek [pkp[sef kp["
    },
    {
        id: 3,

        type: "sport",
        title: "Hello!",
        date: "12:28",
        text: "salfmasvlk lpsdmdflk mapsoflp maspeefpo psepofk opkas[eekf [ppk[pasek [pkp[sef kp["
    },
    {
        id: 4,
        type: "quizz",
        title: "Yehhooo!",
        date: "05:09",
        text: "salfmasvlk lpsdmdflk mapsoflp maspeefpo psepofk opkas[eekf [ppk[pasek [pkp[sef kp["
    },
    {
        id: 5,
        type: "homework",
        title: "Hello!",
        date: "12:28",
        text: "salfmasvlk lpsdmdflk mapsoflp maspeefpo psepofk opkas[eekf [ppk[pasek [pkp[sef kp["
    },
    {
        id: 6,
        type: "family",
        title: "Yehhooo!",
        date: "05:09",
        text: "salfmasvlk lpsdmdflk mapsoflp maspeefpo psepofk opkas[eekf [ppk[pasek [pkp[sef kp["
    },
    {
        id: 7,
        type: "cooking",
        title: "Hello!",
        date: "12:28",
        text: "salfmasvlk lpsdmdflk mapsoflp maspeefpo psepofk opkas[eekf [ppk[pasek [pkp[sef kp["
    },
    {
        id: 8,
        type: "brainstorming",
        title: "Yehhooo!",
        date: "05:09",
        text: "salfmasvlk lpsdmdflk mapsoflp maspeefpo psepofk opkas[eekf [ppk[pasek [pkp[sef kp["
    }
];

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { blogs: blogs });
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});

app.get("/blogs", (req, res) => {
    res.render("pages/blogs", { blogs: blogs });
});

app.get("/blogs/blog", (req, res) => {
    res.render("pages/blog");
});

app.get("/contacts", (req, res) => {
    res.render("pages/contacts");
});

app.get("/add-blog", (req, res) => {
    res.render("pages/add-blog");
});

app.listen(8000, (err) => {
    if (err) console.log(err);
    console.log("App is running on port 8000...");
});
