import React, { useEffect, useState } from 'react';
import { getCartItems } from './menuService';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        console.log("Fetching cart items...");
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const items = await getCartItems();
            console.log("Cart API Response:", items);  // Check API response
            setCartItems(items);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : (
                cartItems.map((item, index) => (
                    <div key={index}>
                        <p>{item.menuItem?.name} - {item.quantity}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
