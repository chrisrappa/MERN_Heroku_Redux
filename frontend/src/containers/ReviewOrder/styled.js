import { 
  Grid,
  Container, 
  styled, 
  ButtonBase,
  Card,
  CardContent,
  Button,
  Typography
} from "@mui/material";


const ProductOrderedCard = styled(Card)(({theme}) => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
  height: 'fit-content',
  marginTop: '1rem'
}));

const DetailsProductGridContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  minHeight: '5rem',
  height: '100%'
}));

const ImageThumbnailContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flex: '1',
  minHeight: '7rem',
  height: '100%',
  padding: '1rem',
}));

const DetailsProductInfoContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  width: '100%',
  height: 'fit-content',
  flex: '1.5',
  minHeight: '5rem',
  [theme.breakpoints.up('md')]: {
    flex: '2'
  }
}));

const DetailsProductButtonContainer = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  height: 'fit-content'
}));

const DetailsProductAdjustments = styled(Grid)(({theme}) => ({
  flex: '1',
  minHeight: '5rem'
}));

const FocusedWorkContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  flex: '1',
}));

const CircularLoadingContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  height: '100%', 
  width: '100%', 
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

const Image = styled('span')(({ theme }) => ({
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

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const ProductDetailGrid = styled(Grid)(({theme}) => ({
  display: 'flex', 
  justifyContent: 'space-around', 
  padding: '0.75rem', 
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '50%'
  }
}));

const QuantityContent = styled(CardContent)(() => ({
  display: 'flex', 
  flex: '1',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '0',
  marginBottom: '1rem',
  marginTop: '1rem'
}));

const QuantityButton = styled(Button)(() => ({
  minWidth: '0', 
  width: '2rem', 
  padding: '0.5rem', 
  height: '2rem'
}));

const ProductCardParentContainer = styled(Container)(() => ({
  minHeight: '100%', 
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'space-between',
  flexGrow: '1',
  padding: '0'
}));

const ProductCardsContainer = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center', 
  flexDirection: 'column', 
  height: 'fit-content', 
  width: '100%', 
  overflow: 'scroll'
}));

const SecondaryTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.secondary.fontFamily}`
}));

const PrimaryTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.primary.fontFamily}`
}));

export { 
  ProductOrderedCard,
  DetailsProductGridContainer,
  ImageThumbnailContainer,
  DetailsProductInfoContainer,
  DetailsProductButtonContainer,
  DetailsProductAdjustments,
  ImageButton,
  ImageSrc,
  Image,
  ImageBackdrop,
  ImageMarked,
  FocusedWorkContainer,
  CircularLoadingContainer,
  ProductDetailGrid,
  QuantityContent,
  QuantityButton,
  ProductCardParentContainer,
  ProductCardsContainer,
  SecondaryTypography,
  PrimaryTypography
}