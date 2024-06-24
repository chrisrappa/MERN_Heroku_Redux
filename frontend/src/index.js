import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { Provider as ReduxStateProvider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import store from './store';
import { SnackbarProvider } from 'notistack';
import { ToastProvider } from './libs/toast';
import { StyledMaterialDesignContent } from './styled';

const domain = "dev-q4q12mtcytgjyi8s.us.auth0.com";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={`${process.env.REACT_APP_AUTH0_DOMAIN}`}
    clientId={`${process.env.REACT_APP_AUTH0_CLIENT_ID}`}
    authorizationParams={{
      redirect_uri: window.location.origin + '/createTat/0',
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user update:current_user_metadata"
    }}
  >
    <ReduxStateProvider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider 
          maxSnack={3}
          autoHideDuration={1500}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
          }}
        >
          <ToastProvider>
            <App />
          </ToastProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ReduxStateProvider>
  </Auth0Provider>
);
