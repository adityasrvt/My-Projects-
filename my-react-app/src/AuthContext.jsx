import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (username, password) => {
    // Simple demo authentication - in real app, validate against backend
    if (username && password) {
      const userData = {
        username,
        email: `${username}@example.com`,
        addresses: [],
        paymentMethods: []
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const signup = (username, email, password) => {
    if (username && email && password) {
      const userData = {
        username,
        email,
        addresses: [],
        paymentMethods: []
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cart");
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addAddress = (address) => {
    setUser(prev => ({
      ...prev,
      addresses: [...(prev.addresses || []), { ...address, id: Date.now() }]
    }));
  };

  const removeAddress = (id) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== id)
    }));
  };

  const addPaymentMethod = (payment) => {
    setUser(prev => ({
      ...prev,
      paymentMethods: [...(prev.paymentMethods || []), { ...payment, id: Date.now() }]
    }));
  };

  const removePaymentMethod = (id) => {
    setUser(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(pm => pm.id !== id)
    }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      updateProfile,
      addAddress,
      removeAddress,
      addPaymentMethod,
      removePaymentMethod
    }}>
      {children}
    </AuthContext.Provider>
  );
};
