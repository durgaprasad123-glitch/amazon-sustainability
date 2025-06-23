import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isGreen: boolean;
  weight: number;
  dimensions: string;
  organicPercentage?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  enableGroupedDelivery: boolean;
  setEnableGroupedDelivery: (enabled: boolean) => void;
  calculateEnvironmentalImpact: () => {
    plasticSaved: number;
    co2Saved: number;
    greenPoints: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [enableGroupedDelivery, setEnableGroupedDelivery] = useState(false);

  const addToCart = (product: any) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.imageUrl,
        quantity: 1,
        isGreen: product.isGreen,
        weight: product.weight,
        dimensions: product.dimensions,
        organicPercentage: product.organicPercentage
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const calculateEnvironmentalImpact = () => {
    const totalWeight = items.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
    
    // Enhanced calculation based on product properties
    let plasticSaved = 0;
    let co2Saved = 0;
    
    items.forEach(item => {
      const itemWeight = item.weight * item.quantity;
      
      if (item.isGreen) {
        // Green products save more plastic and CO2
        const organicMultiplier = item.organicPercentage ? (item.organicPercentage / 100) : 0.7;
        plasticSaved += itemWeight * 200 * organicMultiplier; // Base 200g per kg, adjusted by organic percentage
        co2Saved += itemWeight * 0.12 * organicMultiplier; // Base 0.12kg per kg, adjusted by organic percentage
      } else {
        // Standard products still save some through smart packaging
        plasticSaved += itemWeight * 50; // 50g per kg for standard products
        co2Saved += itemWeight * 0.03; // 0.03kg per kg for standard products
      }
    });
    
    // Bonus for grouped delivery
    if (enableGroupedDelivery && items.length > 1) {
      plasticSaved *= 1.2; // 20% bonus
      co2Saved *= 1.15; // 15% bonus
    }
    
    const greenPoints = Math.floor(plasticSaved / 200) + Math.floor(co2Saved / 0.5);
    
    return { plasticSaved, co2Saved, greenPoints };
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      enableGroupedDelivery,
      setEnableGroupedDelivery,
      calculateEnvironmentalImpact
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}