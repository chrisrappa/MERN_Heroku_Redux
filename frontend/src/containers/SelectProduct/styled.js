import { 
  Grid,
  Container, 
  styled, 
} from "@mui/material";

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

const ProductCardContainer = styled(Container)(({theme}) => ({
  display: 'flex', 
  height: '-webkit-fill-available', 
  maxHeight: '80dvh',
  width: '100%',
  flexDirection: 'column', 
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  maxWidth: 'none!important',
  overflow: 'auto',
  padding: '0!important',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  }
}));

export {
  FocusedWorkContainer,
  CircularLoadingContainer,
  ProductCardContainer,
}