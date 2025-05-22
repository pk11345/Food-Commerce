import { Cart } from "../../../modal/Cart/CartModal.js";
import sequelize from "../../../sequlize.js";

const CartInfo = async (req, res) => {
  const { id } = req.params;

  const cartInfo = await sequelize.query(
    `SELECT p.photo, c.quantity, p.price, p.discount ,p.id,p.name
FROM pankaj.products AS p 
INNER JOIN pankaj.cart AS c 
ON p.id = c.product_id 
WHERE c.quantity > 0
AND c.user_id = :id
    `,
    {
      type: sequelize.QueryTypes.SELECT,
      replacements: {
        id: id,
      },
    }
  );

  if (!cartInfo) {
    return res.status(400).json({ error: "No data" });
  } else {
    return res.status(200).json({ cartInfo });
  }
};

const prdAdd = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing userId or productId" });
  }

  const [rowsUpdated] = await Cart.increment(
    { quantity: 1 },
    {
      where: {
        user_id: userId,
        product_id: productId,
      },
      returning: true,
      raw: true,
    }
  );

  if (rowsUpdated) {
    return res.status(200).json({ message: "Increase successfully" });
  }
};

const prdSub = async (req, res) => {
    const { userId, productId } = req.body;
    

  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing userId or productId" });
  }

  const [rowsUpdated] = await Cart.decrement(
    { quantity: 1 },
    {
      where: {
        user_id: userId,
        product_id: productId,
      },
      returning: true,
      raw: true,
    }
  );

  if (rowsUpdated) {
    return res.status(200).json({ message: "Decrease successfully" });
  }
};

export default { CartInfo, prdAdd, prdSub };
