import Router from "express";
import authRoute from "../routes/authRoute/authRoute.js";
import contextRoute from "./contextRoute/contextRoute.js";
import userRoute from "./UserRoute/userRoute.js";
import adminRoute from "./Admin/AdminRoute.js";
import userProfile from "./UserProfile/UserProfile.js";

const route = Router();

route.use("/auth", authRoute);
route.use("/context", contextRoute);
route.use("/user", userRoute);
route.use("/admin", adminRoute);
route.use("/profile", userProfile);

export default route;
