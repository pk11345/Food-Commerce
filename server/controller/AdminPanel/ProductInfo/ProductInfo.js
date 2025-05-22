import { Product } from "../../../modal/Product/ProductModal.js";

const ProductInfo = async (req, res) => {
  
  const { id } = req.params;

  try {
    const prd_data = await Product.findOne({
      where: { id: id },
      raw: true,
    });

    if (prd_data) {
      return res.status(200).json(prd_data);
    }
  } catch (error) {
    return res.status(400).json({ error: "AN occur" });
  }
};

export default ProductInfo;
