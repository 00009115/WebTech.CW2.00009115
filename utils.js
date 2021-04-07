const path = require("path");

module.exports.generateID = function() {
  return (
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

module.exports.date = function() {
  let now = new Date();
  let day = String(now.getDate()).padStart(2, '0');
  let month = String(now.getMonth() + 1).padStart(2, '0');
  let year = now.getFullYear();
  let hour = now.getHours();
  let minute = now.getMinutes();

  return day + '.' + month + '.' + year + ' | ' + hour + ':' + minute;
};

const root = path.dirname(
  require.main.filename || process.require.main.filename
);

module.exports.root = root

module.exports.getCollection = function (collection) {
  return path.join(root, `database/${collection}`);
}