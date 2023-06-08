import fs from "fs";
import crypto from "crypto";
import { Request, Response } from "express";
import isLogin from "@/utils/login";
import sharp from "sharp";

export default { image };

async function image(req: Request, res: Response) {
  // 로그인 확인
  const id = await isLogin(req, res);
  if (!id) return;
  const { year, month, date } = req.params;
  // 파일 경로 생성
  const dir = `upload/${year}/${month}/${date}`;
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) throw err;
  });
  // 파일 이름 해시화로 보안 강화
  const filename = crypto
    .createHash("sha256")
    .update(`${year}${month}${date}${id}`)
    .digest("base64url");
  try {
    // sharp로 파일 jpg로 변환하여 저장
    const result = await sharp(req?.file?.buffer).toFile(
      `${dir}/${filename}.jpg`
    );
    if (!result) throw new Error("파일 저장 실패");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "파일 저장 실패" });
  }
  // 파일 경로 응답
  const path = `image/${year}/${month}/${date}/${filename}.jpg`;
  res.status(200).json({
    message: "파일 저장 성공",
    path,
  });
}
