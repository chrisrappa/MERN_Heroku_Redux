import React from 'react'
import ContentArea from '../../components/ContentArea';
import Box from '@mui/material/Box';
import ImagePlacementEditor from '../../containers/ImagePlacementEditor';

function Placement() {

  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ContentArea currentStepComponent={<ImagePlacementEditor />} />
    </Box>
  );
}

export default Placement;