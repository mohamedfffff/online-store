import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);//return all products
router.post('/', createProduct);//create a product
router.delete('/:id', deleteProduct);//delete a product
router.put('/:id', updateProduct);//update a product

export default router;