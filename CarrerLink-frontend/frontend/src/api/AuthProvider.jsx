// AuthProvider.js
import React, { createContext, useState, useCallback, useEffect } from 'react';
import axiosInstance from './AxiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize token from localStorage.
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  // Logout function to remove token and perform cleanup.
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  // Setup axios interceptors.
  useEffect(() => {

    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
          window.location.href = '/student-auth';
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when token or logout changes.
    return () => {
      // axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
