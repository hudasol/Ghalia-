import React, { createContext, useState, useContext, useEffect } from 'react';
import { ghalia as ghaliaClient } from '@/api/ghaliaClient';
import { appParams } from '@/lib/app-params';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null); // Contains only { id, public_settings }

  useEffect(() => {
    checkAppState();
  }, []);


  const checkAppState = async () => {
  try {
    setIsLoadingPublicSettings(true);
    
    // We bypass the external API check to make the app "independent"
    setAppPublicSettings({ 
      id: 'ghalia_v1', 
      name: 'Ghalia Luxury Scenting',
      status: 'active' 
    });

    // Directly move to checking the local "User"
    await checkUserAuth();
    
    setIsLoadingPublicSettings(false);
  } catch (error) {
    console.error('Ghalia initialization failed:', error);
    setAuthError({ type: 'unknown', message: 'Failed to initialize Ghalia.' });
    setIsLoadingPublicSettings(false);
    setIsLoadingAuth(false);
  }
};



  const checkUserAuth = async () => {
    try {
      // Now check if the user is authenticated
      setIsLoadingAuth(true);
      const currentUser = await ghaliaClient.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
      setAuthChecked(true);
    } catch (error) {
      console.error('User auth check failed:', error);
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      setAuthChecked(true);
      
      // If user auth fails, it might be an expired token
      if (error.status === 401 || error.status === 403) {
        setAuthError({
          type: 'auth_required',
          message: 'Authentication required'
        });
      }
    }
  };

  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    
    if (shouldRedirect) {
      // Use the SDK's logout method which handles token cleanup and redirect
      ghaliaClient.auth.logout();
    } else {
      // Just remove the token without redirect
      ghaliaClient.auth.logout();
    }
  };

  const navigateToLogin = () => {
    // Use the SDK's redirectToLogin method
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
