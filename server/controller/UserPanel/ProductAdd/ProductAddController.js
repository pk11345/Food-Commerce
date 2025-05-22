import { Cart } from "../../../modal/Cart/CartModal.js";

const ProductAdd = async (req, res) => {
  const { userId, pid, quantity } = req.body;

  const checkPd = await Cart.findOne({
    where: {
      product_id: pid,
    },
    raw: true,
  });

  if (!checkPd) {
    const payload = {
      user_id: userId,
      product_id: pid,
      quantity: quantity,
    };
    const ct = await Cart.create(payload, {
      raw: true,
    });
  } else {
    const payload = {
      quantity: checkPd.quantity + 1,
    };

    await Cart.update(payload, {
      where: { product_id: checkPd.product_id },
      raw: true,
    });
  }
};

export default ProductAdd;
