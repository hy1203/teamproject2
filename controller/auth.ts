import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "@/models";

export default {
  get,
};

declare module "jsonwebtoken" {
  interface JwtPayload {
    id: number;
    authed: boolean;
  }
}

async function get(req: Request, res: Response) {
  const access = req.headers.authorization!.substring(7);
  const refresh = req.headers.refresh as string;
  if (access && refresh) {
    const verified = jwt.verify(
      access,
      process.env.ACCESS_TOKEN!
    ) as jwt.JwtPayload;
    if (verified.authed) return res.send({ result: true });
  }
  if (!refresh) return res.redirect("/login");
  try {
    const { id } = jwt.verify(
      refresh,
      process.env.REFRESH_TOKEN!
    ) as jwt.JwtPayload;
    const result = await db.user.findOne({ where: { id } });
    const user = result?.toJSON();
    if (!user) throw new Error("유저 정보 없음");
    if (user.refresh !== refresh) return res.redirect("/login");
    const access = jwt.sign({ user: id }, process.env.ACCESS_TOKEN!, {
      expiresIn: "1h",
    });
    req.headers.authorization = `Bearer ${access}`;
    res.send({ result: true });
  } catch (err) {
    console.log("토큰 갱신 오류", err);
    res.send({ result: false });
  }
}
