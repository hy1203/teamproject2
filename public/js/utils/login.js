export async function login() {
  const form = document.forms.login_form;
  if (!form.checkValidity()) {
    return;
  }
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username.value,
        password: form.password.value,
      }),
    });
    const { result } = await response.json();
    if (result) {
      location.href = "/";
    }
  } catch (error) {
    // 에러 처리
    console.error(error);
  }
}
