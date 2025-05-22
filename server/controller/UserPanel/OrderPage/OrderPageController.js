import { CartAmount } from "../../../modal/Cart/CartAmountModal.js";
import { Cart } from "../../../modal/Cart/CartModal.js";
import { OrderHistory } from "../../../modal/Order/OrderHistoryModal.js";
import sequelize from "../../../sequlize.js";

function generateRandomOrderId() {
  return Math.floor(Math.random() * 1000000); // Example: Generates a random number between 0 and 999999
}

const orderPage = async (req, res, next) => {
  const { user, totalAmount } = req.body;
  const uniqueOrderId = generateRandomOrderId();
  const t = await sequelize.transaction();

  try {
    const cartItems = await sequelize.query(
      `SELECT cart.id, cart.product_id, cart.quantity, products.name as product_name, products.price
       FROM pankaj.cart cart
       JOIN pankaj.products products ON cart.product_id = products.id
       WHERE cart.user_id = :id`,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { id: user.id },
        raw: true,
      }
    );

    if (cartItems.length === 0) {
      throw new Error("No items in the cart");
    }

    for (let i = 0; i < cartItems.length; i++) {
      const order = {
        order_id: uniqueOrderId,
        user_id: user.id,
        quantity: cartItems[i].quantity,
        status: "pending",
        created_at: new Date(),
        product_id: cartItems[i].product_id,
      };

      const ord = await OrderHistory.create(order, { transaction: t });
      if (!ord) {
        throw new Error("Error inserting order data");
      }
    }

    const cartData = {
      order_id: uniqueOrderId,
      total_amount: totalAmount,
    };
    const cart = await CartAmount.create(cartData, { transaction: t });
    if (!cart) {
      throw new Error("Error inserting cart data");
    }

    await Cart.destroy({
      where: { user_id: user.id },
      transaction: t,
    });

    await t.commit();

    res
      .status(200)
      .json({ message: "Order placed successfully", orderId: uniqueOrderId });
  } catch (error) {
    await t.rollback();
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default orderPage;
