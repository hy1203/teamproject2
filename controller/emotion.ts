import { Request, Response } from "express";
import db from "@/models";
import { validateDate, isFuture, isLogin } from "@/utils";
import { Controller } from "@/types";
import { Emotion } from "@/types/models";
import route from "@/routes";

const { emotion, diary } = db;

export default {
  get,
  emotionIndex,
};

async function get(req: Request, res: Response) {
  // const user_id = isLogin(req, res);
  // if (!user_id) return;

  // console.log(req.params);

  // const calendar = await diary.findAll({
  //   where: {
  //     user_id,
  //     month: Number(req.params.month),
  //     year: Number(req.params.year),
  //   },
  // }); 결과물을 보기 위해서 주석처리

  const Happy = await emotion.findAll({
    attributes: ["id", "feel"],
    where: { feel: 1 },
  });
  const Good = await emotion.findAll({
    attributes: ["id", "feel"],
    where: { feel: 2 },
  });
  const Soso = await emotion.findAll({
    attributes: ["id", "feel"],
    where: { feel: 3 },
  });
  const Notbad = await emotion.findAll({
    attributes: ["id", "feel"],
    where: { feel: 4 },
  });
  const Bad = await emotion.findAll({
    attributes: ["id", "feel"],
    where: { feel: 5 },
  });

  console.log(
    Happy.length,
    Good.length,
    Soso.length,
    Notbad.length,
    Bad.length
  );

  const data = {
    Happy: Happy.length,
    Good: Good.length,
    Soso: Soso.length,
    Notbad: Notbad.length,
    Bad: Bad.length,
  };

  res.send({ emotion: data });
}

async function emotionIndex(req: Request, res: Response) {
  res.render("emotion");
}
