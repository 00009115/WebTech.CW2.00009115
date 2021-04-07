//Basic Setup
const express = require("express");
const router = express.Router();

const Validator = require("../services/validators");
const DbContext = require("../services/db");

const dbc = new DbContext();
const dbcUser = new DbContext();
const v = new Validator();

dbc.useCollection("blogs.json");
dbcUser.useCollection("users.json");

let signedUser = {};

router.get("/", (req, res) => {
	setUser();
	dbc.getAll(
		(records) => res.render("blogs", { blogs: records, user: signedUser }),
		() => res.render("blogs", { blogs: null })
	);
});

router.get("/add", (req, res) => {
	setUser();
	res.render("add", { user: signedUser });
});

router.post("/add", (req, res) => {
	setUser();
	if (v.isValid(req.body)) {
		dbc.saveOne(req.body, () => res.render("add", { success: true, user: signedUser }));
	} else {
		res.render("add", { error: true, success: false });
	}
});

router.get("/:id", (req, res) => {
	setUser();
	dbc.getOne(
		req.params.id,
		(record) => res.render("blog", { blog: record, user: signedUser }),
		() => res.sendStatus(404)
	);
});

router.get("/:id/delete", (req, res) => {
	dbc.deleteOne(req.params.id, () => res.redirect("/blogs")), () => res.sendStatus(500);
});

router.get("/:id/update", (req, res) => {
	setUser();
	dbc.getOne(
		req.params.id,
		(record) => res.render("update", { blog: record, user: signedUser }),
		() => res.sendStatus(404)
	);
});

router.post("/:id/update", (req, res) => {
	dbc.updateOne(req.params.id, req.body, () => res.redirect(`/blogs/${req.params.id}`)), () => res.sendStatus(500);
});

const setUser = () => {
	dbcUser.checkUser((user) => {
		signedUser = user;
	});
};

module.exports = router;
