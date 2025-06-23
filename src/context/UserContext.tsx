import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  greenPoints: number;
  badges: string[];
  totalPlasticSaved: number;
  totalCO2Saved: number;
  ordersCount: number;
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  addGreenPoints: (points: number) => void;
  spendGreenPoints: (points: number) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  greenPoints: 45,
  badges: ['Eco Starter', 'Green Warrior'],
  totalPlasticSaved: 1250,
  totalCO2Saved: 3.5,
  ordersCount: 23
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addGreenPoints = (points: number) => {
    setUser(prev => ({ ...prev, greenPoints: prev.greenPoints + points }));
  };

  const spendGreenPoints = (points: number): boolean => {
    if (user.greenPoints >= points) {
      setUser(prev => ({ ...prev, greenPoints: prev.greenPoints - points }));
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addGreenPoints, spendGreenPoints }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}