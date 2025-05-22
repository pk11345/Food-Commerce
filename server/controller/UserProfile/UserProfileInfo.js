import { User } from "../../modal/Auth/UserModal.js";

const userProfileInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const userInfo = await User.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "email", "username",],
      raw: true,
    });

    return res.status(200).json({ ...userInfo });
  } catch (error) {
    console.log(error);
  }
};

export default userProfileInfo;
