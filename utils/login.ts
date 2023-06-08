import process from "process";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "@/models";
import config from "@/config/token";
import { getFromDB } from "./getDB";

export default async function isLogin(req: Request, res: Response) {
  let access = req.headers.authorization || req.cookies.access;
  let refresh = (req.headers.refresh || req.cookies.refresh) as string;

  // access 토큰과 refresh 토큰이 모두 존재하는 경우
  if (access && refresh) {
    const verifiedAccess = jwt.verify(
      access,
      config.ACCESS_TOKEN
    ) as jwt.JwtPayload;
    const verifiedRefresh = jwt.verify(
      refresh,
      config.REFRESH_TOKEN!
    ) as jwt.JwtPayload;

    // access 토큰이 유효하고 인증된 경우
    if (verifiedAccess.authed) return verifiedAccess.id;

    // refresh 토큰이 만료되지 않았고 인증된 경우
    if (verifiedRefresh.authed) {
      const { id } = verifiedRefresh;
      const user = await getFromDB(db.user, { where: { id } });
      if (!user) throw new Error("유저 정보 없음");
      if (user.refresh !== refresh) {
        res.redirect("/login");
        return;
      }
      const newAccess = jwt.sign({ user: id }, config.ACCESS_TOKEN!, {
        expiresIn: "1h",
      });
      req.headers.authorization = `Bearer ${newAccess}`;
      return id;
    }
  }

  // refresh 토큰이 없는 경우
  if (!refresh) {
    res.redirect("/login");
    return;
  }

  // refresh 토큰이 만료된 경우
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

  // 기본적으로 로그인 페이지로 리디렉션합니다.
  res.redirect("/login");
}
