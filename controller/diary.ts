import { Request, Response } from "express";
import db from "@/models";
import {
  validateDate,
  isFuture,
  isLogin,
  today,
  getDateFromUrl,
  getFromDB,
  getAllFromDB,
  createFromDB,
} from "@/utils";

export default {
  get,
  gets,
  post,
  redirectMonthly,
  monthly,
  daily,
  page,
};

// page

async function page(req: Request, res: Response) {
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const [year, month, date] = today();
  res.render("dairy", { year, month, date });
}

function redirectMonthly(req: Request, res: Response) {
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const [year, month] = today();
  res.redirect(`/diary/${year}/${month}`);
}

function monthly(req: Request, res: Response) {
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const [year, month] = getDateFromUrl(req);
  if (!validateDate(year, month, 1) || isFuture(year, month, 1)) {
    res.redirect("/diary/");
    return;
  }
  res.render("diaries", { year, month });
}

function daily(req: Request, res: Response) {
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const [year, month, date] = getDateFromUrl(req);
  if (!validateDate(year, month, date) || isFuture(year, month, date)) {
    res.redirect("/diary/");
    return;
  }
  res.render("diary", { year, month, date });
}

// api

async function gets(req: Request, res: Response) {
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const [year, month] = getDateFromUrl(req);
  if (!validateDate(year, month, 1) || isFuture(year, month, 1)) {
    res.redirect("/diary/");
    return;
  }
  const diaries = await getAllFromDB(db.diary, {
    where: { user_id, year, month },
  });
  res.json(diaries);
}

async function get(req: Request, res: Response) {
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const [year, month, date] = getDateFromUrl(req);
  if (!validateDate(year, month, date) || isFuture(year, month, date)) {
    res.redirect("/diary/");
    return;
  }
  const diary = await getFromDB(db.diary, {
    where: { user_id, year, month, date },
  });
  res.json(diary);
}

async function post(req: Request, res: Response) {
  const [year, month, date] = getDateFromUrl(req);
  const { title, content } = req.body;
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const diary = await createFromDB(db.diary, {
    user_id,
    year,
    month,
    date,
    title,
    content,
  });
  if (!diary) {
    res.status(400).send("잘못된 요청입니다.");
    return;
  }
  res.json(diary);
}
