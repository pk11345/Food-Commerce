import { writeFile } from "fs/promises";
import path from "path";
import { Product } from "../../../modal/Product/ProductModal.js";

const newProduct = async (req, res) => {
  const { payload } = req.body;

  const productData = {};

  try {
    productData["name"] = payload.name;
    productData["price"] = payload.price;
    productData["photo"] = payload.photo;
    productData["category"] = payload.category;
    productData["description"] = payload.description;
    productData["discount"] = payload.discount;

    if (payload.photo && payload.drg_file_data) {
      const base64Data = payload.drg_file_data.split(",")[1];
      const fileBuffer = Buffer.from(base64Data, "base64");
      const photo = `uploads/${Date.now()}${payload.photo}`;
      writeFile(path.join(process.cwd(), photo), fileBuffer)
        .then(() => console.log("--file uploaded successfully--"))
        .catch((err) => console.log("error uploading file: ", err));

      productData["photo"] = photo;
    } else {
      productData["photo"] = null;
    }

    const prdData = await Product.create(productData, {
      raw: true,
    });
    if (!prdData) {
      return res.status(400).json({ error: "Error inserting the data" });
    }

    return res.status(200).json({ message: "Insert sucessfully" });
  } catch (error) {
          
    return res.status(500).json({ error: "Data Base error" });
  }
};

export default newProduct;
