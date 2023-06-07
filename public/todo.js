const apiURL = `/api${window.location.pathname}`;
console.log(apiURL);
const todoForm = document.forms.todoForm;
const todoList = document.querySelector("ul#todoList");
const clearBtn = document.getElementById("clear");

todoForm.addEventListener("submit", addTodo);
clearBtn.addEventListener("click", clearTodoList);
initTodo();

async function initTodo() {
  const todos = await (await fetch(apiURL)).json();
  todos.forEach(({ id, checked, content }) => appendTodo(id, checked, content));
}

async function removeTodo(e) {
  const todo = e.target.closest("li");
  const id = Number(todo.id);
  try {
    const res = await deleteTodo(id);
    if (!res.ok) throw new Error(res.status);
    todoList.removeChild(todo);
    console.log("투두리스트가 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("투두리스트 삭제 중 오류가 발생했습니다.", error);
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(res.status);
    return res;
  } catch {
    console.error("투두리스트 삭제 중 오류가 발생했습니다.", error);
  }
}

async function clearTodoList(e) {
  const result = await fetch(apiURL, { method: "DELETE" });
  Array.from(todoList.children).forEach((child) => child.remove());
}

async function addTodo(e) {
  e.preventDefault();
  const todo = todoForm.todo.value;
  try {
    if (todo !== "") {
      const { id, checked } = await postTodo(todo); // 투두리스트를 서버에 저장하고 아이디 값을 받아온다.
      appendTodo(id, checked, todo);
    }
    todoForm.todo.value = "";
  } catch (error) {
    console.error("투두리스트 추가 중 오류가 발생했습니다.", error);
  }
}

function appendTodo(id, checked, value) {
  /**
   * <li id="${id}">
   *   <input type="checkbox" id="${id}check">
   *   <label for="${id}check">${value}</label>
   *   <button class="delete">x</button>
   * </li>
   */
  const li = document.createElement("li");
  li.id = id;
  li.innerHTML = `
  <input type="checkbox" id="${id}check" ${checked ? "checked" : ""}>
  <label for="${id}check">${value}</label>
  <button class="delete">x</button>
  `;
  li.querySelector('input[type="checkbox"]').addEventListener(
    "change",
    toggleTodo
  );
  li.querySelector(".delete").addEventListener("click", removeTodo);
  todoList.appendChild(li);
  document.querySelector("section").style.display = "block";
}

async function toggleTodo(e) {
  const todo = e.target.closest("li");
  const id = Number(todo.id);
  const checked = e.target.checked;
  try {
    const res = await fetch(`${apiURL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked }),
    });
    if (!res.ok) throw new Error(res.status);
    console.log("투두리스트가 성공적으로 수정되었습니다.");
  } catch (error) {
    console.error("투두리스트 수정 중 오류가 발생했습니다.", error);
  }
}

async function postTodo(content) {
  try {
    const res = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error(res.status);
    const { id, checked } = await res.json();
    console.log("투두리스트가 성공적으로 저장되었습니다.");
    return { id, checked };
  } catch (error) {
    console.error("투두리스트 저장 중 오류가 발생했습니다.", error);
  }
}
