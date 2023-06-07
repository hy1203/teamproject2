import process from "process";
import { Request, Response } from "express";
import config from "@/config/token";
import jwt from "jsonwebtoken";
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
    const { username, password } = req.body;
    const result = await db.user.findOne({
      where: { username, password },
    });
    const { id } = result?.toJSON()!;
    if (!id) throw new Error("유저 정보 없음");
    const authed = true;
    const access = jwt.sign({ id, authed }, config.ACCESS_TOKEN!, {
      expiresIn: "1h",
    });
    const refresh = jwt.sign({ id, authed }, config.REFRESH_TOKEN!, {
      expiresIn: "30d",
    });
    const setRefresh = await db.user.update({ refresh }, { where: { id } });
    if (!setRefresh) throw new Error("Refresh 토큰 저장 실패");
    console.log(req.headers);
    res
      .cookie("access", access, { httpOnly: true })
      .cookie("refresh", refresh, { httpOnly: true })
      .send({ result: true });
  } catch (err) {
    console.log("로그인 오류", err);
    res.send({ result: false });
  }
}
