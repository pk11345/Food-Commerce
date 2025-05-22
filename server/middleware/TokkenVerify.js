import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtVerify = async (req, res, next) => {
  const authHeader = req.headers.authorization?.split(" ")[1];

  if (!authHeader) {
    return res.status(400).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res
        .status(402)
        .json({ message: "Session expired Please Login again" });
    } else {
      return res.status(403).json({ message: "Invalid token" });
    }
  }
};

export default jwtVerify;
