import React from 'react'
import ContentArea from '../../components/ContentArea';
import Box from '@mui/material/Box';


function Dashboard() {

  return (

    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea />
    </Box>
  );
}

export default Dashboard;