import { Product } from "../../../modal/Product/ProductModal.js";

const productDelete = async (req, res) => {
  const { id } = req.params;

  const prDel = await Product.destroy({
    where: { id: payload.id },
    raw: true,
  });

  if (!prDel) {
    return res.status(400).json({ error: "Error delete the product" });
  }

  return res.status(200).json({ message: "Delete sucessfully" });
};

export default productDelete;
