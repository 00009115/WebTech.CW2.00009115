class Validator {
  isValid(data) {
    if (data.title.trim() === "" || data.text.trim() === "" || data.author.trim() === "") {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Validator;