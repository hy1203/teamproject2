import { Request, Response } from "express";

export class DairyController {
  public getDairy(req: Request, res: Response): void {
    res.render("dairy");
  }
}
