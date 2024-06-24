import { 
  Button, 
  ButtonBase, 
  Container, 
  Grid, 
  Paper, 
  ToggleButton, 
  Typography, 
  styled 
} from "@mui/material";

const OrientationContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  marginTop: '3rem',
  '& :hover': {
    cursor: 'pointer'
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '0',
    flex: '0.5'
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
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
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
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const MenuOptionRow = styled(Paper)(({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  height: '100%',
  alignItems: 'center',
  boxShadow: `inset 0 0 5px 5px rgba(203,203,203, 0.75)`, 
  paddingLeft: '4rem',
  overflow: 'scroll',
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent',
  },
  [theme.breakpoints.up('lg')]: {
    width: '100%'
  }
}));

const ButtonContainer = styled(Container)(({theme}) => ({
  position: 'relative',
  padding: '0!important',
  display: 'flex',
  height: '100%',
  width: '100%',
  maxHeight: '7rem',
  maxWidth: '7rem',
  margin: '1rem 1rem 1rem 0',
  [theme.breakpoints.up('md')]: {
    height: '10rem',
    width: '10rem'
  }
}));

const BaseButtonOption = styled(ToggleButton)(({theme}) => ({
  display: 'flex',
  flex: '1',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '6rem',
  maxHeight: '250px',
  margin: '0',
  padding: '0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
  '&:hover': {
    backgroundColor: 'lightblue',
    cursor: 'pointer'
  }
}));

const DeleteButtonContainer = styled(Container)(({theme}) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '0',
  top: '0',
  right: '0',
  zIndex: '20',
  [theme.breakpoints.up('md')]: {
    padding: '0!important'
  }
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

const CircularLoadingContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  height: '100%', 
  width: '100%',
}));

const LogosPlaceHolderTextContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '100%',
  textWrap: 'nowrap',
  color: 'gray',
  marginLeft: '1rem'
}));

const SecondaryTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.secondary.fontFamily}`
}));

export { 
  OrientationContainer, 
  ImageButton,
  ImageSrc,
  ImageForButton,
  ImageBackdrop,
  ImageMarked,
  MenuOptionRow,
  ButtonContainer,
  BaseButtonOption,
  DeleteButtonContainer,
  DeleteButton,
  SelectOptionNavigationButton,
  CircularLoadingContainer,
  LogosPlaceHolderTextContainer,
  SecondaryTypography
}