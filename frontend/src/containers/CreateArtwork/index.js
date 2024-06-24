import React from 'react';
import { 
  Grid,
  Button,
  Typography,
} from '@mui/material';
import { useTheme } from '@emotion/react';


function CreateArtwork() {

  const theme = useTheme();
  
  return (
    <Grid sx={{...theme.flexBox.justifyAlignCenter, flexDirection: 'column', width: '100%'}}>
      <Grid item sx={{flex: '1', width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>

      </Grid>
      <Grid 
        item 
        sx={{
          flex: '1', 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <Button
          variant   = 'contained'
          color     = 'secondary'
          sx        = {{ width: '100%', height: '80%' }}
        >
          <Typography variant='h5' sx={{fontFamily: `${theme.typography.primary.fontFamily}`, color: `${theme.palette.whites.main}`}}>
            Run Art Generator
          </Typography>
        </Button>
      </Grid>
      <Grid container sx={{flex: '5', width: '100%', height: '100%'}}>
        
      </Grid>

    </Grid>
  )
}

export default CreateArtwork;