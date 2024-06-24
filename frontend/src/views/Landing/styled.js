import { 
  AppBar, 
  Box, 
  Button, 
  Card, 
  Grid, 
  Paper, 
  Typography, 
  styled 
} from '@mui/material';

const MainPageBox = styled(Box)(({theme}) => ({
  flexGrow: 1, 
  display: 'flex', 
  flexDirection: 'column', 
  minHeight: '100dvh', 
  maxHeight: '100%', 
  maxWidth: '-webkit-fill-available' ,
  backgroundColor: '#181c1f'
}));

const StyledAppBar = styled(AppBar)(({theme, scroll}) => ({
  backgroundColor: scroll ? 'white' : 'transparent',
  paddingTop: '1rem',
  // transition: theme.transitions.create('background-color', {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
}));

const SecondaryPageBox = styled(Box)(({theme}) => ({
  flex: '1 1 auto', 
  overflow: 'auto', 
  display: 'flex', 
  flexDirection: 'column',
  minHeight: '100%',
  paddingTop: '2rem',
  height: '100dvh',
  [theme.breakpoints.down('md')]: {
    overflow: 'auto',
    overflowX: 'hidden'
  }
}));

const InnerBox = styled(Box)(({theme}) => ({
  flex: '1 1 auto', 
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  height: '35rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    // marginTop: '1rem',
    // marginBottom: '1rem',
    height: '100%'
  }
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

const HeaderTextGridItem = styled(Grid)(() => ({
  // backgroundColor: '#ffffff', 
  // boxShadow: '0 0 150px 150px #ffffff', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center', 
  flexDirection: 'column',
  padding: '3rem',
  flex: '1'
}));

const HeroBox = styled(Box)(({theme}) => ({
  flex: '0.75 1 auto', 
  display: 'flex',
  paddingBottom: '5rem',
  alignItems: 'center', 
  justifyContent: 'center',
  marginBottom: '2rem',
  marginTop: '5rem',
  // background: '#ffffff',
  // background: 'linear-gradient(0deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 25%, rgba(128,152,238,0.25) 100%)',
  [theme.breakpoints.down('md')]: {
    paddingBottom: '1rem',
    marginTop: '6rem',
    marginBottom: '5rem'
  }
}));

const SocialProofGridContainer = styled(Grid)(({theme}) => ({
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  [theme.breakpoints.down('md')]: {
    marginBottom: '0',
    marginRight: '0',
  }
}));

const SocialProofLogosContainer = styled(Grid)(({theme}) => ({
  display: 'flex', 
  justifyContent: 'space-evenly', 
  alignItems: 'center', 
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    height: '100%',
    padding: '0'
  }
}));

const SocialProofLogoCardSmall = styled(Card)(({theme}) => ({
  height: '8rem', 
  width: '8rem', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  borderRadius: '1rem', 
  boxShadow: '0px 0px 10px 0.25px rgba(82,193,221, 0.25)', 
  border: '1px solid #d5d5d5',
  [theme.breakpoints.down('md')]: {
    margin: '0.5rem'
  }
}));

const SocialProofLogoCardMedium = styled(Card)(({theme}) => ({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: '18rem', 
  margin: '1rem',
  borderRadius: '0.5rem', 
  backgroundColor: 'transparent',
  [theme.breakpoints.down('md')]: {
    margin: '0.5rem',
    width: '20rem'
  }
}));

const StepContainer = styled(Paper)(({theme}) => ({
  flex: '1', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  width: '100%', 
  maxHeight: '100%',
  background: 'transparent',
  margin: '1rem'
}));

const SocialProofLogoCardLarge = styled(Card)(({theme}) => ({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: '18rem', 
  borderRadius: '0.5rem', 
  boxShadow: '0px 0px 20px 0.25px rgba(82,193,221, 0.25)',
  border: '2px solid #dfdfdf',
  [theme.breakpoints.down('md')]: {
    margin: '0.5rem',
    width: '23rem'
  }
}));

const HeroGridContainer = styled(Grid)(({theme}) => ({
  display: 'flex', 
  width: '100%', 
  height: '100%', 
  justifyContent: 'center', 
  alignItems: 'center',
  flexDirection: 'column', 
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

const HeroHeaderContentText = styled(Typography)(({theme}) => ({
  width: '100%', 
  textAlign: 'center', 
  padding: '0.25rem', 
  marginBottom: '1rem', 
  maxWidth: '50%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%'
  }
}));

const VideoBox = styled(Box)(({theme}) => ({
  flex: '1', 
  marginBottom: '10rem',
  marginTop: '5rem',
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    margin: '4rem 0.5rem'
  }
}));

const FeatureBox = styled(Box)(({theme}) => ({
  flex: '1 1 auto', 
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  // backgroundColor: '#f6f8fa',
  paddingTop: '5rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    paddingTop: '1rem'
  }
}));

const ScreenFeatureBoxInnerGridContainer = styled(Grid)(() => ({
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center', 
  alignItems: 'center', 
  width: '100%'
}));

const IndividualScreenFeatureGridItem = styled(Grid)(({theme}) => ({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  width: '100%', 
  padding: '5rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '1rem',
    marginBottom: '2rem'
  }
}));

