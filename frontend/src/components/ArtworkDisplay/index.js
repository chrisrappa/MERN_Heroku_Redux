import React from 'react'
import { 
  Button, 
  Fade,
  Grid, 
  IconButton, 
  Typography, 
  useTheme 
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { FocusedWorkContainer } from './styled';

function ArtworkDisplay({ 
  imageData, 
  // onRefresh, 
  generationProps,
  onZoom, 
  onSelect,
}) {

  const theme = useTheme();

  return (
    <Fade in>
      <FocusedWorkContainer item>
        <img 
          src={imageData} 
          alt="Generation" 
          style={{ maxWidth: '100%', height: '100%', padding: '0.25rem', position: 'relative'}}
        />
        <Grid container sx={{ position: 'absolute', display: 'flex', justifyContent: 'space-between', top: '0', padding: '1rem 0.5rem', width: '100%' }}>
          {/* <Grid item>
            <IconButton sx={{backgroundColor: 'white', border: `1px solid ${theme.palette.secondary.main}`}} onClick={() => onRefresh(imageData)}>
              <RefreshIcon color='secondary' />
            </IconButton>
          </Grid> */}
          <Grid item>
            <IconButton sx={{backgroundColor: 'white',  border: `1px solid ${theme.palette.secondary.main}`}} onClick={() => onZoom(imageData)}>
              <ZoomInIcon color='secondary' />
            </IconButton>
          </Grid>
          <Grid item>
            <Button variant='contained' color='secondary' onClick={() => onSelect(imageData)} sx={{borderRadius: '2rem', border: '1px solid white', color: 'white'}}>
              <Typography variant='body1'>
                Select
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </FocusedWorkContainer>
    </Fade>
  )
}

export default ArtworkDisplay;