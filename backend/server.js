import express from 'express';
import path from 'path';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';


const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); //allows to use json data in the body
app.use(cors()); //allows to make request from different origin
app.use("/products", productRoutes);  

//production configuration to run the frontend with the backend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}    

//start the server
app.listen(PORT,()=>{
    connectDB();
    console.log(`server started at port: ${PORT}`)
});