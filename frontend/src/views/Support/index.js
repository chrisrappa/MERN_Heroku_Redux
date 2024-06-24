import React from 'react'
import ContentArea from '../../components/ContentArea';
import Box from '@mui/material/Box';
import ContactSupport from '../../containers/ContactSupport';

function Support() {

  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea currentStepComponent={<ContactSupport />} />
    </Box>
  );
}

export default Support;