const express = require("express");
const app = express();

const fs = require('fs');

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
app.use(express.urlencoded({ extended: false }));

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

app.post("/add-blog", (req, res) => {
    const blog = {
        id: id(),
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        date: date()
    }

    if(blog.title.trim() === '' 
    && blog.author.trim() === '' 
    && blog.text.trim() === '') {
           res.render('pages/add-blog', { error: true });
    } else {
        fs.readFile('./data/blogs.json', (err, data) => {
            if(err) throw err

            const blogs = JSON.parse(data);

            blogs.push(blog);

            fs.writeFile('./data/blogs.json', JSON.stringify(blogs), err => {
                if(err) throw err

                res.render('pages/add-blog', { success: true });
            });
        });
    }
});

app.get("/add-blog", (req, res) => {
    res.render("pages/add-blog");
});

app.listen(8000, (err) => {
    if (err) console.log(err);
    console.log("App is running on port 8000...");
});

const id = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const date = () => {
    let now = new Date();
    let day = String(now.getDate()).padStart(2, '0');
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let year = now.getFullYear();

    now = day + '.' + month + '.' + year;
}
