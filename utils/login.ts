import { Request, Response } from "express";

export default function isLogin(req: Request, res: Response) {
    const { user } = req.session;
    if (!user) res.redirect("/");
    else return user;
}