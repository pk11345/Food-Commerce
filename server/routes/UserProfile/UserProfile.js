import Router from "express";
import multer from "multer";
import userProfileInfo from "../../controller/UserProfile/UserProfileInfo.js";
import updateProfile from "../../controller/UserProfile/UpdateUserProfile.js";
import ResetPassword from "../../controller/UserProfile/ResetPassword.js";

const userProfile = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

userProfile.get("/userInfo/:id", userProfileInfo);
userProfile.put("/update-profile", upload.single("image"), updateProfile);
userProfile.get("/generate-otp/:id", ResetPassword.generateOtp);
userProfile.put("/resert-password", ResetPassword.resetPassword);

export default userProfile;
