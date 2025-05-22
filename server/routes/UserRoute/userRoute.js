import Router from "express";
import multer from "multer";
import ProductCard from "../../controller/UserPanel/ProductCard/ProductCardController.js";
import ProductAdd from "../../controller/UserPanel/ProductAdd/ProductAddController.js";
import CartCount from "../../controller/UserPanel/CartCount/CartCount.js";
import Cart from "../../controller/UserPanel/CartInfo/CartInfoCOntroller.js";
import orderPage from "../../controller/UserPanel/OrderPage/OrderPageController.js";
import OrderInfo from "../../controller/UserPanel/OrderCard/orderInfoController.js";
import PurchaseHistory from "../../controller/UserPanel/PurchaseHistory/PurchaseHistoryController.js";

const userRoute = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

userRoute.get("/card", ProductCard);
userRoute.post("/card-add", ProductAdd);
userRoute.post("/cart-count", CartCount);
userRoute.get("/cart-info/:id", Cart.CartInfo);
userRoute.post("/cart/increment", Cart.prdAdd);
userRoute.post("/cart/decrement", Cart.prdSub);
userRoute.post("/orderpage", orderPage);
userRoute.post("/order-info", OrderInfo.orederInfo);
userRoute.post("/purchase-history", PurchaseHistory.purchaseHistory);
userRoute.post("/submit-rating", PurchaseHistory.raiting);

export default userRoute;
