import { OrderHistory } from "../../../modal/Order/OrderHistoryModal.js";
import { Product } from "../../../modal/Product/ProductModal.js";
import { UserProductRating } from "../../../modal/Product/ProductRating.js";
import sequelize from "../../../sequlize.js";

const purchaseHistory = async (req, res) => {
  try {
    const { user } = req.body;
    const query = `select o.order_id ,o.id, p.photo as photo, p.id as product_id , o.quantity ,o.status, p.rating,TO_CHAR(o.created_at, 'YYYY-MM-DD') as date from pankaj.order_history as o inner join pankaj.products as p on o.product_id = p.id  where user_id = :id  `;

    const purData = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { id: user.id },
      raw: true,
    });
    

    res
      .status(200)
      .json({ message: "Dat fetch successfully", purData: purData });
  } catch (error) {
    console.log(error);
  }
};

const raiting = async (req, res) => {
  const { user, orderId, rating } = req.body;

  try {
    const orderResult = await OrderHistory.findOne({
      where: { id: orderId, user_id: user.id },
      attributes: ["product_id"],
      raw: true,
    });

    if (!orderResult.product_id) {
      res.status(400).json({ message: "Error occur " });
    }

    const orderUpdateData = {
      raiting: raiting,
    };

    await OrderHistory.update(orderUpdateData, { where: { d: orderId } });

    const insertData = {
      user_id: user.id,
      product_id: orderResult.product_id,
      order_id: orderId,
      rating: rating,
    };
    await UserProductRating.create(insertData);

    const productResult = await Product.findOne({
      attributes: ["rating", "rating_count"],
      where: { id: orderResult.product_id },
    });
    const { rating: currentRating, rating_count: ratingCount } = productResult;

    const newRating =
      (currentRating * ratingCount + rating) / (ratingCount + 1);
    const newRatingCount = ratingCount + 1;

    const productUpData = { rating: newRating, rating_count: newRatingCount };

    await Product.update(productUpData, {
      where: { id: orderResult.product_id },
    });

    res.status(200).json({ message: "Rating submitted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export default { purchaseHistory, raiting };
