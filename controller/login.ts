import { Request, Response } from 'express';
import db from '@/models';

export default {
    get,
    post,
};

//로그인 GET
async function get(req: Request, res: Response) {
    res.render('login');
}

//로그인 POST
async function post(req: Request, res: Response) {
    try {
        const user = await db.user.findOne({
            where: {
                username: req.body.username,
                password: req.body.password,
            },
        });

        if (user) {
            // 검색된 사용자 정보가 존재할 경우
            console.log('로그인 성공');
            res.send({ result: true, data: user });
        } else {
            console.log('로그인 실패');
            res.send({ result: false });
        }
    } catch (err) {
        console.log('로그인 오류', err);
        res.send({ result: false });
    }
}
