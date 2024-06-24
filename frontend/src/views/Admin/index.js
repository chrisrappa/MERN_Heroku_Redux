import React from 'react'
import { Box } from '@mui/material'
import ContentArea from '../../components/ContentArea'
import AdminPanel from '../../containers/AdminPanel';
import { useDispatch, useSelector } from 'react-redux';

function Admin() {

  const dispatch = useDispatch();

  const allUserOrders = useSelector((state) => state?.adminData?.allUserOrders);
  
  const handleFetchOrders = () => {

  };

  const handleUpdateOrder = () => {

  };

  const handleDeactivateOrder = () => {

  };


  return (
    <Box
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea currentStepComponent={<AdminPanel ordersData={allUserOrders} />} />
    </Box>
  )
}

export default Admin