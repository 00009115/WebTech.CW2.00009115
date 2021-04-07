const fs = require("fs");
const path = require("path");

//importing all supporting functions of utils
const generateID = require("../utils").generateID;
const date = require("../utils").date;
const root = require("../utils").root;

class DbContext {
	constructor() {
		this.collection = null;
	}

	//defining a json file that should be used
	useCollection(collection = "") {
		this.collection = path.join(root, `database/${collection}`);
		console.log(this.collection);
	}

	//getting a single blog with inserted ID
	getOne(id, successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const records = JSON.parse(data);
			const record = records.filter((record) => record.id == id)[0];
			successCb(record);
		});
	}

	//getting all blogs
	getAll(successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const records = JSON.parse(data);
			successCb(records);
		});
	}

	//saving a new blog
	saveOne(newRecord, successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const records = JSON.parse(data);

			records.push({
				id: generateID(),
				title: newRecord.title,
				type: newRecord.type,
				author: newRecord.author,
				text: newRecord.text,
				date: date(),
				edited: false,
			});

			fs.writeFile(this.collection, JSON.stringify(records), (err) => {
				if (err) errorCb();
				successCb();
			});
		});
	}

	//deleting a blog by its ID number
	deleteOne(id, successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const records = JSON.parse(data);

			const filtered = records.filter((record) => record.id != id) || [];

			fs.writeFile(this.collection, JSON.stringify(filtered), (err) => {
				if (err) errorCb();
				successCb();
			});
		});
	}

	//updating a blog with given ID number
	updateOne(id, newRecord, successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const records = JSON.parse(data);

			records.find((record) => record.id == id).title = newRecord.title;
			records.find((record) => record.id == id).type = newRecord.type;
			records.find((record) => record.id == id).text = newRecord.text;
			records.find((record) => record.id == id).edited = true;
			records.find((record) => record.id == id).editedDate = date();

			fs.writeFile(this.collection, JSON.stringify(records), (err) => {
				if (err) errorCb();
				successCb();
			});
		});
	}

	//signing up - registering
	signUp(newRecord, successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const users = JSON.parse(data);

			if (users.some((user) => user.username == newRecord.username)) {
				errorCb();
			} else {
				users.push({
					id: "user_" + generateID(),
					username: newRecord.username,
					password: newRecord.password,
					isSigned: false,
				});

				fs.writeFile(this.collection, JSON.stringify(users), (err) => {
					successCb();
				});
			}
		});
	}

	//signing in - loggins in
	signIn(newRecord, successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const users = JSON.parse(data);

			if (users.length) {
				users.forEach((user) => {
					if (user.username === newRecord.username && user.password === newRecord.password) {
						user.isSigned = true;
					} else {
						user.isSigned = false;
					}
				});
			}

			fs.writeFile(this.collection, JSON.stringify(users), (err) => {
				if (err) errorCb();

				if (users.some((user) => user.isSigned === true)) {
					successCb(users.find((user) => user.isSigned === true));
				} else {
					successCb(false);
				}
			});
		});
	}

	//signing out - exitting
	signOut(successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const users = JSON.parse(data);

			users.forEach((user) => {
				user.isSigned = false;
			});

			fs.writeFile(this.collection, JSON.stringify(users), (err) => {
				if (err) errorCb();

				successCb();
			});
		});
	}

	//getting a user which has signed in
	checkUser(successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const users = JSON.parse(data);

			if (users.some((user) => user.isSigned === true)) {
				successCb(users.find((user) => user.isSigned === true));
			} else {
				successCb(false);
			}
		});
	}
}

module.exports = DbContext;
