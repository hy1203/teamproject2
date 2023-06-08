import { Request, Response } from "express";
import db from "@/models";

export default {
  get,
  post,
};

//회원가입 GET
async function get(req: Request, res: Response) {
  res.render("signup");
}

//회원가입 Post
async function post(req: Request, res: Response) {
  if (!req.body.password) {
    // 패스워드 값이 없는 경우 오류 처리
    console.log("패스워드 값이 없습니다.");
    res.send({ result: false });
    return;
  }
  const { username, password } = req.body;
  const result = await db.user.create({
    username,
    password,
  });
  const { id } = result.toJSON();
  req.session.user = id; // 세션에 사용자 정보 저장
  try {
    res.send({
      result: true,
      name: username,
      password: password,
    });
  } catch (err) {
    console.log("회원가입 실패", err);
    res.send({ result: false });
  }
}
