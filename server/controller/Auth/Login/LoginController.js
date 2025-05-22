import { User } from "../../../modal/Auth/UserModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { payload } = req.body;

  try {
    const emailCheck = await User.findOne({
      where: {
        email: payload.email,
      },
      raw: true,
    });

    if (!emailCheck) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      emailCheck.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const key = process.env.jwt_secret;

    const token = jwt.sign(
      {
        id: emailCheck.id,
        email: emailCheck.email,
        username: emailCheck.username,
        image: emailCheck.image,
        role: emailCheck.role,
      },
      key,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token, emailCheck });
  } catch (error) {
    console.log(error);
  }
};

export default login;
