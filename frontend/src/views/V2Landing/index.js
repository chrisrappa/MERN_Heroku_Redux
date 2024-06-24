import React, { useMemo } from 'react';
import { 
  Grid, 
  Typography,
  useMediaQuery,
} from '@mui/material';
import { 
  FeatureBox,
  FeatureBoxContentGrid,
  FeatureContainerBox,
  FeatureImageCard,
  FeaturePaper, 
  FooterBox, 
  FooterContentGridContainer, 
  FooterLogoGridItem, 
  HeaderTextGridItem, 
  HeroBox, 
  HeroGridContainer, 
  HeroHeaderContentText, 
  IndividualScreenFeatureGridItem, 
  InnerBox, 
  MainPageBox, 
  ScreenFeatureBoxInnerGridContainer, 
  ScreenFeatureContentContainer, 
  ScreenFeatureContentItem, 
  ScreenFeatureHeaderTypography, 
  SecondaryPageBox, 
  SocialProofLogoCardMedium, 
  SocialProofLogosContainer, 
  StepContainer, 
} from './styled';
import { useNavigate } from 'react-router-dom';
import AppBarMenu from './AppBarMenu';
import { 
  HeroHeaderText, 
  featureBoxOne, 
  featureBoxThree, 
  featureBoxTwo, 
  heroImageSrc, 
  pageHeaderContent, 
  screenFeatureOne, 
  screenFeatureOneSrc, 
  screenFeatureThree, 
  screenFeatureThreeSrc, 
  screenFeatureTwo, 
  screenFeatureTwoSrc, 
} from './consts';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DryIcon from '@mui/icons-material/Dry';
import { useAuth0 } from '@auth0/auth0-react';

