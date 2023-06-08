import { Request, Response } from "express";

export default class StartPage {
  public get(req: Request, res: Response): void {
    res.render("startpage");
  }
}
