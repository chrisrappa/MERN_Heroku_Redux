import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Outlet 
} from 'react-router-dom';
import { AppContainer } from './styled';
import Profile from './views/Profile';
import CreateTatFlow from './views/CreateTatFlow';
import { useDispatch, useSelector } from 'react-redux';
import AppNavigation from './components/AppNavigation';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import Support from './views/Support';
import V2Landing from './views/V2Landing';
import Admin from './views/Admin';
// import Mockup from './views/Mockup';
// import Logo from './views/Logo';
// import Placement from './views/Placement';
// import YourProducts from './views/YourProducts';
// import Catalog from './views/Catalog';



function App() {

  const dispatch = useDispatch();

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
          <Route path = "/"  element = { <V2Landing /> } />

          <Route element  =  { <PrivateRoutes /> }>

            <Route path       = "/support"       element  = { <Support />       } />
            <Route path       = "/profile/:slug" element  = { <Profile />       } />
            <Route path       = "/createTat/:id" element  = { <CreateTatFlow /> } />            
            <Route path       = "/admin"         element  = { <Admin /> } />            
          </Route>        
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
