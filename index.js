import "dotenv";

import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send("Hi Everyone. Welcome to Prisma Express PostgreSQL Server");
});

// * Routes file
import routes from "./routes.js";
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
