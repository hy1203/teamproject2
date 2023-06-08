import path from "path";
import { Router } from "express";
import multer from "multer";

const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "views/uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

const route = Router();

route.post("/", uploadDetail.single("upload"), (req, res) => {
  res.json({ url: `/upload/${req?.file?.filename}` });
});

export default route;
