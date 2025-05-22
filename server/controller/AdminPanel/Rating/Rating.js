import { Product } from "../../../modal/Product/ProductModal.js";
import sequelize from "../../../sequlize.js";

const Rating = async (req, res) => {
  const { id } = req.params;

  try {
    const raiting = await sequelize.query(
      `
         SELECT u.user_id, u.product_id, u.order_id, u.rating, us.username 
            FROM pankaj.user_product_ratings AS u 
            JOIN pankaj.users AS us ON u.user_id = us.id 
            WHERE u.product_id = :id
        `,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { id: id },
      }
    );

    if (raiting) {
      return res.status(200).json(raiting);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ errror: "Error occur Please try agin later" });
  }
};

export default Rating;
