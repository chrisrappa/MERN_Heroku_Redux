import { Avatar, Box, Container, Tab, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useToast } from '../../libs/toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  AvatarContainer               , 
  CustomTabsComponent           , 
  MainContentArea               ,   
  MainContentAreaChildGrid,   
  TabPanelChildrenContainer     , 
  TabsAndPanelsParentBox 
} from './styled';
import CustomerOrders from './TabPanels/CustomerOrders';
import AdminSettings from './TabPanels/AdminSettings';

function AdminPanel({ ordersData }) {

  const theme    = useTheme()   ;
  const toast    = useToast()   ;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue]                         = useState(0)     ;

  const userInfo = useSelector((state) => state.userData.loginInfo);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
              <Tab label  = "Admin Settings"          />
              <Tab label  = "Customer Orders"         />
            </CustomTabsComponent>
          </Box>
          <CustomTabPanel value={value} index={0} sx={{width: '100%', padding: '0'}}>
            <AdminSettings />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1} sx={{width: '100%', padding: '0'}}>
            <CustomerOrders ordersData={ordersData} />
          </CustomTabPanel>
        </TabsAndPanelsParentBox>
      </MainContentAreaChildGrid>
    </MainContentArea>
  )
}

export default AdminPanel