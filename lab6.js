function removeCheck(charRequired) {
    charRequired.classList.remove("fa-check");
    charRequired.classList.add("fa-circle");
  }
module.exports = removeCheck;