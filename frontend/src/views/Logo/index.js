import React from 'react'
import ContentArea from '../../components/ContentArea';
import AddLogo from '../../containers/AddLogo';
import Box from '@mui/material/Box';

function Logo() {

  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea currentStepComponent={<AddLogo />} />
    </Box>
  );
}

export default Logo;