import { Request, Response } from "express";

export class StartPageController {
  public getStartpage(req: Request, res: Response): void {
    res.render("startpage");
  }
}
