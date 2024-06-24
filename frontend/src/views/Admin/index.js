import { Box, Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ContentArea from '../../components/ContentArea'
import AdminPanel from '../../containers/AdminPanel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserOrders } from '../../actions/adminActions';

function Admin() {

  const dispatch = useDispatch();

  const allUserOrders = useSelector((state) => state?.adminData?.allUserOrders);

  console.log('all user orders', allUserOrders)

  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    dispatch(getAllUserOrders(null, dispatch));
  }, [])
  

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