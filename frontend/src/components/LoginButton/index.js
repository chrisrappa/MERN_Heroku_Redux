import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
      variant='outlined' 
      sx={{color: 'purple', borderColor: 'white'}} 
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  )
}

export default LoginButton;