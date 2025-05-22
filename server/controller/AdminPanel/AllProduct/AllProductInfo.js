import { Product } from "../../../modal/Product/ProductModal.js";

const AllProductInfo = async (req, res) => {
  try {
    const prddata = await Product.findAll({
      raw: true,
    });

    if (prddata) {
      return res.status(200).json({ data: prddata });
    }
  } catch (error) {
    return res.status(400).json({ error: "Data base error" });
  }
};

export default AllProductInfo;
