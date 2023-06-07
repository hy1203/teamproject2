document.querySelector(".login").addEventListener("click", login);
document.querySelector(".signup").addEventListener("click", signup);
function signup() {
  location.href = "/signup";
}
async function login() {
  /** @type {HTMLFormElement} */
  const form = document.forms.login;
  if (!form.checkValidity()) {
    return;
  }
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: form.username.value,
      password: form.password.value,
    }),
  });
  const { result } = await res.json();
  if (result) {
    location.href = "/";
  } else {
    // 비밀번호 잘못됨 띄우기
    const dialog = document.getElementById("wrong-input");
    dialog.show();
  }
}
