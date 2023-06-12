export async function login() {
  const form = document.forms.login_form;
  if (!form.checkValidity()) {
    return;
  }
  try {
    const response = await axios.post("/login", {
      username: form.username.value,
      password: form.password.value,
    });
    const { result } = response.data;
    console.log("res data : ", response.data);
    if (result) {
      location.href = "/";
    }
  } catch (error) {
    // 에러 처리
    console.error(error);
  }
}
