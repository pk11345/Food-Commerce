import Router from "express";
import multer from "multer";
import authInfo from "../../controller/Context/AuthContextController.js";
import jwtVerify from "../../middleware/TokkenVerify.js";

const contextRoute = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

contextRoute.get("/auth", jwtVerify, authInfo);

export default contextRoute;
