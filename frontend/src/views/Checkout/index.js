import React from 'react'
import ContentArea from '../../components/ContentArea';
import Box from '@mui/material/Box';
import PaymentAndShipping from '../../containers/PaymentAndShipping';


function Checkout() {

  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea currentStepComponent={<PaymentAndShipping />}/>
    </Box>
  );
}

export default Checkout;