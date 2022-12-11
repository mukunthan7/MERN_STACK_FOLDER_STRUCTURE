import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./database/mongoDb.js";
import Auth from "./routes/Auth.js";
import passport from "passport";
import Passport from "./config/passport.js";
import user from "./routes/user.js";

const PORT = 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", Auth);
app.use("/user", user);
app.use(passport.initialize());
Passport(passport);

await connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("App Running In Port http://localhost:" + PORT);
});
