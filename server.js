import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


import userRouter from './Routes/UserRoutes.js'
import headerRouter from "./Routes/HeaderRoutes.js";
import uploadRouter from "./Routes/UploadRoutes.js";


//Get .env file

dotenv.config();



//App Config

const app = express();




//Database 

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });



  //Middleware

app.use(cors());

app.use(express.json());




//API Endpoints

app.use('/api/users', userRouter);

app.use('/api/header', headerRouter);

app.use('/api/upload', uploadRouter);



//Backend Link

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
);



//Listener


const port = process.env.PORT || 5000;

app.listen(port, () => {

    console.log(`Connected on ${port}`);
    
});