import { isFileExist } from "../../helpers/helpers.js";
import { User } from "../../modal/Auth/UserModal.js";
import jwt from "jsonwebtoken";

const updateProfile = async (req, res) => {
  const { payload } = req.body;

  try {
    const userInfo = await User.findOne({
      where: {
        id: payload.id,
      },
      raw: true,
    });

    let imgpath = null;
    if (req.file) {
      imgpath = `uploads/${req.file.filename.replace(/\\/g, "/")}`;
    }

    if (req.file) {
      isFileExist(`${process.cwd()}/${userInfo.image}`);
    }

    const userUpdatedInfo = {
      username: payload.username,
      email: payload.email,
      image: imgpath || userInfo.image,
    };

    const updateInfo = await User.update(userUpdatedInfo, {
      where: {
        id: payload.id,
      },
      returning: true,
      raw: true,
    });

    if (!updateInfo) {
      return res.status(500).json({ errror: "Error Updating the user" });
    }

    const user = {};

    if (updateInfo[1]) {
      for (let i = 0; i < updateInfo[1].length; i++) {
        user["id"] = updateInfo[1][i].id;
        user["email"] = updateInfo[1][i].email;
        user["username"] = updateInfo[1][i].username;
        user["image"] = updateInfo[1][i].image;
        user["role"] = updateInfo[1][i].role;
      }
    }

    const key = process.env.jwt_secret;

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        image: user.image,
        role: user.role,
      },
      key,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ data: { ...user }, token });
  } catch (error) {
    console.log(error);
  }
};

export default updateProfile;
