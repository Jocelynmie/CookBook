import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/connect.js";
import recipeRouter from "./routes/recipeRouter.js";
import mealplanRouter from "./routes/mealplanRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   next();
// });

app.use("/api", recipeRouter);
app.use("/api", mealplanRouter);

app.get("/", (req, res) => {
  res.send({
    message: "hello",
  });
});

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error("error", error);
    process.exit(1);
  }
}

startServer();
