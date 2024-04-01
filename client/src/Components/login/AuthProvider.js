// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post('http://localhost:4002/api/auth/login', { email, password });
//       setUser(response.data.user);
//       localStorage.setItem('isAuthenticated', 'true');
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('isAuthenticated');
//   };

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const isAuthenticated = localStorage.getItem('isAuthenticated');
//       if (isAuthenticated === 'true') {
//         try {
//           const response = await axios.get('http://localhost:4002/api/auth/user');
//           setUser(response.data.user);
//         } catch (error) {
//           console.error('Fetch user failed:', error);
//           logout();
//         }
//       }
//       setLoading(false);
//     };

//     checkAuthentication();
//   }, []);

//   const isAuthenticated = user !== null;

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
