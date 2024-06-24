import { Box, Grid, Paper, Typography, styled } from '@mui/material';

const InnerBox = styled(Box)(({theme}) => ({
  flex: '1 1 auto', 
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center' 
}));

const InnerVideoBox = styled(Box)(({theme}) => ({
  flex: '1 1 auto', 
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center', 
  marginBottom: '1rem', 
  marginTop: '1rem', 
  marginRight: '1rem',
  minHeight: '20rem',
  minWidth: '20rem',
  [theme.breakpoints.down('md')]: {
    minWidth: '10rem',
    minHeight: '10rem'
  }
}));

const HeroBox = styled(Box)(({theme}) => ({
  flex: '0.75 1 auto', 
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://res.cloudinary.com/djrbfvpit/image/upload/v1706337367/AIGearSkin/Internal%20Images/metadevchris_a_sticker_with_an_abstract_design_on_it_and_a_comp_896cbf69-1050-43dc-af7a-0138f3ca0ca5_ufkqtl.webp")',
  backgroundSize: 'cover', 
  backgroundPosition: 'center',
}));

const HeroGridContainer = styled(Grid)(({theme}) => ({
  display: 'flex', 
  width: '100%', 
  height: '100%', 
  justifyContent: 'center', 
  flexDirection: 'column', 
  position: 'relative',
  marginLeft: '5rem',
  marginTop: '5rem',
  [theme.breakpoints.down('md')]: {
    marginTop: '5rem',
  }
}));

const HeroGridItem = styled(Grid)(({theme}) => ({
  display: 'flex',
  width: '50%', 
  height: '100%', 
  alignItems: 'flex-start', 
  justifyContent: 'center', 
  flexDirection: 'column', 
  marginLeft: '7rem', 
  zIndex: '5',
  [theme.breakpoints.down('md')]: {
    marginLeft: '0',
    width: '100%',
    justifyContent: 'flex-start',
  }
}));

const VideoBox = styled(Box)(({theme}) => ({
  flex: '1 1 auto', 
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  boxShadow: 'inset 0 0 10px #0b779f',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  }
}));

const FeaturePaper = styled(Paper)(({theme}) => ({
  flex: '1', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90%', 
  width: '95%', 
  padding: '1rem',
  flexWrap: 'wrap',
  paddingTop: '5rem',
  paddingBottom: '5rem'
}));

const FeatureContainerBox = styled(Box)(({theme}) => ({
  flex: '0.5 1 auto', 
  display: 'flex', 
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  }
}))

const HeroTypography = styled(Typography)(({theme}) => ({
  fontWeight: '700', 
  textShadow:'2px 2px 2px #000000',
}));

const HeroSplashTypography = styled(Typography)(({theme}) => ({
  position: 'absolute', 
  fontWeight: '700',
  opacity: '33%', 
  color: 'gray', 
  fontSize: '20rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '10rem',
    left: 0,
    top: 0
  } 
}));

const TitleTypography = styled(Typography)(({theme}) => ({
  marginLeft: '1rem',
  [theme.breakpoints.down('md')]: {
    marginLeft: '0'
  }
}));

export { 
  InnerBox, 
  HeroBox, 
  VideoBox, 
  FeaturePaper,
  HeroTypography,
  HeroGridContainer,
  HeroGridItem,
  FeatureContainerBox,
  HeroSplashTypography,
  TitleTypography,
  InnerVideoBox
}