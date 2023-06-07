import { Request, Response } from "express";
import db from "@/models";
import { isLogin } from "@/utils";

export default {
  create,
  update,
  destroy,
};

// comment생성
async function create(req: Request, res: Response) {
  try {
    const user_id = isLogin(req, res);
    if (!user_id) return;
    const todo_id = Number(req.params.todo_id);
    const commentResult = await db.todo.findOne({
      where: {
        id: todo_id,
        user_id,
      },
    });
    const todo = commentResult?.toJSON();
    if (!todo) {
      return res.status(404).json({ message: "Todo가 존재하지 않음." });
    }
    const { content, emotion_id } = req.body;
    const result = await db.comment.create({
      todo_id,
      content,
      emotion_id,
    });
    const comment = result.toJSON();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// comment수정
async function update(req: Request, res: Response) {
  try {
    const user = isLogin(req, res);
    if (!user) return;
    const todo_id = Number(req.params.todo_id);
    const todoResult = await db.todo.findOne({
      where: {
        user_id: user,
        id: todo_id,
      },
    });
    const todo = todoResult?.toJSON();
    if (!todo) {
      return res.status(404).json({ message: "Todo가 존재하지 않음." });
    }
    const result = await db.comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          todo_id,
        },
      }
    );
    if (result[0] === 0) {
      return res.status(404).json({ message: "Todo가 존재하지 않음." });
    }
    res.status(200).json({ message: "Todo 수정 완료." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// comment삭제
async function destroy(req: Request, res: Response) {
  try {
    const user = isLogin(req, res);
    if (!user) return;
    const todo_id = Number(req.params.todo_id);

    const todoResult = await db.todo.findOne({
      where: {
        user_id: user,
        id: todo_id,
      },
    });
    const todo = todoResult?.toJSON();
    if (!todo) {
      return res.status(404).json({ message: "Todo가 존재하지 않음." });
    }
    const result = await db.comment.destroy({
      where: {
        todo_id,
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: "Todo가 존재하지 않음." });
    }

    res.status(200).json({ message: "Comment 삭제 완료." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
