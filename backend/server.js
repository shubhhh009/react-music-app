import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import adminRuoter from "./routes/adminRoutes.js";
import path from "path";

dotenv.config();
connectDB(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/uploads',express.static(path.join(path.resolve(),'uploads')))


app.use('/api/admin',adminRuoter)

app.listen(PORT, () => {
  console.log(`Server connected at the PORT ${PORT}`);
});

