import React, { useEffect, useMemo, useState } from 'react'
import ContentArea from '../../components/ContentArea';
import Box from '@mui/material/Box';
import CreateArtwork from '../../containers/CreateArtwork';
import { useNavigate, useParams } from 'react-router-dom';
import { ParentContainer } from './styled';
import { Grid, Typography } from '@mui/material';
import CreationSteps from '../../components/CreationSteps';
import { useSelector } from 'react-redux';


function CreateTatFlow() {

  const navigate          = useNavigate()           ;
  const { id: stepValue } = useParams()             ;
  const stepParseInt      = parseInt(stepValue, 10) ;

  const artworkGenerationURL = useSelector(
    (state) => state?.stepData?.currentInfo?.artworkProps?.base64Image
  );
  const userOrdersInfo  = useSelector((state) => state?.userData?.ordersInfo);
  const userInfo = useSelector((state) => state?.userData?.loginInfo);

  const [activeStep, setActiveStep]         = useState(stepParseInt ?? 0);
  const [artworkData, setArtworkData]       = useState({
    colors: [],
    styles: [],
    lightings: [],
    base64Image: artworkGenerationURL,
    resolution: '1024x1024',
    prompt: '',
    n: 4
  });

  useEffect(() => {

    if(artworkGenerationURL){
      setArtworkData({
        ...artworkData, 
        base64Image: artworkGenerationURL
      });
    }

  // eslint-disable-next-line
  }, [artworkGenerationURL]);

  useMemo(() => {
    switch(stepParseInt){
      case 0: 
        setActiveStep(0);
      break;
      case 1: 
        setActiveStep(1);
      break;
      case 2: 
        setActiveStep(2);
      break;
      default: navigate('/createTat/0');
    }

  // eslint-disable-next-line
  }, [stepValue]);

  useMemo(() => {
    localStorage.setItem('artworkData', artworkData);
  }, [artworkData])

  const handleStepDisplay = () => {
    switch(stepParseInt){
      case 0: 
        return (
          <ContentArea 
            currentStepComponent={
              <CreateArtwork 
                navigate={navigate} 
                activeStep={activeStep} 
                artworkData={artworkData}
                setArtworkData={setArtworkData}
              />
            } 
          />
        )
      default: return (
        <Grid sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant='h3' color={'secondary'} sx={{fontWeight: '500'}}>
            404 - Page Not Found!
          </Typography>
        </Grid>
      );
    }
  }

  return (
    <Box 
      component="main" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexGrow: 5, 
      }}
    >
      <ParentContainer>
        <Grid item sx={{flex: '1', width: '100%', height: '100%'}}>
          <CreationSteps activeStep={activeStep} />
        </Grid>
        { 
          (
            userOrdersInfo?.length && 
            !userInfo?.isAdmin
          ) ? (
            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexDirection: 'column', padding: '1rem'}}>
              <Typography variant='h4' color='secondary' sx={{textAlign: 'center', marginBottom: '1rem', fontWeight: '700'}}>
                You've created your free tattoo!
              </Typography>
              <Typography variant='h6' sx={{textAlign: 'center'}}>
                Our full release is coming soon, so check your email for when you can purchase more.
              </Typography>
            </Grid>
          ) : (
            handleStepDisplay()
          )

        }
      </ParentContainer>
    </Box>
  );
}

export default CreateTatFlow;