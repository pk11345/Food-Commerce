import { OrderHistory } from "../../../modal/Order/OrderHistoryModal.js";
import sequelize from "../../../sequlize.js";

const orderRequest = async (req, res) => {
  try {
    const orderData = await OrderHistory.findAll({
      where: {
        status: "pending",
      },
      raw: true,
      attributes: {
        include: [
          [
            sequelize.literal(`
            (SELECT photo  FROM products WHERE id = order_history.product_id LIMIT 1)
          `),
            "photo",
          ],
          [
            sequelize.literal(`
            (SELECT name  FROM products WHERE id = order_history.product_id LIMIT 1)
          `),
            "name",
          ],
          [
            sequelize.literal(`
            (SELECT price  FROM products WHERE id = order_history.product_id LIMIT 1)
          `),
            "price",
          ],
          [
            sequelize.literal(`
            (SELECT total_amount  FROM cartamount WHERE order_id = order_history.order_id LIMIT 1)
          `),
            "totalamount",
          ],
        ],
      },
    });
    if (!orderData) {
      return res.status(400).json({ error: "Error fetching the data" });
    }

    return res
      .status(200)
      .json({ data: { orderData }, message: "Data fetch  sucessfully" });
  } catch (error) {
    return res.status(500).json({ error: "Data Base error" });
  }
};

const acceptOrder = async (req, res) => {
  const { orderId, user } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "orderId is required" });
  }

  try {
    const updateData = {
      status: "approved",
    };
    const row = await OrderHistory.update(updateData, {
      where: { order_id: orderId },
    });

    console.log(user);

    // Send email to the user notifying them about their order approval
    // await sendEmail(
    //   user.email,
    //   "Your Order Has Been Approved",
    //   `Hello ${user.fullName},<br><br>
    //         We are pleased to inform you that your order with ID ${orderId} has been approved.<br>
    //         Thank you for your purchase!<br>`
    // );

    return res
      .status(200)
      .json({ message: "Order has been approved and user notified" });
  } catch (error) {
    console.log(error);
  }
};

const cancelOrder = async (req, res) => {
  const { orderId, user } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "orderId is required" });
  }
  try {
    // Send email to the user notifying them about their order cancellation
    // await sendEmail(
    //   email,
    //   "Your Order Has Been Canceled",
    //   ` Hello ${fullName},<br><br>
    //         We regret to inform you that your order with ID ${orderId} has been canceled.<br>`
    // );

    await OrderHistory.destroy({
      where: { order_id: orderId },
    });
    return res.status(200).json({
      message: "Order has been canceled, products removed, and user notified",
    });
  } catch (error) {
    console.log(error);
  }
};

export default { orderRequest, acceptOrder, cancelOrder };
