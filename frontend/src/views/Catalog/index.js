import React from 'react'
import ContentArea from '../../components/ContentArea';
import SelectProduct from '../../containers/SelectProduct';
import Box from '@mui/material/Box';

function Catalog() {

  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea currentStepComponent={<SelectProduct />} />
    </Box>
  );
}

export default Catalog;