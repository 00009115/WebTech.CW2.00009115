const express = require("express");
const router = express.Router();

//importing services
const DbContext = require("../services/db");

//new instances of classes
const dbc = new DbContext();
const dbcUser = new DbContext();

//setting a database file that should be used
dbc.useCollection("blogs.json");
dbcUser.useCollection("users.json");

let signedUser = {};

router.get("/", (req, res) => {
	setUser();
	dbc.getAll(
		(records) =>
			setTimeout(() => {
				res.render("index", { blogs: records, user: signedUser });
			}, 500),
		() => res.render("index", { blogs: null, user: null })
	);
});

router.get("/profile", (req, res) => {
	setUser();
	setTimeout(() => {
		res.render("profile", { user: signedUser });
	}, 500);
});

router.get("/about", (req, res) => {
	setUser();
	setTimeout(() => {
		res.render("about", { user: signedUser });
	}, 500);
});

router.get("/contacts", (req, res) => {
	setUser();
	setTimeout(() => {
		res.render("contacts", { user: signedUser });
	}, 500);
});

//identifying a signed user
const setUser = () => {
	dbcUser.checkUser((user) => {
		signedUser = user;
	});
};

module.exports = router;