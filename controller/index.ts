import { Request, Response } from 'express';
import db from '../models';
// import {  } from "@/utils";
import { Controller } from '../types';
import { User } from '../types/models';
import models from '../models';

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
    //회원가입
    const result = await models.user.create({
        username: req.body.username,
        password: req.body.passwrod,
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
