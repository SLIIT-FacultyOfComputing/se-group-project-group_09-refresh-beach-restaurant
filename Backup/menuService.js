import axios from 'axios';

const API_URL = "http://localhost:8080/api/menu"; // Backend URL

export const getMenuItems = async () => {
    return await axios.get(API_URL);
};

export const createMenuItem = async (menuItem) => {
    return await axios.post(API_URL, menuItem);
};

export const updateMenuItem = async (id, menuItem) => {
    return await axios.put(`${API_URL}/${id}`, menuItem);
};

export const deleteMenuItem = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const getCartItems = async () => {
    try {
        const response = await fetch('http://localhost:8080/cart'); // Ensure this URL is correct
        const data = await response.json();
        console.log("Cart API Response:", data); // Debugging log
        return data;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return [];
    }
};


export const addToCart = async (menuItem) => {
    try {
        const response = await fetch('http://localhost:8080/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ menuItem, quantity: 1 })
        });

        const data = await response.json();
        console.log("Added to Cart:", data);
        return data;
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

export const removeFromCart = async (cartItemId) => {
    await axios.delete(`${API_URL}/remove/${cartItemId}`);
};

export const clearCart = async () => {
    await axios.delete(`${API_URL}/clear`);
};



