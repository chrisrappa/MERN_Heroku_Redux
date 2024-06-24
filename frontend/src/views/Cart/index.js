import React from 'react'
import ContentArea from '../../components/ContentArea';
import ReviewOrder from '../../containers/ReviewOrder';
import Box from '@mui/material/Box';

function Cart() {

  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea currentStepComponent={<ReviewOrder />} />
    </Box>
  );
}

export default Cart;