import React, 
{ 
  // useState 
} from 'react';
import { 
  Button, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  Container, 
  Fade, 
  Typography, 
  // CardMedia, 
  // FormControl, 
  // InputLabel, 
  // MenuItem, 
  // Select,
} from '@mui/material';
import { 
  PrimaryTypography, 
  ProductCardContainer, 
  ProductCardContent, 
  SecondaryTypography
} from './styled';
import { productPriceUpcharge } from '../../staticData/products';

function ProductCard({
  productSelectionCallback  ,
  quantityChange            ,
  selectedProducts          ,
  productInfo               ,
  // variantInfo               ,
  currentCart,
  ...rest
}) {
  
  const isolateProductInCurrentlySelected = () => {
    const isolatedProductInArray = currentCart?.filter(
      cartProduct => cartProduct?.id === productInfo?.id
    );

    return isolatedProductInArray[0] ?? '';
  };

  const quantity = isolateProductInCurrentlySelected()?.quantity;
  const cartId   = isolateProductInCurrentlySelected()?.cartId  ;

  const handleIncrement = () => {
    quantityChange(cartId, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      quantityChange(cartId, quantity - 1);
    }
  };

  const setPrice = (productPrice) => {
    if(productPrice === 0){
      return 0.00;
    };

    const initialPriceInCents = parseFloat(productPrice) * 100;
    const finalPrice = initialPriceInCents * productPriceUpcharge;
    const removeDecimals = finalPrice?.toFixed(0);
        
    return removeDecimals;
  };

  return (
    <Fade in timeout={1000}>
      <ProductCardContainer>
        <CardActionArea disableRipple>
          {/* <CardMedia
            component="img"
            height="100%"
            image={productInfo?.image}
            alt="temp tattoo size"
          /> */}
          <ProductCardContent>
            <PrimaryTypography
              gutterBottom 
              variant="h5" 
              component="div"
            >
              {productInfo?.name}
            </PrimaryTypography>
            <Typography
              gutterBottom 
              variant="body1" 
              component="div"
            >
              Price: ${(parseFloat(productInfo?.price) * productPriceUpcharge).toFixed(2)}
            </Typography>
          </ProductCardContent>
          <CardActions sx={{width: '100%', margin: '0'}}>
            { (!quantity || quantity < 1) ?  (
              <CardContent
                sx={{
                  display: 'flex', 
                  alignItems: 'center',
                  width: '100%',
                  flex: '1',
                }}
              >
                <Button
                  color   = 'secondary'
                  variant = 'contained'
                  disableRipple
                  sx      = {{
                    width: '100%', 
                  }} 
                  onClick = {() => {
                    productSelectionCallback(
                      productInfo?.id                             , 
                      productInfo?.name                           , 
                      1                                           ,
                      // productInfo?.main_category_id                ,
                      setPrice(productInfo?.price),
                      {...rest}
                    )
                  }}
                >
                  <SecondaryTypography sx={{color: 'white'}}>
                    Select
                  </SecondaryTypography>
                </Button> 
              </CardContent>
              ) : (
              <Container sx={{padding: '0!important'}}>

                <CardContent
                  sx={{
                    display         : 'flex'         , 
                    flex            : '1'            ,
                    justifyContent  : 'space-between',
                    alignItems      : 'center'       ,
                    width           : '100%'
                  }}
                >
                  <Button 
                    variant = "contained" 
                    color   = "secondary" 
                    onClick = {handleDecrement}
                    sx      = {{minWidth: '3rem'}}
                  >
                    <SecondaryTypography sx={{color: 'white'}}>
                      -
                    </SecondaryTypography>
                  </Button>
                  <SecondaryTypography variant="h5">
                    {quantity}
                  </SecondaryTypography>
                  <Button 
                    variant = "contained" 
                    color   = "secondary" 
                    onClick = {handleIncrement}
                    sx      = {{minWidth: '3rem'}}
                    disabled = {productInfo?.price === 0}
                  >
                    <SecondaryTypography sx={{color: 'white'}}>
                      +
                    </SecondaryTypography>
                  </Button>
                </CardContent>
              </Container>
              )
            }
          </CardActions>
        </CardActionArea>
      </ProductCardContainer>
    </Fade>
  )
}

export default ProductCard;