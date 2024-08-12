// src/GoogleAuthProvider.js
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuthProvider = ({ children }) => {
  const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual client ID

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
