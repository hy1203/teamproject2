import { login } from "./utils/login.js";

document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("signupButton").addEventListener("click", signup);

function signup() {
  location.href = "/signup";
}
