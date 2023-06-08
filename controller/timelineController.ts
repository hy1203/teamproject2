import { Request, Response } from "express";

export class TimelineController {
  public getTimeline(req: Request, res: Response): void {
    res.render("timeline");
  }
}
