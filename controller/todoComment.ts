import { Request, Response } from "express";
import db from "@/models";
import { isLogin, validateDate, getDateFromUrl } from "@/utils";
import { Controller } from "@/types";

export default <Controller>{
  create,
  update,
  destroy,
};

// todo comment생성
async function create(req: Request, res: Response) {
  try {
    const user = isLogin(req, res);
    if (!user) return;
    const { year, month, date } = req.params;
    const todoResult = await db.todo.findOne({
      where: {
        year,
        month,
        date,
        user_id: user,
      },
    });
    const todo = todoResult?.toJSON();
    if (!todo) {
      return res.status(404).json({ message: "Todo가 존재하지 않음." });
    }
    const comment = await db.comment.create({
      todo_id: todo?.id,
      content: req.body.content,
      emotion_id: req.body.emotion_id,
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// todo comment수정
async function update(req: Request, res: Response) {
  try {
    const user = isLogin(req, res);
    if (!user) return;
    const { year, month, date } = req.params;
    const todoResult = await db.todo.findOne({
      where: {
        year,
        month,
        date,
        user_id: user,
      },
    });
    const todo = todoResult?.toJSON();

    const comment = await db.comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          todo_id: todo?.id,
        },
      }
    );
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// todo comment삭제
async function destroy(req: Request, res: Response) {
  try {
    const user = isLogin(req, res);
    if (!user) return;
    const { year, month, date } = req.params;
    const todoResult = await db.todo.findOne({
      where: {
        year,
        month,
        date,
        user_id: user,
      },
    });
    const todo = todoResult?.toJSON();

    const comment = await db.comment.destroy({
      where: {
        todo_id: todo?.id,
      },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
