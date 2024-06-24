import React from 'react'
import ContentArea from '../../components/ContentArea';
import Box from '@mui/material/Box';
import ReviewOrder from '../../containers/ReviewOrder';


function Mockup() {

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

export default Mockup;