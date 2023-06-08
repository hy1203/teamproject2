import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "@/models";
import config from "@/config/token";
import { getFromDB } from "./getDB";

export default async function isLogin(req: Request, res: Response) {
  let access = req.headers.authorization || req.cookies.access;
  let refresh = (req.headers.refresh || req.cookies.refresh) as string;

  // access 토큰이 존재하는 경우
  if (access) {
    const verifiedAccess = jwt.verify(
      access,
      config.ACCESS_TOKEN
    ) as JwtPayload;

    // access 토큰이 유효하고 인증된 경우
    if (verifiedAccess.authed) return verifiedAccess.id;

    // access 토큰이 만료된 경우
    const decodedAccess = jwt.decode(access) as JwtPayload;
    if (decodedAccess.exp! * 1000 <= Date.now()) {
      // refresh 토큰이 존재하는 경우
      if (refresh) {
        const verifiedRefresh = jwt.verify(
          refresh,
          config.REFRESH_TOKEN!
        ) as JwtPayload;

        // refresh 토큰이 유효하고 인증된 경우
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
    }
  }

  // access 토큰이 없거나 유효하지 않은 경우
  res.redirect("/login");
}
