const fs = require("fs");
const path = require("path");

const generateID = require("../utils").generateID;
const date = require("../utils").date;
const root = require("../utils").root;

class DbContext {
	constructor() {
		this.collection = null;
	}

	useCollection(collection = "") {
		this.collection = path.join(root, `database/${collection}`);
		console.log(this.collection);
	}

	getOne(id, successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const records = JSON.parse(data);
			const record = records.filter((record) => record.id == id)[0];
			successCb(record);
		});
	}

	getAll(successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const records = JSON.parse(data);
			successCb(records);
		});
	}

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

	addUser(newRecord, successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const users = JSON.parse(data);

			users.push({
				id: "user_" + generateID(),
				username: newRecord.username,
				password: newRecord.password,
				isSigned: false,
			});

			fs.writeFile(this.collection, JSON.stringify(users), (err) => {
				if (err) errorCb();
				successCb();
			});
		});
	}

	signUp(newRecord, successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const users = JSON.parse(data);

			users.forEach((user) => {
				if (user.username === newRecord.username && user.password === newRecord.password) {
					user.isSigned = true;
				} else {
					user.isSigned = false;
				}
			});

			fs.writeFile(this.collection, JSON.stringify(users), (err) => {
				if (err) errorCb();

				if (users.some((user) => user.isSigned === true)) {
					successCb(users.find((user) => user.isSigned === true).isSigned);
				} else {
					successCb(false);
				}
			});
		});
	}

	checkUser(successCb, errorCb) {
		fs.readFile(this.collection, "utf8", (err, data) => {
			if (err) errorCb();

			const users = JSON.parse(data);

			if (users.some((user) => user.isSigned === true)) {
				successCb(users.find((user) => user.isSigned === true));
			}
		});
	}
}

module.exports = DbContext;
