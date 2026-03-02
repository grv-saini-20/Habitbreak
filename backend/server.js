import  express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";

dotenv.config();
connectDb();

const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;