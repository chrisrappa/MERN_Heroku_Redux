import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Outlet 
} from 'react-router-dom';
import { AppContainer } from './styled';
import Profile from './views/Profile';
import Cart from './views/Cart';
import CreateTatFlow from './views/CreateTatFlow';
import Checkout from './views/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import AppNavigation from './components/AppNavigation';
import { CssBaseline, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { getUserStripePaymentMethods } from './actions/stripeActions';
import Landing from './views/Landing';
import { upscaleImage } from './helpers/upscaleImage';
import Support from './views/Support';
import V2Landing from './views/V2Landing';
import { getUserOrdersInfo } from './actions/orderPlacementActions';
import Admin from './views/Admin';
// import Mockup from './views/Mockup';
// import Logo from './views/Logo';
// import Placement from './views/Placement';
// import YourProducts from './views/YourProducts';
// import Catalog from './views/Catalog';



function App() {

  const dispatch = useDispatch();

  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  const stripeCustomerId = useSelector((state) => state?.userData?.loginInfo?.stripeCustomerId);
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

  // useEffect(() => {
  //   if(stripeCustomerId){
  //     dispatch(getUserStripePaymentMethods(stripeCustomerId, dispatch))
  //   }
  // }, [stripeCustomerId, dispatch]);

  useEffect(() => {
    dispatch(getUserOrdersInfo(userInfo?.user_id, dispatch));
  }, [userInfo?.user_id])

  // useMemo(() => {
  //   if(userInfo?.user_id){
  //     upscaleImage(userInfo, null, dispatch);
  //   };
  //   // eslint-disable-next-line
  // }, [userInfo?.user_id]);

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

            {/* <Route       path = "/catalog"          element  =  { <Catalog />       } /> */}
            {/* <Route exact path = "/mockup"           element  =  { <Mockup />        } /> */}
            {/* <Route exact path = "/your-products"    element  =  { <YourProducts />  } /> */}
            {/* <Route exact path = "/design/add-logo"  element  =  { <Logo />          } /> */}

            <Route path       = "/support"       element  = { <Support />       } />
            <Route path       = "/profile/:slug" element  = { <Profile />       } />
            <Route path       = "/checkout"      element  = { <Checkout />      } />
            <Route exact path = "/cart"          element  = { <Cart />          } />
            <Route path       = "/createTat/:id" element  = { <CreateTatFlow /> } />            
            <Route path       = "/admin"         element  = { <Admin /> } />            
          </Route>        
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
