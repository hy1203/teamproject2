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
  const user = isLogin(req, res);
  if (!user) return;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  res.redirect(`/diary/${year}/${month}`);
}

async function gets(req: Request, res: Response) {
  const { year, month } = req.params;
  const [y, m] = [year, month].map(Number);
  const user = isLogin(req, res);
  if (!user) return;
  if (!validateDate(y, m, 1) || isFuture(y, m, 1)) {
    res.redirect("/");
    return;
  }
  const result = await diary.findAll({
    where: { user, year: y, month: m },
  });
  const diaries = result.map((r) => r?.toJSON<Diary>());
  res.render("diary", { year: y, month: m, diaries });
}

async function get(req: Request, res: Response) {
  const user = isLogin(req, res);
  if (!user) return;
  const { year, month, date } = req.params;
  const [y, m, d] = [year, month, date].map(Number);
  if (!validateDate(y, m, d) || isFuture(y, m, d)) {
    res.redirect("/");
    return;
  }
  const result = await diary.findOne({
    where: { user, year: y, month: m, date: d },
  });
  const diaries = result?.toJSON<Diary>();
  res.render("diary", { year: y, month: m, date: d, diaries });
}

async function post(req: Request, res: Response) {
  const { year, month, date } = req.params;
  const [y, m, d] = [year, month, date].map(Number);
  const { content } = req.body;
  const user = isLogin(req, res);
  if (!user) return;
  await diary.upsert({ user, y, m, d, content });
  res.redirect(`/diary/${y}/${m}/${d}`);
}
