import sequelize from "../../../sequlize.js";

const CartCount = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  } // Log the user ID

  try {
    const result = await sequelize.query(
      `
        SELECT SUM(quantity) AS itemcount FROM pankaj.cart WHERE user_id= :user_id
        `,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { user_id: userId },
        raw: true,
      }
    );

    if (result.length > 0) {
      const { itemcount } = result[0]; 

       return res.json({ count: parseInt(itemcount, 10) }); // Return as integer
    }

    res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default CartCount;
