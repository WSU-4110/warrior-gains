function removePassStrength() {
    var passwordStrength = document.getElementById("password-strength");
    passwordStrength.classList.remove(
      "pb-danger",
      "pb-warning",
      "pb-primary",
      "pb-success"
    );
  }
module.exports = removePassStrength;