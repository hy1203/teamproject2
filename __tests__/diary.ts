import { signup, login, genIdPw, genPort } from "@/utils/testutil";
import {dateSeparate} from "@/utils/date";
import db from "@/models";
import { User, Diary } from "@/types/models";
import setPort from "@/testapp";
import request from "supertest";

const app = setPort(genPort());

test("create diary", async () => {
  const [id, pw] = genIdPw();
  await signup(id, pw, app);
  const loginRes = await login(id, pw, app);
  const cookie = loginRes.header["set-cookie"];
  const [year, month, date] = dateSeparate(new Date());
  const [title, content] = genIdPw();
  const res = await request(app)
    .post(`/diary/${year}/${month}/${date}`)
    .set("Cookie", cookie)
    .send({
      title,
      content,
      emotion: "1",
    });
  const result = res.body as Diary;
  expect(result?.title).toBe(title);
  const userResult = await db.user.findOne({
    where: {
      username: id,
    },
  });
  const user = userResult?.toJSON<User>();
  const diaryResult = await db.diary.findOne({
    where: {
      user_id: user?.id,
      year,
      month,
      date,
    },
  });
  const diary = diaryResult?.toJSON<Diary>();
  expect(diary?.title).toBe(title);
});

test("get diary", async () => {
  const [year, month, date] = dateSeparate(new Date());
  const diaryResult = await db.diary.findOne({
    where: {
      year,
      month,
      date,
    },
  });
  const diary = diaryResult?.toJSON<Diary>();
  const user_id = diary?.user_id;
  const userResult = await db.user.findOne({
    where: {
      id: user_id,
    },
  });
  const user = userResult?.toJSON<User>();
  const [id, pw] = [user?.username, user?.password];
  if (!id || !pw) throw new Error("id or pw is undefined");
  const loginRes = await login(id, pw, app);
  const cookie = loginRes.header["set-cookie"];
  const res = await request(app)
    .get(`/diary/${year}/${month}/${date}`)
    .set("Cookie", cookie);
  const result = res.body.diary as Diary;
  expect(result?.title).toBe(diary?.title);
  expect(result?.content).toBe(diary?.content);
});

