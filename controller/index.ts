import { Request, Response } from 'express';
import db from '../models';
// import {  } from "@/utils";
import { Controller } from '@/types';
import { User } from '@/types/models';
import models from '@/models';

declare module 'express-session' {
    interface SessionData {
        user: string;
    }
}

async function index(req: Request, res: Response) {
    res.render('index');
}
async function login(req: Request, res: Response) {
    res.render('login');
}
async function signup(req: Request, res: Response) {
    res.render('signup');
}
async function post_signup(req: Request, res: Response) {
    // 회원가입
    if (!req.body.password) {
        // 패스워드 값이 없는 경우 오류 처리
        console.log('패스워드 값이 없습니다.');
        res.send({ result: false });
        return;
    }
    const result = await models.user.create({
        username: req.body.username,
        password: req.body.password,
    });
    const { username, password } = await result.toJSON<User>();
    req.session.user = username; // 세션에 사용자 정보 저장
    try {
        res.send({
            result: true,
            name: username,
            password: password,
        });
    } catch (err) {
        console.log('회원가입 실패', err);
        res.send({ result: false });
    }
}
async function post_login(req: Request, res: Response) {
    try {
        const user = await models.user.findOne({
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

// routes 폴더로 기본 내보내기 설정
const controller: Controller = {
    index,
    login,
    signup,
    post_signup,
    post_login,
};

export default controller; // 기본 내보내기 설정
