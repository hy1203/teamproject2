import { Request, Response } from 'express';
import db from "@/models";
import { validateDate, isFuture, isLogin } from '@/utils';
import { Controller } from '@/types';
import { Diary } from '@/types/models';

const { diary } = db;

export default <Controller>{
  get,
  gets,
  redirectGets,
  post,
};

async function redirectGets(req: Request, res: Response) {
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  res.redirect(`/diary/${year}/${month}`);
}

async function gets(req: Request, res: Response) {
  const [year, month] = ["year", "month"]
    .map((key) => req.params[key])
    .map(Number);
  const user_id = isLogin(req, res);
  if (!user_id) return;
  if (!validateDate(year, month, 1) || isFuture(year, month, 1)) {
    res.redirect("/");
    return;
  }
  const result = await diary.findAll({
    where: { user_id, year, month },
  });
  const diaries = result.map((r) => r?.toJSON<Diary>());
  // res.render("diary", { year, month, diaries });
  res.send({ year, month, diaries });
}

async function get(req: Request, res: Response) {
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const [year, month, date] = ["year", "month", "date"]
    .map((key) => req.params[key])
    .map(Number);
  if (!validateDate(year, month, date) || isFuture(year, month, date)) {
    res.redirect("/");
    return;
  }
  const result = await diary.findOne({
    where: { user_id, year, month, date },
  });
  const diaries = result?.toJSON<Diary>();
  res.render("diary", { year, month, date, diaries });
}

async function post(req: Request, res: Response) {
  const [year, month, date] = ["year", "month", "date"]
    .map((key) => req.params[key])
    .map(Number);
  const { content } = req.body;
  const user_id = isLogin(req, res);
  if (!user_id) return;
  await diary.upsert({ user_id, year, month, date, content });
  res.redirect(`/diary/${year}/${month}/${date}`);
}
