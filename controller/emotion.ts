import { Request, Response } from "express";
import db from "@/models";
import { validateDate, isFuture, isLogin } from "@/utils";
import { Controller } from "@/types";
import { Emotion } from "@/types/models";

const { emotion } = db;

export default {
  redirectGets,
  emotionIndex,
};

async function redirectGets(req: Request, res: Response) {
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
