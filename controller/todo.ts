import { Request, Response } from "express";
import db from "@/models";
import { isLogin } from "@/utils";
import { Controller } from "@/types";
import { Todo } from "@/types/models";

export default <Controller>{
  createPage,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};

let ToDos: Todo[] = [];
//페이지 생성
async function createPage(req: Request, res: Response) {
  res.render("todo");
}
//투두 생성
async function createTodo(req: Request, res: Response) {
  try {
    await db.todo.create({
      date: new Date(),
      content: req.body.content,
    });
    res.send({ result: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
//투두조회
async function getTodo(req: Request, res: Response) {
  try {
    const { year, month, date } = req.params;
    const user = isLogin(req, res);
    if (!user) return;
    const result = await db.todo.findAll({
      where: {
        year,
        month,
        date,
        user_id: user,
      },
    });
    console.log(result);
    // const todo = result.map((v) => {
    //   return v.toJSON();
    // });
    // res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
//투두 수정
async function updateTodo(req: Request, res: Response) {
  try {
    const { year, month, date } = req.params;
    const user = isLogin(req, res);
    if (!user) return;

    const result = await db.todo.update(
      {
        content: req.body.content,
      },
      {
        where: {
          year,
          month,
          date,
          user_id: user,
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
//투두 삭제
async function deleteTodo(req: Request, res: Response) {
  try {
    const { year, month, date } = req.params;
    const user = isLogin(req, res);
    if (!user) return;

    const result = await db.todo.destroy({
      //year, month, date, user_id가 일치하는 todo를 삭제
      where: {
        year,
        month,
        date,
        user_id: user,
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: "Todo가 존재하지 않음." });
    }

    res.status(200).json({ message: "Todo 삭제 완료." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
