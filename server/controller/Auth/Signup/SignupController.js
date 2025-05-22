import { User } from "../../../modal/Auth/UserModal.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  const { payload } = req.body;
  let imgpath = null;
  if (req.file) {
    imgpath = `uploads/${req.file.filename.replace(/\\/g, "/")}`;
  }

  const emailCheck = await User.findOne({
    where: {
      email: payload.email,
    },
    raw: true,
  });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already used" });
  }

  const pass = await bcrypt.hash(payload.password, 10);

  const userInfo = {
    username: payload.username,
    email: payload.email,
    password: pass,
    full_name: payload.fullname,
    image: imgpath,
  };

  const userEnter = User.create(userInfo);

  if (!userEnter) {
    return res.status(400).json({ message: "Error enter the user" });
  }

  res.status(200).json({
    status: "success",
    data: {},
    message: `Data stored successfully `,
  });
};

export default signup;
