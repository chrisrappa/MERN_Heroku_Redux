import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Outlet 
} from 'react-router-dom';
import { AppContainer } from './styled';
import Profile from './views/Profile';
import CreateTatFlow from './views/CreateTatFlow';
import { useSelector } from 'react-redux';
import AppNavigation from './components/AppNavigation';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import Support from './views/Support';
import Landing from './views/Landing';
import Admin from './views/Admin';

function App() {

  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  const userInfo = useSelector((state) => state?.userData?.loginInfo);

  const PrivateRoutes = () => {
    if(!authCheckCompleted){
      return null;
    };

    return userInfo?.user_id && <Outlet/>;
  };

  useEffect(() => {
    setAuthCheckCompleted(true);
  }, [userInfo?.user_id]);

  console.log(
    '%c Go away, nothing to see here ;)', 
    'background: #66a18c; color: white; font-size: 20px;'
  );
  
  return (
    <Router>
      <AppNavigation />
      <AppContainer>
			  <CssBaseline />
        <Routes>
          <Route path = "/"  element = { <Landing /> } />

          <Route element  =  { <PrivateRoutes /> }>

            <Route path       = "/support"       element  = { <Support />       } />
            <Route path       = "/profile/:slug" element  = { <Profile />       } />
            <Route path       = "/app-home" element  = { <CreateTatFlow /> } />            
            <Route path       = "/admin"         element  = { <Admin /> } />            
          </Route>        
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
