import { Request, Response } from "express";
import db from "@/models";
// import {  } from "@/utils";
import { Controller } from "@/types";
import { User } from "@/types/models";

export default <Controller>{
  index
};

async function index(req: Request, res: Response) {
  res.render("index");
}
