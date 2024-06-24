import React from 'react'
import ContentArea from '../../components/ContentArea';
import ProductTemplates from '../../containers/ProductTemplates';
import Box from '@mui/material/Box';

function YourProducts() {

  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea currentStepComponent={<ProductTemplates />} />
    </Box>
  );
}

export default YourProducts;