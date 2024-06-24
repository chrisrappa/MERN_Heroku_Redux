import React, { useMemo } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  AppBar,
  Toolbar,
  Button,
  useMediaQuery
} from '@mui/material';
import { 
  FeatureContainerBox,
  FeaturePaper, 
  HeroBox, 
  HeroGridContainer, 
  HeroGridItem, 
  HeroSplashTypography, 
  HeroTypography, 
  InnerBox, 
  InnerVideoBox, 
  TitleTypography, 
  VideoBox 
} from './styled';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


function Landing() {

  const { loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();

	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useMemo(() => {
    if(user){
      navigate('/createTat/0')
    }
  }, [user, navigate]);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100dvh', maxHeight: '-webkit-fill-available', maxWidth: '-webkit-fill-available' }}>
      <AppBar position="fixed" open={true}>
        <Toolbar
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            width: '100%'
          }}
        >
          <TitleTypography variant="h6" sx={{marginLeft: '1rem'}}>
            Your Merch A.I.
          </TitleTypography>
          <Grid>
            <Button 
              color='secondary' 
              sx={{marginRight: '1rem'}}
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* Rest of the page */}
      <Box sx={{ flex: '1 1 auto', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* First Section */}
        <HeroBox>
          <HeroGridContainer>
            <HeroSplashTypography variant='h1'>Your</HeroSplashTypography>
            <HeroGridItem>
              <HeroTypography variant='h4'>Custom A.I. Artwork</HeroTypography>
              <HeroTypography variant='h4'>Logo</HeroTypography>
              <HeroTypography variant='h4'>Merch</HeroTypography>
              <HeroTypography color='secondary' variant='h3'>Delivered</HeroTypography>
              <Button 
                variant='contained' 
                color='secondary'
                onClick={() => loginWithRedirect({
                    authorizationParams: {
                      screen_hint: 'signup'
                    }
                  })
                }
                sx={{marginTop: '1rem'}}
              >
                Get Started
              </Button>
            </HeroGridItem>
          </HeroGridContainer>
        </HeroBox>
        {/* Second Section */}
        <FeatureContainerBox sx={{ }}>
          <InnerBox>
            <FeaturePaper 
              elevation={3} 
              sx={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url("https://res.cloudinary.com/djrbfvpit/image/upload/v1706340716/AIGearSkin/Internal%20Images/Screenshot_2024-01-26_at_11.31.31_PM_dnsu5t.png")',
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <Typography variant='h3' sx={{fontWeight: '500', textShadow:'0px 0px 10px #0b779f'}}>Create</Typography>
            </FeaturePaper>
          </InnerBox>
          <InnerBox>
            <FeaturePaper 
              elevation={3} 
              sx={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url("https://res.cloudinary.com/djrbfvpit/image/upload/v1706341279/AIGearSkin/Internal%20Images/Screenshot_2024-01-26_at_11.40.56_PM_fnllpo.png")',
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <Typography variant='h3' sx={{fontWeight: '500', textShadow:'0px 0px 10px #0b779f'}}>Place</Typography>
            </FeaturePaper>
          </InnerBox>
          <InnerBox>
            <FeaturePaper 
              elevation={3} 
              sx={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url("https://res.cloudinary.com/djrbfvpit/image/upload/v1706341757/AIGearSkin/Internal%20Images/Screenshot_2024-01-26_at_11.49.03_PM_wnjn6l.png")',
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <Typography variant='h3' sx={{fontWeight: '500', textShadow:'0px 0px 10px #0b779f'}}>Fulfill</Typography>
            </FeaturePaper>
          </InnerBox>
        </FeatureContainerBox>
        {/* Third Section */}
        <VideoBox>
          <InnerBox sx={{ flex: '1', height: '100%', width: '100%'}}>
            <Typography variant='h5' sx={{width: '100%', textAlign: 'center', padding: '0.25rem', marginTop: '1rem', marginBottom: '1rem'}}>
              Watch the Step By Step Demo!
            </Typography>
          </InnerBox>
          <InnerVideoBox>
            <iframe 
              width="100%" 
              height="100%" 
              style={{minHeight: !isMobile && '30rem'}}
              src="https://www.youtube.com/embed/XcvJXPZZ16c?si=uO2QGRn-WGTSsrK9" title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
            />
          </InnerVideoBox>
        </VideoBox>
        {/* Fifth Section */}
        <Box 
          sx={{ 
            flex: '0.25 0.25 auto', 
            display: 'flex', 
            flexDirection: 'row' 
          }}
        >
          <InnerBox sx={{ backgroundColor: '#0b779f', paddingTop: '1rem', paddingBottom: '1rem' }}>
            <Typography sx={{ color: 'white' }}>
              Your Merch A.I. by Vortex Media Consulting
            </Typography>
          </InnerBox>
        </Box>
      </Box>
    </Box>
  )
}

export default Landing