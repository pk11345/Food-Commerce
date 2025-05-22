import { User } from "../../modal/Auth/UserModal.js";

const authInfo = async (req, res) => {
  const token = req.user;
  const id = token.id;

  try {
    const result = await User.findOne({
      where: { id: id },
      attributes: ["email", "username", "id", "image", "role"],
      raw: true,
    });

    return res.status(200).json({
      data: { ...result },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Bakend error" });
  }
};

export default authInfo;
