import { 
  Grid,
  Container, 
  styled, 
  Card,
  Accordion,
  AccordionSummary,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const ProductOrderedCard = styled(Card)(({theme}) => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  maxHeight: '10rem',
  marginTop: '1rem',
}));

const DetailsProductGridContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  minHeight: '5rem',
  height: '100%',
  flex: '1'
}));

const ImageThumbnailContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  maxHeight: '150px',
  maxWidth: '150px',
  flex: '1',
  minHeight: '7rem',
  padding: '1rem',
}));

const CircularLoadingContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  height: '100%', 
  width: '100%', 
}));

const OptionAccordion = styled((props) => (
  <Accordion disableGutters elevation={2} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  maxHeight: '30rem',
  overflow: 'auto',
  width: '100%'
}));

const OptionAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const OptionAccordionDetails = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  width: '100%',  
}));

const CheckoutNavigationButtonContainer = styled(Grid)(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const InformationCard = styled(Card)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '100%', 
  height: '100%',
  minHeight: '10rem',
  position: 'relative'
}));

const InfoGrid = styled(Grid)(() => ({
  display: 'flex', 
  justifyContent: 'space-evenly', 
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  flexDirection: 'column',
  width: '100%', 
  height: '100%'
}));

const CardImageGridContainer = styled(Grid)(() => ({
  display: 'flex', 
  justifyContent: 'space-evenly', 
  alignItems: 'center', 
  width: '100%'
}));

const CardInfoTypography = styled(Typography)(() => ({
  width: '100%', 
  textAlign: 'center'
}));

const CardGridContainer = styled(Grid)(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
  gridGap: '1rem',
  width: '100%',
  minHeight: '13rem'
}));

export { 
  ProductOrderedCard,
  DetailsProductGridContainer,
  ImageThumbnailContainer,
  CircularLoadingContainer,
  OptionAccordion,
  OptionAccordionSummary,
  OptionAccordionDetails,
  CheckoutNavigationButtonContainer,
  InformationCard,
  InfoGrid,
  CardImageGridContainer,
  CardInfoTypography,
  CardGridContainer
}

