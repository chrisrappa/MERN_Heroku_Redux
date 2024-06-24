import { 
  Button,
  ButtonBase, 
  Container, 
  Grid, 
  Paper, 
  StepLabel, 
  ToggleButton, 
  Typography, 
  styled 
} from "@mui/material";
import StepConnector, { 
  stepConnectorClasses 
} from '@mui/material/StepConnector';

const OptionSelection = styled(Paper)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '35%', 
  minHeight: '25rem',
  '& :hover': {
    cursor: 'pointer'
  }
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    }
  },
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

const ImageForButton = styled('span')(({ theme }) => ({
  ...theme.flexBox.justifyAlignCenter,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const PromptOptionsContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  flex: '1',
  height: '100%',
  width: '100%'
}));

const OptionSelectionContainer = styled(Container)(() => ({
  height: '100%', 
  width: '100%', 
  padding: '0', 
  display: 'flex', 
  flexDirection: 'column'
}));

const BaseButtonOption = styled(ToggleButton)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flex: '1',
  height: '100%',
  width: '250px',
  margin: '0',
  padding: '0',
  backgroundColor: `${theme.palette.whites.main}`,
  '&:hover': {
    border: `3px solid ${theme.palette.secondary.main}`,
    cursor: 'pointer',
    backgroundColor: `${theme.palette.whites.main}`,
  }
}));

const ButtonContainer = styled(Grid)(() => ({
  position: 'relative',
  padding: '0.25rem',
  display: 'flex',
  height: '8rem',
  width: '8rem'
}));

const MenuOptionRow = styled(Paper)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  height: '100%',
  backgroundColor: `${theme.palette.grays.lt}`,
  paddingLeft: '3rem',
  marginTop: '0.75rem',
  overflow: 'scroll',
  scrollbarWidth: 'none',
  minHeight: '8rem',
  minWidth: '100%',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent',
  },
}));

const StylingOptionsContainer = styled(Paper)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-evenly',
  height: '100%',
  padding: '1rem',
  [theme.breakpoints.down('md')]: {
    marginBottom: '0.5jrem'
  }
}));

const SelectOptionNavigationButton = styled(Button)(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  zIndex: '20',
  minWidth: '0'
}));

const DeleteButtonContainer = styled(Container)(() => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '0',
  top: '0',
  right: '0',
  zIndex: '20'
}));

const DeleteButton = styled(Button)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  backgroundColor: 'red',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
  minWidth: '0'
}));

const LogosPlaceHolderTextContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '100%',
  textWrap: 'nowrap',
  color: 'gray',
  marginLeft: '1rem'
}));

const CircularLoadingContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  height: '100%', 
  width: '100%', 
}));

const OrientationContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  marginTop: '3rem',
  [theme.breakpoints.down('md')]: {
    marginTop: '0',
    flex: '0.5'
  }
  
}));

const MainGridContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  height: '100%',
  width: '100%',
}));

const SelectAndSaveContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  width: '100%',
  height: '100%'
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: `${theme.palette.secondary.main}`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: `${theme.palette.secondary.main}`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#0b779f',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#0b779f',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

const CustomStepLabel = styled(StepLabel)(() => ({
  '& .MuiStepLabel-alternativeLabel': {
    margin: '0'
  }
}));

const PlaceArtNavigation = styled(Grid)(() => ({
  display: 'flex',
  width: '100%',
  height: '100%', 
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'nowrap',
  marginTop: '1rem'
}));

const PlacementBackButton = styled(Button)(() => ({
  borderRadius: '100%',
  height: '2.5rem',
  width: '2.5rem',
  minWidth: '0'
}));

const ImageAreaGrid = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flex: '2', 
  flexDirection: 'column',
  overflowX: 'hidden',
  overflowY: 'hidden',
  height: '100%',
  width: '100%',
  padding: '3rem 0',
  border: `1px solid ${theme.palette.grays.lt}`,
  borderRadius: '1rem',
  [theme.breakpoints.down('md')]: {
    marginTop: '0'
  }
}));

const SecondaryTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.secondary.fontFamily}`,
  fontSize: '1.5rem',
  color: `${theme.palette.whites.main}`
}));

const TextSelectionGrid = styled(Grid)(() => ({
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
}));



export { 
  OrientationContainer, 
  OptionSelection,
  ImageButton,
  ImageSrc,
  ImageForButton,
  ImageBackdrop,
  PromptOptionsContainer,
  OptionSelectionContainer,
  BaseButtonOption,
  ButtonContainer,
  MenuOptionRow,
  StylingOptionsContainer,
  SelectOptionNavigationButton,
  DeleteButtonContainer,
  DeleteButton,
  LogosPlaceHolderTextContainer,
  CircularLoadingContainer,
  MainGridContainer,
  SelectAndSaveContainer,
  QontoConnector,
  QontoStepIconRoot,
  CustomStepLabel,
  PlaceArtNavigation,
  PlacementBackButton,
  ImageAreaGrid,
  SecondaryTypography,
  TextSelectionGrid
};