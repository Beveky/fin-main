const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const TodoRouter = require("./Routes/todoRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const UserRouter = require("./Routes/userRoutes");
mongoose.set("strictQuery", false);

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cookieParser());
mongoose.connect(process.env.DB_URL).then(console.log("DB Connected"));

const PORT = process.env.PORT || 4000;

app.use("/api/todos/", TodoRouter);
app.use("/api/users/", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
