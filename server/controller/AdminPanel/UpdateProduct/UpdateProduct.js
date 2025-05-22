import { isFileExist } from "../../../helpers/helpers.js";
import { Product } from "../../../modal/Product/ProductModal.js";
import { writeFile } from "fs/promises";
import path from "path";

const UpdateProduct = async (req, res) => {
  const { payload } = req.body;

  try {
    let productdata = await Product.findOne({
      where: { id: payload.id },
      raw: true,
    });
    productdata["name"] = payload.name;
    productdata["price"] = payload.price;
    productdata["category"] = payload.category;
    productdata["description"] = payload.description;
    productdata["description"] = payload.description;
    productdata["discount"] = payload["discount"];
    if (payload.photo && payload.drg_file_data) {
      const base64Data = payload.drg_file_data.split(",")[1];
      const fileBuffer = Buffer.from(base64Data, "base64");
      isFileExist(`${process.cwd()}/${productdata.photo}`);
      const photo = `uploads/${Date.now()}${payload.photo}`;
      writeFile(path.join(process.cwd(), photo), fileBuffer)
        .then(() => console.log("--file uploaded successfully--"))
        .catch((err) => console.log("error uploading file: ", err));

      productdata["photo"] = photo;
    } else {
      productdata["photo"] = payload.photo || null;
    }
    const prdData = await Product.update(productdata, {
      where: { id: payload.id },
      raw: true,
    });

    if (!prdData) {
      return res.status(400).json({ error: "Product update errro" });
    }

     return res.status(200).json({ message:'Update sucessfully'});
  } catch (error) {
    console.log(error);
  }
};

export default UpdateProduct;
