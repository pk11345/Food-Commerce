import { Product } from "../../../modal/Product/ProductModal.js";

const ProductCard = async (req, res) => {
  try {
    const productData = await Product.findAll({
      raw: true,
    });

    if (!productData) {
      return res.status(400).json({ error: "No data" });
    } else {
      return res.status(200).json({ productData });
    }
  } catch (error) {
    console.log(error);
  }

  //     if (err) {
  //       console.error({ err: "Database Error" });
  //       return res.status(400).json("Error due to database");
  //     }

  //     if (data.rows.length > 0) {
  //       return res.json(data.rows);
  //     } else {
  //       return res.json({ err: "No data found" });
  //     }
  //   });
};

export default ProductCard;
