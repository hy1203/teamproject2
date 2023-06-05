import { signup, login, genIdPw, genPort, today } from "@/utils/testutil";
import db from "@/models";
import { User, Todo } from "@/types/models";
import setPort from "@/testapp";
import request from "supertest";

const app = setPort(genPort());

test("create todo", async () => {
  const [id, pw] = genIdPw();
  await signup(id, pw, app);
  const loginRes = await login(id, pw, app);
  const cookie = loginRes.header["set-cookie"];
  const content = genIdPw().toString();
  const [year, month, date] = today();
  const res = await request(app)
    .post(`/todo/${year}/${month}/${date}`)
    .set("Cookie", cookie)
    .send({
      content,
      year,
      month,
      date,
    });
  const result = res.body as Todo;
  expect(result?.content).toBe(content);
  const userResult = await db.user.findOne({
    where: {
      username: id,
    },
  });
  const user = userResult?.toJSON<User>();
  const todoResult = await db.todo.findOne({
    where: {
      user_id: user?.id,
    },
  });
  const todo = todoResult?.toJSON<Todo>();
  expect(todo?.id).toBe(result?.id);
});

test("get todo", async () => {
  const todoResult = await db.todo.findOne({
    order: [["id", "DESC"]],
  });
  const dbTodo = todoResult?.toJSON<Todo>();
  if (!dbTodo) return;
  const { year, month, date, user_id } = dbTodo;
  const userResult = await db.user.findOne({
    where: {
      id: user_id,
    },
  });
  if (!userResult) return;
  const { username, password } = userResult?.toJSON<User>();
  const loginRes = await login(username, password, app);
  const cookie = loginRes.header["set-cookie"];
  const res = await request(app)
    .get(`/todo/${year}/${month}/${date}`)
    .set("Cookie", cookie);
  const todos = res.body as Todo[];
  expect(todos.length).toBeGreaterThan(0);
  const resTodo = todos.find((todo) => todo.id === dbTodo.id);
  expect(resTodo?.id).toBe(dbTodo?.id);
  expect(resTodo?.content).toBe(dbTodo?.content);
});
