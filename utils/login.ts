import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "@/models";
import config from "@/config/token";
import { getFromDB } from "./getDB";

export default async function isLogin(req: Request, res: Response) {
  const access = req.headers.authorization || req.cookies.access;
  try {
    // access 토큰이 존재하는 경우
    const { id } = jwt.verify(access, config.ACCESS_TOKEN) as jwt.JwtPayload;
    return id;
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
  const refresh = (req.headers.refresh || req.cookies.refresh) as string;
  if (!refresh) {
    res.redirect("/login");
    return;
  }

  try {
    // refresh 토큰이 유효한 경우 유저 ID 반환
    const { id } = jwt.verify(refresh, config.REFRESH_TOKEN!) as jwt.JwtPayload;
    // DB에서 유저 refresh 가져오기
    const user = await getFromDB(db.user, { where: { id } });
    if (!user) throw new Error("유저 정보 없음");
    if (user.refresh !== refresh) {
      // refresh 토큰이 일치하지 않는 경우
      throw new Error("Refresh 토큰 불일치");
    }

    const newAccess = jwt.sign({ user: id }, config.ACCESS_TOKEN!, {
      expiresIn: "1h",
    });
    req.headers.authorization = `Bearer ${newAccess}`;
    res.cookie("access", newAccess, { httpOnly: true });
    return id;
  } catch (err) {
    console.log("Refresh 토큰 검증 오류", err);
  }

  // 로그인 페이지로 리디렉션합니다.
  res.redirect("/login");
}
