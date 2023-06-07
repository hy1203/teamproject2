import request from "supertest";
import { today, getFromDB, getAllFromDB, createFromDB } from "@/utils";
import { signup, getLoginSession, genIdPw, genPort } from "@/utils/testutil";
import db from "@/models";
import { User, Todo } from "@/types/models";
import setPort from "@/testapp";
import { get } from "http";

const app = setPort(genPort());

test("create todo", async () => {
  const [id, pw] = genIdPw();
  await signup(id, pw, app);
  const cookie = await getLoginSession(id, pw, app);
  const content = genIdPw().toString();
  const [year, month, date] = today();
  const res = await request(app)
    .post(`/todo/${year}/${month}/${date}`)
    .set("Cookie", cookie)
    .send({ content, year, month, date });
  const resTodo = res.body as Todo;
  expect(resTodo?.content).toBe(content);
  const user = await getFromDB(db.user, {
    where: { username: id },
  });
  const dbTodo = await getFromDB(db.todo, {
    where: { user_id: user?.id },
  });
  expect(dbTodo?.id).toBe(resTodo?.id);
});

test("get todo", async () => {
  const dbTodo = await getFromDB(db.todo, {});
  if (!dbTodo) return;
  const { year, month, date, user_id } = dbTodo;
  const user = await getFromDB(db.user, {
    where: { id: user_id },
  });
  if (!user) return;
  const { username, password } = user;
  const cookie = await getLoginSession(username, password, app);
  const res = await request(app)
    .get(`/todo/${year}/${month}/${date}`)
    .set("Cookie", cookie);
  const todos = res.body as Todo[];
  expect(todos.length).toBeGreaterThan(0);
  const resTodo = todos.find((todo) => todo.id === dbTodo.id);
  expect(resTodo?.id).toBe(dbTodo?.id);
  expect(resTodo?.content).toBe(dbTodo?.content);
});

test("update todo", async () => {
  const dbTodo = await getFromDB(db.todo, {});
  if (!dbTodo) return;
  const { year, month, date, user_id } = dbTodo;
  const user = await getFromDB(db.user, {
    where: { id: user_id },
  });
  if (!user) return;
  const { username, password } = user;
  const cookie = await getLoginSession(username, password, app);
  const content = genIdPw().toString();
  const res = await request(app)
    .put(`/todo/${year}/${month}/${date}`)
    .set("Cookie", cookie)
    .send({ content });
  expect(res.status).toBe(200);
  const newTodo = await getFromDB(db.todo, {
    where: { id: dbTodo.id },
  });
  expect(newTodo?.content).toBe(content);
  expect(newTodo?.id).toBe(dbTodo?.id);
});

test("delete todo", async () => {
  const dbTodo = await getFromDB(db.todo, {});
  if (!dbTodo) return;
  const { year, month, date, user_id } = dbTodo;
  const user = await getFromDB(db.user, {
    where: { id: user_id },
  });
  if (!user) return;
  const { username, password } = user;
  const cookie = await getLoginSession(username, password, app);
  const res = await request(app)
    .delete(`/todo/${year}/${month}/${date}`)
    .set("Cookie", cookie);
  expect(res.status).toBe(200);
  const deleted = await db.todo.findOne({
    where: { id: dbTodo.id },
  });
  expect(deleted).toBeNull();
});
