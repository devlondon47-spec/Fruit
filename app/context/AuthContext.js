'use client';
import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const AuthContext = createContext(null);

function authReducer(state, action) {
  switch (action.type) {
    case 'LOAD': return action.payload;
    case 'LOGIN': return action.user;
    case 'LOGOUT': return null;
    default: return state;
  }
}

export function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(authReducer, null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fr_user');
      if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
    } catch {}
    setIsLoaded(true);
  }, []);

  const login = (userData) => {
    localStorage.setItem('fr_user', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', user: userData });
  };

  const logout = () => {
    localStorage.removeItem('fr_user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ user, isLoaded, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
