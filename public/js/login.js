document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("signupButton").addEventListener("click", signup);

async function login() {
  const form = document.forms.login_form;
  if (!form.checkValidity()) {
    return;
  }

  try {
    const response = await axios.post("/login", {
      username: form.username.value,
      password: form.password.value,
    });

    const { result, access, refresh } = response.data;
    console.log("res data : ", response.data);
    if (result) {
      sessionStorage.setItem("access", access);
      sessionStorage.setItem("refresh", refresh);
      location.href = "/";
    } else {
      const dialog = document.getElementById("wrong-input");
      dialog.show();
    }
  } catch (error) {
    // 에러 처리
    console.error(error);
  }
}

function signup() {
  location.href = "/signup";
}
