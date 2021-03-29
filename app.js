const express = require("express");
const app = express();

const fs = require('fs');

app.set("view engine", "pug");

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err

        const blogs = JSON.parse(data);

        res.render("index", { blogs: blogs });
    });
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});

app.get("/blogs", (req, res) => {
    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err

        const blogs = JSON.parse(data);

        res.render("pages/blogs", { blogs: blogs });
    });
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
        type: req.body.type,
        author: req.body.author,
        text: req.body.text,
        date: date(),
        edited: false
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

app.get("/blogs/blog:id", (req, res) => {
    const id = req.params.id;

    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err

        const blogs = JSON.parse(data);
        const blog = blogs.filter(blog => blog.id == id)[0];
        
        res.render('pages/blog', {blog: blog});
    });
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
    let hour = now.getHours();
    let minute = now.getMinutes();

    return day + '.' + month + '.' + year + ' | ' + hour + ':' + minute;
};
