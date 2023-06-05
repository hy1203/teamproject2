import { Request, Response } from "express";
import { Controller, Control } from "@/types";

class Calendar implements Controller{
  [key: string]: Control;
  public get(req: Request, res: Response) {
    res.render("todocalendar");
  }
}

export default new Calendar();
