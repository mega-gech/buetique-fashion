import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('boutique_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('boutique_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, qty = 1) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id && item.size === size);
      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].qty += qty;
        return updated;
      }
      return [...prev, { ...product, size, qty, cartId: `${product.id}-${size}` }];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.qty + change;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  
  // Parse numeric value from price string (e.g., '12,500 ETB' -> 12500)
  const cartTotal = cartItems.reduce((total, item) => {
    const priceNum = parseInt(item.price.replace(/,/g, '').replace(' ETB', ''));
    return total + (priceNum * item.qty);
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
