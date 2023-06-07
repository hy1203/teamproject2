import process from "process";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "@/models";
import config from "@/config/token";
import { getFromDB } from "./getDB";

export default async function isLogin(req: Request, res: Response) {
  let access = req.headers.authorization || req.cookies.access;
  let refresh = (req.headers.refresh || req.cookies.refresh) as string;
  if (access && refresh) {
    const verified = jwt.verify(access, config.ACCESS_TOKEN) as jwt.JwtPayload;
    if (verified.authed) return verified.id;
  }

  if (!refresh) {
    res.redirect("/login");
    return;
  }
  try {
    const { id } = jwt.verify(refresh, config.REFRESH_TOKEN!) as jwt.JwtPayload;
    const user = await getFromDB(db.user, { where: { id } });
    if (!user) throw new Error("유저 정보 없음");
    if (user.refresh !== refresh) {
      res.redirect("/login");
      return;
    }
    const access = jwt.sign({ user: id }, config.ACCESS_TOKEN!, {
      expiresIn: "1h",
    });
    req.headers.authorization = `Bearer ${access}`;
    return id;
  } catch (err) {
    console.log("토큰 갱신 오류", err);
    res.redirect("/login");
  }
  res.redirect("/login");
}
