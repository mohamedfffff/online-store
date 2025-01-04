import Product from '../models/product.model.js';
import mongoose from 'mongoose';

//get all products
export const getProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log(`error in fetching products : ${error.message}`);
        res.status(404).json({success: false, message: "no products found"});
    }
};

//create a product
export const createProduct = async(req, res) => {
    const product = req.body;
    //check to see if any filed is empty
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "you need to fill all fields"});
    }
    //saving the product to the database using the Product model
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, message: "product created successfully", data: newProduct})
    } catch (error) {
        console.log(`error in creating product : ${error.message}`)
        return res.status(500).json({success: false, message: "something went wrong"});
    }
}

//delete a product
export const deleteProduct = async(req, res) => {
    const { id } = req.params;
    // check if the id is valid
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "product deleted successfully"});
    } catch (error) {
        console.log(`error in deleting product : ${error.message}`);
        return res.status(404).json({success: false, message: "user not found"});
    }
}

//update a product
export const updateProduct = async(req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    //check to see if any filed is empty
    if(!updatedProduct.name || !updatedProduct.price || !updatedProduct.image){
        return res.status(400).json({success: false, message: "you need to fill all fields"});
    }
    // check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "invalid product id"});
    }
    try {
        await Product.findByIdAndUpdate(id, updatedProduct, {new: true});
        res.status(200).json({success: true, message: "product updated successfully", data: updatedProduct});
    } catch (error) {
        console.log(`error in updating product : ${error.message}`);
        return res.status(404).json({success: false, message: "product not found"});
    }
}