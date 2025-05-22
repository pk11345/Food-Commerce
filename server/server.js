import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import sequelize from "./sequlize.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", route);

await sequelize
  .authenticate()
  .then(() => {
    console.log("db connected");
    app.listen(8000, "0.0.0.0", () => {
      console.log("server started at 8000");
    });
  })
  .catch((error) => console.log(error));
