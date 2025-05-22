import sequelize from "../../../sequlize.js";

const orederInfo = async (req, res) => {
  const { user } = req.body;
  if (!user) {
    console.log("No user Id availabe");
  }

  try {
    const orderInfo = await sequelize.query(
      ` SELECT o.order_id, o.user_id, o.product_id, o.quantity, p.photo AS photo, p.name, p.price, c.total_amount
      FROM pankaj.order_history o
      JOIN pankaj.products p ON o.product_id = p.id
      JOIN pankaj.cartamount c ON o.order_id = c.order_id
      WHERE o.user_id = :id AND o.status = 'pending'`,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { id: user.id },
        raw: true,
      }
    );

    console.log(orderInfo);

    res.status(200).json({ data: orderInfo });
  } catch (error) {
    console.log(error);
  }
};

const orderDel = async (req, res) => {};

export default { orederInfo, orderDel };
