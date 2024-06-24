import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { 
  AvatarContainer               , 
  CustomTabsComponent           , 
  MainContentArea               ,   
  MainContentAreaChildGrid,   
  TabPanelChildrenContainer     , 
  TabsAndPanelsParentBox 
} from './styled';
import { 
  Avatar        , 
  Container     ,  
  Tab           , 
  Typography 
} from '@mui/material';
import { 
  deleteArtworkFromUser , 
  deleteCardInfo        , 
  deleteShippingInfo    , 
} from '../../actions/userActions';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../libs/toast';
import SavedArtworkList from './TabPanels/SavedArtworkList';
import ActiveOrders from './TabPanels/ActiveOrders';
// import PaymentMethods from './TabPanels/PaymentMethods';
import ShippingMethods from './TabPanels/ShippingMethods';
import ProfileDetails from './TabPanels/ProfileDetails';
// import { checkOrderStatus } from '../../actions/printfulActions';
// import CompletedOrders from './TabPanels/CompletedOrders';


function UserProfile() {

  const theme    = useTheme()   ;
  const toast    = useToast()   ;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo        = useSelector((state) => state.userData.loginInfo);
  const userOrdersInfo  = useSelector((state) => state?.userData?.ordersInfo);

  const userId = userInfo?.user_id;
  
  const [value, setValue]                         = useState(0)     ;
  const [addUpdateShipping, setAddUpdateShipping] = useState(false) ;
  // const [membershipOptions, setMembershipOptions] = useState([])    ;
  // const [membershipPrices, setMembershipPrices]   = useState()      ;
  
  const activeOrders = userOrdersInfo?.filter((order) => 
    order?.isDelivered === false
  );

  const sortedActiveOrders = activeOrders?.sort((a, b) => {
    const dateA = new Date(a?.createdAt);
    const dateB = new Date(b?.createdAt);
    return dateB - dateA;
  });

  const handleDeleteArtwork = (artwork) => {
    dispatch(
      deleteArtworkFromUser(userId, artwork?._id, dispatch)
    )
    .then((response) => {
      if(response === 200){
        toast.success('Artwork Deleted!');
      } else {
        toast.error(response);
      }
    })
  };

  const handleDeleteShippingAddress = (addressId) => {
    dispatch(deleteShippingInfo(userId, addressId))
    .then((response) => {
      if(response === 200){
        toast.success('Shipping Method Deleted!');
      } else {
        toast.error(response);
      }
    })
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch(newValue){
      case 0: 
        navigate('/profile/info')         ;
      break;
      case 1: 
        navigate('/profile/track-orders') ;
      break;
      case 2: 
        navigate('/profile/payments')     ;
      break;
      case 3: 
        navigate('/profile/shipping')     ;
      break;
      // case 4: 
      //   navigate('/profile/past-orders')  ;
      // break;
      // case 5: 
      //   navigate('/profile/saved-artwork');
      // break;
      default: return;
    }
  };

  useMemo(() => {
    switch(window.location.pathname){
      case '/profile/info': 
        setValue(0);
      break;
      case '/profile/track-orders':
        setValue(1);
      break;
      // case '/profile/payments': 
      //   setValue(2);
      // break;
      case '/profile/shipping': 
        setValue(2);
      break;
      // case '/profile/saved-artwork':
      //   setValue(3);
      // break;
      default: return;
    };

  // eslint-disable-next-line
  }, [window.location.pathname]);

  // useEffect(() => {
  //   getMembershipPrices();
  // }, []);

  // useMemo(() => {
  //   dispatch(checkOrderStatus(userOrdersInfo, dispatch));
    
  //   // eslint-disable-next-line
  // }, [userInfo?.user_id]);

  const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <Container
        sx={{
          overflow: 'scroll', 
          backgroundColor: `${theme.palette.whites.main}`,
          display: (value !== index) && 'none',
          height: '100%',
        }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{height: '100%'}} >
            <TabPanelChildrenContainer>{children}</TabPanelChildrenContainer>
          </Box>
        )}
      </Container>
    );
  };

  return (
    <MainContentArea elevation={0}>
      <MainContentAreaChildGrid container >
        <AvatarContainer container>
          <Avatar sx={{margin: '1rem'}} alt={userInfo?.name} src={userInfo?.picture} />
          <Typography>{userInfo?.name}</Typography>
        </AvatarContainer>
        <TabsAndPanelsParentBox>
          <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <CustomTabsComponent 
              variant       = "scrollable" 
              scrollButtons = "auto" 
              value         = {value} 
              onChange      = {handleChange} 
              aria-label    = "basic tabs example"
              allowScrollButtonsMobile
            >
              <Tab label  = "Profile Info"         />
              <Tab label  = "Track Orders"         />
              {/* <Tab label  = "Payment Methods"      /> */}
              <Tab label  = "Shipping Addresses"   />
              {/* <Tab label  = "Saved Tattoos"        /> */}
            </CustomTabsComponent>
          </Box>
          <CustomTabPanel value={value} index={0} sx={{width: '100%', padding: '0'}}>
            <ProfileDetails
              userInfo={userInfo}
              // membershipPrices={membershipPrices}
              // membershipOptions={membershipOptions}
            />
          </CustomTabPanel>
          <CustomTabPanel 
            value={value} 
            index={1} 
            sx={{
              display: value === 1 ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ActiveOrders sortedActiveOrders={sortedActiveOrders} /> 
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={2} >
            <PaymentMethods
              addUpdatePayment={addUpdatePayment}
              userInfo={userInfo}
              setAddUpdatePayment={setAddUpdatePayment}
              handleDeletePaymentMethod={handleDeletePaymentMethod}
            />
          </CustomTabPanel> */}
          <CustomTabPanel value={value} index={2}>
            <ShippingMethods
              addUpdateShipping={addUpdateShipping}
              userInfo={userInfo}
              setAddUpdateShipping={setAddUpdateShipping}
              handleDeleteShippingAddress={handleDeleteShippingAddress}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <SavedArtworkList 
              userInfo={userInfo} 
              handleDeleteArtwork={handleDeleteArtwork} 
            />
          </CustomTabPanel>
        </TabsAndPanelsParentBox>
      </MainContentAreaChildGrid>
    </MainContentArea>
  );
}

export default UserProfile;