import { Request, Response } from "express";

export class TodoCalendarController {
  public getTodoCalendar(req: Request, res: Response): void {
    res.render("todocalendar");
  }
}