function V2Landing() {

  const { loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();

	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useMemo(() => {
    if(user){
      navigate('/createTat/0')
    }
  }, [user, navigate]);

  return (
    <MainPageBox>
      <AppBarMenu isMobile={isMobile} navigate={navigate} loginWithRedirect={loginWithRedirect} />
      <SecondaryPageBox>
        {/* First Section */}
        <HeroBox>
          <HeroGridContainer container>
            <HeaderTextGridItem item sx={{width: '100%'}}>
              <HeroHeaderText isMobile={isMobile} />
              <HeroHeaderContentText color={'white'} variant='h6'>
                {pageHeaderContent}
              </HeroHeaderContentText>
            </HeaderTextGridItem>
            <Grid item sx={{flex: '2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img 
                width={isMobile ? '360rem' : '275rem'} 
                height={isMobile ? '700rem' : '600rem'} 
                src={heroImageSrc} 
                alt='hero image' 
                style={{borderRadius: '1rem'}}
              />
            </Grid>
          </HeroGridContainer>
        </HeroBox>
        {/* Second Section */}
        <FeatureContainerBox id='howitworks'>
          <InnerBox>
            <FeaturePaper elevation={10}>
              <FeatureBoxContentGrid container>
                <SocialProofLogosContainer container>
                  <StepContainer elevation={0}>
                    <Grid item sx={{padding: '1rem'}}>
                      <Typography 
                        sx={{
                          fontWeight: '400', 
                          color: '#ffffff',
                          fontFamily: '"Edu VIC WA NT Beginner", cursive',
                          fontSize: isMobile ? '2.5rem' : '3.5rem',
                          textAlign: 'center',
                        }}
                      >
                        {featureBoxOne.headerText}
                      </Typography>
                      <Typography 
                        sx={{
                          color: '#ffffff',
                          textAlign: 'center',
                          width: '100%',
                          padding: isMobile && ('0 3rem')
                        }}
                      >
                        {featureBoxOne.content}
                      </Typography>
                    </Grid>
                    <SocialProofLogoCardMedium elevation={0}>
                      <AutoAwesomeIcon sx={{color: 'white', height: '10rem', width: '10rem'}}/>
                    </SocialProofLogoCardMedium>
                  </StepContainer>
                  <StepContainer elevation={0}>
                    <Grid item sx={{padding: '1rem'}}>
                      <Typography 
                        sx={{
                          fontWeight: '400', 
                          color: '#ffffff',
                          fontFamily: '"Edu VIC WA NT Beginner", cursive',
                          fontSize: isMobile ? '2.5rem' : '3.5rem',
                          textAlign: 'center',
                        }}
                      >
                        {featureBoxTwo.headerText}
                      </Typography>
                      <Typography 
                        sx={{
                          color: '#ffffff',
                          textAlign: 'center',
                          width: '100%',
                          padding: isMobile && ('0 3rem')
                        }}
                      >
                        {featureBoxTwo.content}
                      </Typography>
                    </Grid>
                    <SocialProofLogoCardMedium elevation={0}>
                      <LocalShippingIcon sx={{color: 'white', height: '10rem', width: '10rem'}} />
                    </SocialProofLogoCardMedium>
                  </StepContainer>
                  <StepContainer elevation={0}>
                    <Grid item sx={{padding: '1rem'}}>
                      <Typography 
                        sx={{
                          fontWeight: '400', 
                          color: '#ffffff',
                          fontFamily: '"Edu VIC WA NT Beginner", cursive',
                          fontSize: isMobile ? '2.5rem' : '3.5rem',
                          textAlign: 'center',
                        }}
                      >
                        {featureBoxThree.headerText}
                      </Typography>
                      <Typography 
                        sx={{
                          color: '#ffffff',
                          textAlign: 'center',
                          width: '100%',
                          padding: isMobile && ('0 3rem')
                        }}
                      >
                        {featureBoxThree.content}
                      </Typography>
                    </Grid>
                    <SocialProofLogoCardMedium elevation={0}>
                      <DryIcon sx={{color: 'white', height: '10rem', width: '10rem'}} />
                    </SocialProofLogoCardMedium>
                  </StepContainer>
                </SocialProofLogosContainer>
              </FeatureBoxContentGrid>
            </FeaturePaper>
          </InnerBox>
        </FeatureContainerBox>
        {/* Third Section */}
        <FeatureBox id='features'>
          <ScreenFeatureBoxInnerGridContainer container>
            <IndividualScreenFeatureGridItem>
              <ScreenFeatureContentContainer container>
                <ScreenFeatureContentItem item>
                  <ScreenFeatureHeaderTypography variant={isMobile ? 'h4' : 'h3'}>
                    {screenFeatureOne.headerText}
                  </ScreenFeatureHeaderTypography>
                  <Typography variant='h6' sx={{textAlign: isMobile ? 'center' : 'left', color: 'white'}}>
                    {screenFeatureOne.content}
                  </Typography>
                </ScreenFeatureContentItem>
              </ScreenFeatureContentContainer>
              <FeatureImageCard elevation={0} sx={{backgroundColor: 'transparent'}}>
                <img 
                  src={screenFeatureOneSrc} 
                  alt='featureTwo' 
                  style={{
                    minHeight: '5rem', 
                    height: '100%', 
                    width: '20rem',
                    borderRadius: '1rem'
                  }}
                />
              </FeatureImageCard>
            </IndividualScreenFeatureGridItem>
            <IndividualScreenFeatureGridItem item sx={{ flexDirection: isMobile && 'column-reverse!important' }}>
              <FeatureImageCard elevation={0} sx={{backgroundColor: 'transparent'}}>
                <img 
                  src={screenFeatureTwoSrc} 
                  alt='featureTwo' 
                  style={{
                    minHeight: '5rem', 
                    height: '100%', 
                    width: '20rem',
                    borderRadius: '1rem'
                  }}
                />
              </FeatureImageCard>
              <ScreenFeatureContentContainer container>
                <ScreenFeatureContentItem item>
                  <ScreenFeatureHeaderTypography variant={isMobile ? 'h4' : 'h3'}>
                    {screenFeatureTwo.headerText}
                  </ScreenFeatureHeaderTypography>
                  <Typography variant='h6' sx={{textAlign: isMobile ? 'center' : 'left', color: 'white'}}>
                    {screenFeatureTwo.content}
                  </Typography>
                </ScreenFeatureContentItem>
              </ScreenFeatureContentContainer>
            </IndividualScreenFeatureGridItem>
            <IndividualScreenFeatureGridItem>
              <ScreenFeatureContentContainer container>
                <ScreenFeatureContentItem item>
                  <ScreenFeatureHeaderTypography variant={isMobile ? 'h4' : 'h3'}>
                    {screenFeatureThree.headerText}
                  </ScreenFeatureHeaderTypography>
                  <Typography variant='h6' sx={{textAlign: isMobile ? 'center' : 'left', color: 'white'}}>
                    {screenFeatureThree.content}
                  </Typography>
                </ScreenFeatureContentItem>
              </ScreenFeatureContentContainer>
              <FeatureImageCard elevation={0} sx={{backgroundColor: 'transparent'}}> 
                <img 
                  src={screenFeatureThreeSrc} 
                  alt='featureTwo' 
                  style={{
                    minHeight: '5rem', 
                    height: '100%', 
                    width: '20rem',
                    borderRadius: '1rem'
                  }}
                />
              </FeatureImageCard>
            </IndividualScreenFeatureGridItem>
          </ScreenFeatureBoxInnerGridContainer>
        </FeatureBox>
        {/* Footer */}
        <FooterBox id='consult'>
          <FooterContentGridContainer container>
            <FooterLogoGridItem item>
              <Typography variant='h5' sx={{color: 'white', marginLeft: '1rem', fontWeight: '500' }}>
                Temp-Tat AI
              </Typography>
            </FooterLogoGridItem>
          </FooterContentGridContainer>
        </FooterBox>
      </SecondaryPageBox>
    </MainPageBox>
  )
}

export default V2Landing