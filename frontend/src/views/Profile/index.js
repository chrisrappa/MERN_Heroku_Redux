import React from 'react'
import ContentArea from '../../components/ContentArea';
import Box from '@mui/material/Box';
import UserProfile from '../../containers/UserProfile';


function Profile() {

  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea currentStepComponent={<UserProfile />} />
    </Box>
  );
}

export default Profile;