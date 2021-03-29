//Basic Setup
const express = require("express");
const router = express.Router();

const fs = require('fs');
const path = require('path');

const Validator = require("../services/validators")
const DbContext = require("../services/db")
const root = require("../utils").root;
const getCollection = require("../utils").getCollection;

const dbc = new DbContext()
const v = new Validator()

dbc.useCollection('blogs.json');

router.get("/", (req, res) => {
    dbc.getAll(
        records => res.render("blogs", {blogs: records}),
        () => res.render("blogs", {blogs: null})
    )
});

router.get("/add", (req, res) => {
    res.render("add", {})
});

router.post("/add", (req, res) => {
    if (v.isValid(req.body)) {
        dbc.saveOne(req.body, () => res.render("add", { success: true }))
    } else {
        res.render("add", { error: true, success: false })
    }
});

router.get("/:id", (req, res) => {
    dbc.getOne(
        req.params.id,
        record => res.render("blog", { blog: record }),
        () => res.sendStatus(404)
    );
});

router.get("/:id/delete", (req, res) => {
    dbc.deleteOne(req.params.id, () => res.redirect("/blogs")), () => res.sendStatus(500);
});

router.get("/:id/update", (req, res) => {
    dbc.getOne(
        req.params.id,
        (record) => res.render("update", { blog: record }),
        () => res.sendStatus(404)
    );
});

router.post("/:id/update", (req, res) => {
    dbc.updateOne(req.params.id, req.body, () => res.redirect(`/blogs/${req.params.id}`)), () => res.sendStatus(500);
});

module.exports = router;
