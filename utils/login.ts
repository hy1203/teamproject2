import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "@/models";
import config from "@/config/token";
import { getFromDB } from "./getDB";

export default async function isLogin(req: Request, res: Response) {
  let access = req.headers.authorization || req.cookies.access;
  let refresh = (req.headers.refresh || req.cookies.refresh) as string;

  try {
    // access 토큰이 존재하는 경우
    if (access) {
      const { id } = jwt.verify(access, config.ACCESS_TOKEN) as jwt.JwtPayload;

      return id;
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log("Access 토큰 만료");
    } else {
      console.log("Access 토큰 검증 오류", err);
      res.redirect("/login");
      return;
    }
  }

  // access 토큰이 없거나 유효하지 않은 경우에만 refresh 토큰 확인
  if (!refresh) {
    res.redirect("/login");
    return;
  }

  try {
    const verifiedRefresh = jwt.verify(
      refresh,
      config.REFRESH_TOKEN!
    ) as JwtPayload;

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
  } catch (err) {
    console.log("Refresh 토큰 검증 오류", err);
  }

  // 로그인 페이지로 리디렉션합니다.
  res.redirect("/login");
}
