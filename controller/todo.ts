import { Request, Response } from "express";
import db from "@/models";
import { isLogin, validateDate, getDateFromUrl } from "@/utils";
import { Controller } from "@/types";
import { Todo } from "@/types/models";

export default <Controller>{
  createPage,
  post,
  get,
  put,
  destroy,
  createTodoComment,
  updateTodoComment,
  deleteTodoComment,
};

//페이지 생성
async function createPage(req: Request, res: Response) {
  res.render("todo");
}
//투두 생성
async function post(req: Request, res: Response) {
  const user_id = isLogin(req, res);
  if (!user_id) return;
  const [year, month, date] = getDateFromUrl(req);
  if (!validateDate(year, month, date)) {
    return res.status(400).json({ message: "날짜 형식이 잘못됨." });
  }
  const { content } = req.body;
  try {
    const result = await db.todo.create({
      user_id,
      year,
      month,
      date,
      content,
    });
    const todo = result.toJSON<Todo>();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
//투두조회
async function get(req: Request, res: Response) {
  try {
    const [year, month, date] = getDateFromUrl(req);
    const user_id = isLogin(req, res);
    if (!user_id) return;
    const result = await db.todo.findAll({
      where: {
        year,
        month,
        date,
        user_id,
      },
    });
    const todos = result.map((todo) => {
      return todo.toJSON<Todo>();
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
//투두 수정
async function put(req: Request, res: Response) {
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
async function destroy(req: Request, res: Response) {
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

// todo comment생성
async function createTodoComment(req: Request, res: Response) {
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
    const todo = todoResult?.toJSON<Todo>();
    const comment = await db.comment.create({
      todo_id: todo?.id,
      content: req.body.content,
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// todo comment수정
async function updateTodoComment(req: Request, res: Response) {
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
    const todo = todoResult?.toJSON<Todo>();

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
async function deleteTodoComment(req: Request, res: Response) {
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
    const todo = todoResult?.toJSON<Todo>();

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
