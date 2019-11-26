const express = require("express");
const app = express();
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
// const commentRouter = require("./routes/comments");
const cors = require("cors");
const db = require("./config");

// Middlewares
app.use(cors());
app.use(express.json());

db.connect(err => {
  if (err) throw new Error("Something went wrong");
  console.log("Database connection established");
});

// Routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
// app.use("/comments", commentRouter);

// Creating server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
