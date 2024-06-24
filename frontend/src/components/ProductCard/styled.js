import { Card, CardContent, Typography, styled } from '@mui/material';

const ProductCardContainer = styled(Card)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  maxWidth: '15rem', 
  height: '20rem',
  margin: '0.5rem',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const ProductCardContent = styled(CardContent)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  height: '10rem',
  [theme.breakpoints.down('md')]: {
    height: '100%',
    padding: '0',
    marginTop: '1rem'
  }
}));

const PrimaryTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.primary.fontFamily}`,
  textAlign: 'center'
}));

const SecondaryTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.secondary.fontFamily}`
}));

export { 
  ProductCardContainer, 
  ProductCardContent,
  PrimaryTypography,
  SecondaryTypography
}