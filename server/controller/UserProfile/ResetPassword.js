import { User } from "../../modal/Auth/UserModal.js";
import bcrypt from "bcrypt";

const generateOtp = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id: id },
      raw: true,
    });
    if (!user) {
      return res.status(400).json({ error: "No user Found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user["otp"] = otp;
    user["otp_expires_at"] = new Date(Date.now() + 15 * 60 * 1000);

    const userUpdate = await User.update(user, {
      where: {
        id: id,
      },
      returning: true,
      raw: true,
    });
    let otpverify = {};
    for (let i = 0; i < userUpdate[1].length; i++) {
      otpverify["otp"] = userUpdate[1][i].otp;
    }

    return res.status(200).json({ data: { ...otpverify } });
  } catch (error) {
    return res.status(200).json({ error: "Database error" });
  }
};

const resetPassword = async (req, res) => {
  const { data } = req.body;

  try {
    const userInfo = await User.findOne({
      where: {
        id: data.id,
      },
      raw: true,
    });

    const checkOtp = userInfo.otp;
    if (checkOtp !== data.otp) {
      return res.status(500).json({ error: "Wrong Otp" });
    } else {
      const pass = await bcrypt.hash(data.newPassword, 10);
      const userData = {
        password: pass,
      };
      const updateUser = await User.update(userData, {
        where: { id: data.id },
        returning: true,
        raw: true,
      });
      if (!updateUser[1]) {
        return res.status(200).json({ error: "Not able to update password" });
      }
      return res.status(200).json({ message: "Password chage successfully" });
    }
  } catch (error) {
    return res.status(200).json({ error: "Database error" });
  }
};

export default { generateOtp, resetPassword };
