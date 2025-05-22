import Router from "express";
import multer from "multer";
import AllProductInfo from "../../controller/AdminPanel/AllProduct/AllProductInfo.js";
import Rating from "../../controller/AdminPanel/Rating/Rating.js";
import ProductInfo from "../../controller/AdminPanel/ProductInfo/ProductInfo.js";
import UpdateProduct from "../../controller/AdminPanel/UpdateProduct/UpdateProduct.js";
import productDelete from "../../controller/AdminPanel/ProductDelete/ProductDelete.js";
import newProduct from "../../controller/AdminPanel/NewProduct/NewProduct.js";
import Order from "../../controller/AdminPanel/AllOrder/AllOrder.js";
import User from "../../controller/AdminPanel/UserRequest/UserRequest.js";

const adminRoute = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

adminRoute.post("/new-product", newProduct);
adminRoute.get("/allproduct", AllProductInfo);
adminRoute.get("/raiting/:id", Rating);
adminRoute.get("/productinfo/:id", ProductInfo);
adminRoute.put("/update-product", UpdateProduct);
adminRoute.delete("/deleteproduct/:id", productDelete);
adminRoute.get("/all-order-request", Order.orderRequest);
adminRoute.post("/accept-order", Order.acceptOrder);
adminRoute.post("/cancel-order", Order.cancelOrder);
adminRoute.get("/not-appoved", User.UsersNotApproved);
adminRoute.put("/accept-user", User.UserAccept);
adminRoute.delete("/cancel-user/:id", User.UserCacncel);

export default adminRoute;
