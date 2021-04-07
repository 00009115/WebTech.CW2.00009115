const path = require("path");

//unique ID generator
module.exports.generateID = function () {
	return Math.random().toString(36).substr(2, 9);
};

//current time identifier
module.exports.date = function () {
	let now = new Date();
	let day = String(now.getDate()).padStart(2, "0");
	let month = String(now.getMonth() + 1).padStart(2, "0");
	let year = now.getFullYear();
	let hour = String(now.getHours()).padStart(2, "0");
	let minute = String(now.getMinutes()).padStart(2, "0");

	return day + "." + month + "." + year + " | " + hour + ":" + minute;
};

//root identifier
const root = path.dirname(require.main.filename || process.require.main.filename);

module.exports.root = root;

module.exports.getCollection = function (collection) {
	return path.join(root, `database/${collection}`);
};
