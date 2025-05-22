import Router from "express";
import multer from "multer";
import login from "../../controller/Auth/Login/LoginController.js";
import signup from "../../controller/Auth/Signup/SignupController.js";

const authRoute = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

authRoute.post("/login", login);
authRoute.post("/signup", upload.single("image"), signup);

export default authRoute;
