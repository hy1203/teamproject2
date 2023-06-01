import { Request, Response } from "express";

export interface Controller {
  [key: string]: (req: Request, res: Response) => void;
}
