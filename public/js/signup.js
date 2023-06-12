function register() {
  const form = document.forms["form_register"];

  console.log(form.checkValidity());
  if (!form.checkValidity()) {
    return;
  }
  axios({
    method: "POST",
    url: "/signup",
    data: {
      username: form.username.value,
      password: form.password.value,
      //name: form.username.value,
      //birthday: form.birthday.value,
    },
  }).then((res) => {
    console.log(res);
    if (res.data.result === true) {
      alert("회원가입 완료");
      document.location.href = "/login";
    }
  });
}
