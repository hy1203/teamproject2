import { Request, Response } from 'express';
import db from '@/models';
// import {  } from "@/utils";
import { Controller } from '@/types';

export default <Controller>{
    index,
    login,
    signup,
};

async function index(req: Request, res: Response) {
    res.render('index');
}
async function login(req: Request, res: Response) {
    res.render('login');
}
async function signup(req: Request, res: Response) {
    res.render('signup');
}
