import { Request, Response } from 'express';
import db from '@/models';
export default {
    createPage,
    createTodo,
};

//날짜 확인해서 이상한날짜면 돌리고, 또 문제 없으면 post로 넘기기,

type Todo = {
    id: number;
    date: string;
    content: string;
};

let ToDos: Todo[] = [];

// 페이지 생성
async function createPage(req: Request, res: Response) {
    res.render('todo');
}

// 투두 생성
async function createTodo(req: Request, res: Response) {
    console.log(req.body);
    await db.todo.create({
        date: new Date(),
        content: req.body.content,
    });
    res.send({ result: true });
}
