const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const todoAnchor = document.createElement("a");
todoAnchor.href = `/todo/${year}/${month}/${date}`;
todoAnchor.textContent = "오늘의 할 일";
document.body.append(todoAnchor);
const diaryAnchor = document.createElement("a");
diaryAnchor.href = `/diary/${year}/${month}/${date}`;
diaryAnchor.textContent = "오늘의 일기";
document.body.append(diaryAnchor);
function signup() {
  location.href = "/signup";
}
function login() {
  location.href = "/login";
}
