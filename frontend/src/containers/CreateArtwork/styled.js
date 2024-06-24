import { 
  Grid,
  Accordion,
  AccordionSummary, 
  styled, 
  ToggleButtonGroup,
  ToggleButton,
  Container,
  Paper,
  Typography
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const OptionToggleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ParentContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  maxHeight: '90dvh',
  width: '100%',
  flexWrap: 'nowrap',
}));

const FocusedWorkContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  flex: '2',
  width: '100%',
  maxHeight: '40dvh',
  objectFit: 'contain',
  position: 'relative',
  margin: '1rem',
  [theme.breakpoints.down('md')]: {
    margin: '0',
    width: '90%',
  }
}));

const ButtonContainer = styled(Container)(() => ({
  padding: '0.5rem',
  display: 'flex',
  height: '100%'
}));

const BaseButtonOption = styled(ToggleButton)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flex: '1',
  flexWrap: 'wrap',
  flexDirection: 'column',
  height: '100%',
  width: '6rem',
  margin: '0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
  '&:hover': {
    backgroundColor: 'lightblue',
    cursor: 'pointer'
  },
  '&.Mui-selected': {
    backgroundColor: `${theme.palette.secondary.main}`,
    color: 'white'
  }
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'gray',
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const CircularLoadingContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  height: '100%', 
  width: '100%', 
}));

const StylingOptionsContainer = styled(Paper)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-evenly',
  height: '100%',
  padding: '1rem',
  backgroundColor: `${theme.palette.whites.main}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: '0.5jrem'
  }
}));

const StylingOptionsHeader = styled(Typography)(({theme}) => ({
  marginBottom: theme.spacing(2),
}));

const MenuOptionRow = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '100%',
  height: '100%',
  backgroundColor: `${theme.palette.whites.main}`
}));

const SecondaryTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.secondary.fontFamily}`
}));

export {
  StylingOptionsHeader,
  MenuOptionRow,
  StylingOptionsContainer,
  OptionAccordion,
  OptionAccordionSummary,
  OptionAccordionDetails,
  OptionToggleGroup,
  ButtonContainer,
  ParentContainer,
  FocusedWorkContainer,
  BaseButtonOption,
  ImageSrc,
  Image,
  ImageBackdrop,
  CircularLoadingContainer,
  SecondaryTypography
}