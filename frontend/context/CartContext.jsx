import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('boutique_cart');
    if (!savedCart) return [];
    try {
      const items = JSON.parse(savedCart);
      // Filter out any duplicates that might have been saved during the bug
      return items.filter((item, index, self) => 
        index === self.findIndex((t) => t.cartId === item.cartId)
      );
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('boutique_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, qty = 1) => {
    setCartItems(prev => {
      const productId = product._id || product.id;
      const existingItemIndex = prev.findIndex(item => (item._id === productId || item.id === productId) && item.size === size);
      
      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].qty += qty;
        return updated;
      }
      return [...prev, { ...product, size, qty, cartId: `${productId}-${size}` }];
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

 const cartCount = cartItems.reduce(
  (total, item) => total + item.qty,
  0
);

  const cartTotal = cartItems.reduce((total, item) => {
    // Sanitize price: remove commas, "ETB", spaces, etc.
    const cleanPrice = typeof item.price === 'string' 
      ? item.price.replace(/[^0-9.]/g, '') 
      : item.price;
    return total + (Number(cleanPrice) || 0) * item.qty;
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