const FeatureImageCard = styled(Card)(({theme}) => ({
  display: 'flex', 
  justifyContent: 'center',
  borderRadius: '0.5rem',
  // filter: 'drop-shadow(9px 11px 14px rgba(82,115,232, 0.1))',
  width: '100%',
  maxWidth: '45rem'
}));

const FeaturePaper = styled(Paper)(({theme}) => ({
  flex: '1', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '1rem',
  paddingTop: '3rem',
  paddingBottom: '3rem',
  height: '100%',
  // background: 'rgb(107,107,107)', 
  background: 'linear-gradient(126deg, rgba(255,225,199,0.3954175420168067) 0%, rgba(255,225,199,0.267900910364145) 35%, rgba(0,58,58,0.35900297619047616) 64%, rgba(44,58,61,0.748358718487395) 100%)', 
  borderRadius: '5rem'
}));

const FeatureContainerBox = styled(Box)(({theme}) => ({
  flex: '0.5 1 auto', 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center',
  padding: '5rem 3rem',
  // backgroundColor: 'rgba(82,115,232, 0.08)',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '1rem',
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

const FeatureBoxContentGrid = styled(Grid)(({theme}) => ({
  display: 'flex', 
  justifyContent: 'center', 
  flexDirection: 'column', 
  alignItems: 'center', 
  paddingRight: '1rem', 
  paddingLeft: '1rem',
  height: '100%',
  width: '100%',
  flexWrap: 'nowrap',
  [theme.breakpoints.down('md')]: {
    height: '100%',
    padding: '0'
  }
}));

const EmailSubGridContainer = styled(Grid)(({theme}) => ({
  display: 'flex', 
  flexDirection: 'column', 
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '3rem 0'
  }
}));

const EmailSubTextGridItem = styled(Grid)(() => ({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  flexDirection: 'column'
}));

const EmailSubSubmitButton = styled(Button)(() => ({
  borderRadius: '5rem', 
  width: '10rem', 
  height: '3rem', 
  backgroundColor: '#008080', 
  color: '#ffffff'
}));

const FooterBox = styled(Box)(({theme}) => ({
  flex: '1', 
  height: '10rem', 
  width: '100%', 
  backgroundColor: '#1d1f2c',
}));

const FooterContentGridContainer = styled(Grid)(({theme}) => ({
  height: '10rem', 
  display: 'flex', 
  justifyContent: 'space-evenly', 
  alignItems: 'center', 
  flexWrap: 'nowrap', 
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse'
  }
}));

const FooterLogoGridItem = styled(Grid)(() => ({
  flex: '1', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center'
}));

const FooterLinksGridContainer = styled(Grid)(() => ({
  flex: '2', 
  display: 'flex', 
  justifyContent: 'space-evenly', 
  alignItems: 'center'
}));

const FooterSocialLinksContainer = styled(Grid)(({theme}) => ({
  flex: '1', 
  display: 'flex', 
  justifyContent: 'space-evenly', 
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flex: '0.5'
  }
}));

const ScreenFeatureContentContainer = styled(Grid)(({theme}) => ({
  display: 'flex', 
  justifyContent: 'center', 
  [theme.breakpoints.down('md')]: {
    paddingBottom: '2rem',
  }
}));

const ScreenFeatureContentItem = styled(Grid)(({theme}) => ({
  width: '75%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const ScreenFeatureHeaderTypography = styled(Typography)(({theme}) => ({
  paddingBottom: '1rem', 
  fontWeight: '700',
  color: 'white',
  fontFamily: '"Edu VIC WA NT Beginner", cursive',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center'
  }
}));

export { 
  MainPageBox,
  StyledAppBar,
  SecondaryPageBox,
  InnerBox, 
  HeroBox, 
  VideoBox, 
  HeaderTextGridItem,
  HeroHeaderContentText,
  FeaturePaper,
  HeroTypography,
  HeroGridContainer,
  HeroGridItem,
  FeatureContainerBox,
  HeroSplashTypography,
  TitleTypography,
  InnerVideoBox,
  FeatureBoxContentGrid,
  FeatureBox,
  SocialProofGridContainer,
  SocialProofLogosContainer,
  SocialProofLogoCardSmall,
  SocialProofLogoCardMedium,
  StepContainer,
  SocialProofLogoCardLarge,
  ScreenFeatureBoxInnerGridContainer,
  IndividualScreenFeatureGridItem,
  FeatureImageCard,
  EmailSubGridContainer,
  EmailSubTextGridItem,
  EmailSubSubmitButton,
  FooterBox,
  FooterContentGridContainer,
  FooterLogoGridItem,
  FooterLinksGridContainer,
  FooterSocialLinksContainer,
  ScreenFeatureContentContainer,
  ScreenFeatureContentItem,
  ScreenFeatureHeaderTypography
}