import express from 'express';
import kuchbhi from './routes/kuchbhi.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI,{}).then(()=>{
    console.log("MongoDb connected");
}).catch((err)=>{
    console.error("Error connecting to MongoDb",err);
});


const app = express();

app.use(express.json());

app.listen(process.env.PORT,()=>{
    console.log(`Port Running on ${process.env.PORT}`);
})

app.use('/api',kuchbhi);
app.use("/search",kuchbhi);

app.use("/delete",kuchbhi);

app.use("/update",kuchbhi);

