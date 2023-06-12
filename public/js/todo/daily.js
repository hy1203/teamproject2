const apiDateURL = `/api${window.location.pathname}`; // get, post, deleteAll
const apiIndivURL = (id) => `/api/todo/${id}`; // put, patch, delete
console.log(apiDateURL);
const todoForm = document.forms.todoForm;
const todoList = document.querySelector("ul#todoList");
const clearBtn = document.getElementById("clear");

todoForm.addEventListener("submit", addTodo);
clearBtn.addEventListener("click", clearTodoList);
initTodo();

async function initTodo() {
  // 서버에서 투두리스트를 가져와서 화면에 렌더링
  const todos = await (await fetch(apiDateURL)).json();
  todos.forEach(({ id, checked, content }) => appendTodo(id, checked, content));
}

async function removeTodo(e) {
  // 투두 ID 추출
  const todo = e.target.closest("li");
  const id = Number(todo.id);
  try {
    // 서버에서 투두 삭제
    const res = await deleteTodo(id);
    if (!res.ok) throw new Error(res.status);
    // 화면에서 투두 삭제
    todoList.removeChild(todo);
    console.log("투두리스트가 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("투두리스트 삭제 중 오류가 발생했습니다.", error);
  }
}

async function deleteTodo(id) {
  // 서버에서 투두 삭제
  try {
    const res = await fetch(apiIndivURL(id), { method: "DELETE" });
    if (!res.ok) throw new Error(res.status);
    return res;
  } catch {
    console.error("투두리스트 삭제 중 오류가 발생했습니다.", error);
  }
}

async function clearTodoList(e) {
  // 서버에서 투두리스트 전체 삭제
  try {
    const res = await fetch(apiDateURL, { method: "DELETE" });
    if (!res.ok) throw new Error(res.status);
    Array.from(todoList.children).forEach((child) => child.remove());
  } catch (error) {
    console.error("투두리스트 전체 삭제 중 오류가 발생했습니다.", error);
  }
}

async function addTodo(e) {
  e.preventDefault();
  const todo = todoForm.todo.value;
  try {
    if (todo !== "") {
      // 투두리스트를 서버에 저장 후 아이디 값 수신
      const { id, checked } = await postTodo(todo);
      // 화면에 투두리스트 추가
      appendTodo(id, checked, todo);
    }
    todoForm.reset();
  } catch (error) {
    console.error("투두리스트 추가 중 오류가 발생했습니다.", error);
  }
}

// 투두리스트 수정
async function editTodo(e) {
  const all = e.target.closest("li");
  const id = Number(all.id);
  const label = all.querySelector("label");
  const previousValue = label.textContent;
  const newValue = prompt("수정할 내용을 입력하세요", previousValue);

  try {
    if (newValue !== null) {
      // 서버에서 투두 수정
      const res = await updateTodo(id, newValue);
      if (!res.ok) throw new Error(res.status);
      // 화면에서 투두 수정
      label.textContent = newValue;
      console.log("수정이 완료되었습니다.");
    }
  } catch (error) {
    console.error("수정 실패:", error);
  }
}

// 서버에 투두리스트 업데이트
async function updateTodo(id, newValue) {
  try {
    const res = await fetch(apiIndivURL(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newValue }),
    });

    if (!res.ok) {
      throw new Error(res.status);
    }

    return res;
  } catch (error) {
    console.error("서버 데이터 업데이트 실패:", error);
  }
}

// HTML 코드에서 코멘트를 추가하는 함수
async function sendComment() {
  const apiUrl = getApiUrl();
  const commentInput = document.querySelector("#diary_write");
  const commentText = commentInput.value.trim();

  if (commentText === "") {
    alert("코멘트를 입력해주세요.");
    return;
  }

  try {
    const res = await axios({
      method: "POST",
      url: apiUrl,
      data: {
        content: commentText,
      },
    });
    console.log(res);
    // 페이지를 새로고침하거나 필요한 처리 로직을 작성하세요.
  } catch (error) {
    console.error("코멘트 추가 실패:", error);
    // 에러 처리 로직을 작성하세요.
  }
}

// API URL 생성 함수
function getApiUrl() {
  const paths = window.location.pathname.split("/");
  paths.pop();
  paths.unshift("api");
  const apiUrl = paths.join("/");
  return apiUrl;
}

// 투두리스트 li에 대한 속성
function appendTodo(id, checked, value) {
  /**
   * <li id="${id}">
   *   <input type="checkbox" id="${id}check">
   *   <label for="${id}check">${value}</label>
   *   <button class="delete">x</button>
   * </li>
   */
  // const li = document.createElement("li");
  // li.id = id;
  // li.innerHTML = `
  // <input type="checkbox" id="${id}check" ${checked ? "checked" : ""}>
  // <label for="${id}check">${value}</label>
  // <button class="edit">수정</button>
  // <button class="delete">x</button>
  // `;
  // li.querySelector('input[type="checkbox"]').addEventListener(
  //   "change",
  //   toggleTodo
  // );
  // li.querySelector(".edit").addEventListener("click", editTodo);

  // li.querySelector(".delete").addEventListener("click", removeTodo);
  // todoList.appendChild(li);
  // document.querySelector("section").style.display = "block";

  const li = document.createElement("li");
  li.id = `li${id}`;
  li.innerHTML = `
  <input type="checkbox" id="${id}check" ${checked ? "checked" : ""}>
  <label for="${id}check">${value}</label>
  <button class="edit">수정</button>
  <button class="delete">x</button>
  <button type="button" class="comment">comment<img src="/public/images/comment.png" width="25px" height="25px"/></button>
  <textarea type="text" class="toggle" rows="1" placeholder="comment 작성" oninput="calcTextareaHeight(this)"></textarea>
  `;
  li.style.fontFamily = "ImcreSoojin";
  li.querySelector('input[type="checkbox"]').addEventListener(
    "change",
    toggleTodo
  );
  li.querySelector(".delete").addEventListener("click", removeTodo);
  li.querySelector(".comment").addEventListener("click", commentToggle);
  todoList.appendChild(li);
  document.querySelector("section").style.display = "block";
}

async function calcTextareaHeight(e) {
  e.style.height = "auto";
  e.style.height = `${e.scrollHeight}px`;
}

async function commentToggle(e) {
  const todo = e.target.closest("li");
  //console.log(todo);
  //const id = Number(todo.id);

  const cmt = document.querySelector(`#${todo.id} > textarea`);
  if (cmt.style.display !== "none") {
    cmt.style.display = "none";
  } else {
    cmt.style.display = "block";
  }
}

async function toggleTodo(e) {
  const todo = e.target.closest("li");
  const id = Number(todo.id);
  const checked = e.target.checked;
  try {
    const res = await fetch(apiIndivURL(id), {
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
    const res = await fetch(apiDateURL, {
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
