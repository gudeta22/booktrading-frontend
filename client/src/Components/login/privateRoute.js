import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Dashlayout from '../Dashboard/Dashlayout';
import Createposts from './Createposts';
import Posts  from '../mainpage/Posts';

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>
      <Route index element={<Dashlayout />} />
      <Route path="create" element={<Createposts />} />
      <Route path="posts" element={<Posts />} />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
