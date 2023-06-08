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
  getImageNameIfHave,
} from "@/utils";

export default {
  get,
  gets,
  post,
  redirectMonthly,
  monthly,
  daily,
  write,
};

// page

async function redirectMonthly(req: Request, res: Response) {
  const user_id = await isLogin(req, res);
  if (!user_id) return;
  const [year, month] = today();
  res.redirect(`/diary/${year}/${month}`);
}

async function monthly(req: Request, res: Response) {
  const user_id = await isLogin(req, res);
  if (!user_id) return;
  const [year, month] = getDateFromUrl(req);
  if (!validateDate(year, month, 1) || isFuture(year, month, 1)) {
    res.redirect("/diary/");
    return;
  }
  res.render("diaries", { year, month });
}

async function daily(req: Request, res: Response) {
  const user_id = await isLogin(req, res);
  if (!user_id) return;
  const [year, month, date] = getDateFromUrl(req);
  if (!validateDate(year, month, date) || isFuture(year, month, date)) {
    res.redirect("/diary");
    return;
  }
  const diary = await getFromDB(db.diary, {
    where: { user_id, year, month, date },
  });
  if (!diary) {
    res.redirect(`/diary/${year}/${month}/${date}/write`);
    return;
  }
  const { content } = diary;
  const image = getImageNameIfHave(year, month, date, user_id) || "";
  res.render("diary", { year, month, date, content, image });
}

//다이어리 쓰기 GET
async function write(req: Request, res: Response) {
  const user_id = await isLogin(req, res);
  if (!user_id) return;
  const [year, month, date] = getDateFromUrl(req);
  if (!validateDate(year, month, date) || isFuture(year, month, date)) {
    res.redirect("/diary");
    return;
  }
  res.render("diaryWrite", { year, month, date });
}

// api

async function gets(req: Request, res: Response) {
  const user_id = await isLogin(req, res);
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
  const user_id = await isLogin(req, res);
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
  const user_id = await isLogin(req, res);
  console.log("user_id", user_id);
  if (!user_id) return;
  const [year, month, date] = getDateFromUrl(req);
  const { title, content } = req.body;
  console.log(req.body);
  if (!validateDate(year, month, date) || isFuture(year, month, date)) {
    res.status(400).json({ error: "Invalid date" });
    return;
  }

  const diary = await createFromDB(db.diary, {
    user_id,
    year,
    month,
    date,
    title,
    content,
  });
  if (!diary) {
    res.status(500).json({ error: "DB error" });
    return;
  }

  res.json(req.headers);
}
