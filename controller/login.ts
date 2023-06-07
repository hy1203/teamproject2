import { Request, Response } from "express";
import db from "@/models";

export default {
  get,
  post,
};

//로그인 GET
async function get(req: Request, res: Response) {
  res.render("login");
}

//로그인 POST
async function post(req: Request, res: Response) {
  try {
    const result = await db.user.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    const user = result?.toJSON().id;

    if (user) {
      req.session.user = user;
      req.session.save(() => {});
      res.send({ result: true });
    } else {
      console.log("로그인 실패");
      res.send({ result: false });
    }
  } catch (err) {
    console.log("로그인 오류", err);
    res.send({ result: false });
  }
}
