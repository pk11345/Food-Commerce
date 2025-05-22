import { User } from "../../../modal/Auth/UserModal.js";

const UsersNotApproved = async (req, res) => {
  try {
    const rows = await User.findAll({
      where: {
        approved: "false",
      },
      order: [["id", "ASC"]],
      raw: true,
    });

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const UserAccept = async (req, res) => {
  const { userId } = req.body;
  try {
    const userInfo = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["approved"],
      raw: true,
    });

    userInfo.approved = "true";

    const respnd = await User.update(userInfo, {
      where: {
        id: userId,
      },
      returning: true,
      raw: true,
    });

    return res.status(200).json(respnd[1]);
  } catch (error) {
    return res.status(500).json({ error: "Error to accept the user" });
  }
};

const UserCacncel = async (req, res) => {
  const { id } = req.params;
  try {
    const userDel = await User.destroy({
      where: {
        id: id,
      },
      raw: true,
    });
    if (!userDel) {
      return res.status(400).json({ error: "Error cancel  the user" });
    }

    return res.status(200).json({ message: "Cancel succesfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error in DB" });
  }
};

export default { UsersNotApproved, UserAccept, UserCacncel };
