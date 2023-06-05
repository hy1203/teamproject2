import { login, genIdPw, genPort } from "@/utils/testutil";
import db from "@/models";
import { User, Todo, Comment } from "@/types/models";
import setPort from "@/testapp";
import request from "supertest";

const app = setPort(genPort());

test("create comment", async () => {
  const todoResult = await db.todo.findOne({
    order: [["id", "DESC"]],
  });
  const todo = todoResult?.toJSON<Todo>();
  // 코멘트를 생성할 임의의 투두 불러오기
  if (!todo) return; // 투두가 없으면 테스트 실패
  const { id: todo_id, user_id } = todo;
  // 투두의 아이디와 유저 아이디를 가져옴
  const userResult = await db.user.findOne({
    where: {
      id: user_id,
    },
  });
  const user = userResult?.toJSON<User>();
  // 유저 아이디로 유저를 불러옴
  if (!user) return; // 유저가 없으면 테스트 실패
  const { username, password } = user;
  const loginRes = await login(username, password, app);
  const cookie = loginRes.header["set-cookie"];
  // 유저로 로그인을 하고 쿠키(로그인 세션)를 가져옴
  const content = genIdPw().toString();
  // 임의의 코멘트 내용을 생성
  const res = await request(app)
    .post(`/comment/${todo.id}`)
    .set("Cookie", cookie)
    .send({
      todo_id,
      content,
    });
  // 코멘트 생성
  const resComment = res.body as Comment;
  // 생성된 코멘트를 받아옴(DB에서 ID로 불러와 다시 비교해야 하기 때문에 필요)
  expect(resComment?.content).toBe(content);
  // 코멘트 내용이 일치하는지 확인
  const { id } = resComment;
  const commentResult = await db.comment.findOne({
    where: {
      id,
    },
  });
  const dbComment = commentResult?.toJSON<Comment>();
  // ID로 생성된 코멘트를 DB에서 불러옴
  expect(dbComment?.content).toBe(content);
  // DB에서 불러온 코멘트 내용이 일치하는지 확인
});
