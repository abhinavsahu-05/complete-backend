import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // JSON Parser (डेटा को समझने के लिए)
app.use(express.urlencoded({extended: true, limit: "16kb"})) // URLencoded Parser (फॉर्म्स का डेटा संभालने के लिए)
app.use(express.static("public")) //Static Files (फाइलें, इमेजेस या पीडीएफ दिखाने के लिए)
app.use(cookieParser()) //to perform crud operation on user's cookie

//routes import
import userRouter from './routes/user.routes.js'


// routes declaration
app.use("/api/v1/users", userRouter) // http://localhost:8000/api/v1/users/register

export {app}