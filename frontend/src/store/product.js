import { create } from 'zustand';

export const useProductStore = create((set) => ({
    // setting the hook
    products: [],
    setProducts: (products) => set({ products }),
    // posting the product data to the backend
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: 'All fields are required' };
        }
        const res = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: 'Product created successfully' };
    },
    // fetching the product data from the backend
    fetchProducts: async () => {
        const res = await fetch('http://localhost:3000/products');
        const data = await res.json();
        set({ products: data.data });
    },
    // deleting the product from the database
    deleteProduct: async (productId) =>{
        const res = await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if(!data.success){
            return { success: false, message: 'Something went wrong'}
        }
        // immediately updating the the ui after deleting the product
        set(state => ({ products: state.products.filter((product) => product._id !== productId) }));
        return { success: true, message: 'Product deleted successfully' };
    },
    // updating a product
    updateProduct: async (updatedProduct) =>{
        if(!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            return { success: false, message: 'All fields are required' };
        }
        const res = await fetch(`http://localhost:3000/products/${updatedProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        console.log(data)
        if (!data.success) return { success: false, message: 'Server Error' };
        // immediately updating the the ui after updating the product without refresh
        set((state) => ({
            products: state.products.map((p) => (p._id === updatedProduct._id ? data.data:p))
        }));
        return { success: true, message: 'Product updated successfully' };
    },
})); 