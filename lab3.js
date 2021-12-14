function toggle() {
    var state = document.getElementById("state");
    var password = document.getElementById("password");
    if (state) {
      password.setAttribute("type", "password");
      state = false;
    } else {
      password.setAttribute("type", "text");
      state = true;
    }
  }
module.exports = toggle;