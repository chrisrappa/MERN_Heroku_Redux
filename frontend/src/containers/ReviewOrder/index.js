import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Dialog, 
  DialogContent, 
  Grid, 
  IconButton, 
  Typography,
  Container,
  useTheme
} from '@mui/material';
import { 
  DetailsProductButtonContainer, 
  DetailsProductGridContainer, 
  DetailsProductInfoContainer, 
  ImageThumbnailContainer, 
  PrimaryTypography, 
  ProductCardParentContainer, 
  ProductCardsContainer, 
  ProductDetailGrid, 
  ProductOrderedCard, 
  QuantityButton, 
  QuantityContent,
  SecondaryTypography
} from './styled';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
// import EditIcon from '@mui/icons-material/Edit';
import { editCartQuantity, removeProductFromCart } from '../../actions/cartActions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { 
  PlacementBackButton, 
  // PromptOptionsContainer 
} from '../ImagePlacementEditor/styled';

function ReviewOrder() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme    = useTheme();

  const cartItems = useSelector((state) => state?.cartInfo?.cartItems);  

  const [selectedImage, setSelectedImage]       = useState(null)      ;
  const [openDialog, setOpenDialog]             = useState(false)     ;
  const [selectedProducts, setSelectedProducts] = useState(cartItems) ;

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
    setOpenDialog(false);
  };

  const handleUpdateQuantity = (cartId, newQuantity) => {

    setSelectedProducts(prevProducts =>
      newQuantity === 0 ?
      prevProducts?.filter(product => product.cartId !== cartId) :
      prevProducts?.map(product =>
        product.cartId === cartId ? { ...product, quantity: newQuantity } : 
        product
      )
    );

    dispatch(editCartQuantity(newQuantity, cartId, dispatch));

  };


  const handleIncrement = (product) => {
    const newQuantity = product?.quantity + 1;
    handleUpdateQuantity(product?.cartId, newQuantity);
  };

  const handleDecrement = (product) => {
    if (product?.quantity > 0) {
      const newQuantity = product?.quantity - 1;
      handleUpdateQuantity(product?.cartId, newQuantity);
    }
  };

  const handleDeleteCartItem = (cartId) => {
    dispatch(
      removeProductFromCart(cartId, dispatch)
    );

    setSelectedProducts(selectedProducts.filter(
      (item) => item.cartId !== cartId
    ));
  };

  const submitOrder = () => {
    navigate('/checkout');
  };

  const checkForEmptyImage = () => {
    return selectedProducts.some((product) => !product?.originalGenImage);
  };

  return (
    <ProductCardParentContainer>
      <ProductCardsContainer container>
        { selectedProducts?.length ? (
          selectedProducts.map((product) => (
            <ProductOrderedCard key={product?.id}>
              <DetailsProductGridContainer container>
                <ImageThumbnailContainer item>
                  <Grid container sx={{ position: 'relative', maxWidth: '150px'}}>
                    <>
                      <img 
                        src={product?.originalGenImage} 
                        alt='' 
                        style={{
                          height  : '100%'             , 
                          width   : '100%'             , 
                          cursor  : 'pointer'          , 
                          border  : '1px solid #eaeaea',
                        }} 
                        onClick={() => handleThumbnailClick(product?.userImageUrl)}
                      />
                      <Grid 
                        item 
                        style={{
                          position        : 'absolute' ,
                          display         : 'flex'     ,
                          justifyContent  : 'center'   ,
                          alignItems      : 'center'   ,
                          bottom          : '0.5rem'   ,
                          right           : '0.5rem'   ,
                          borderRadius    : '50%'      ,
                          padding         : '0.25rem'  ,
                          cursor          : 'pointer'  ,
                          height          : '2rem'     , 
                          width           : '2rem'
                        }}
                      >
                        <IconButton
                          sx={{
                            backgroundColor: 'rgba(79,79,79, 0.5)',
                            color: 'white',
                          }}
                          onClick={() => handleThumbnailClick(product?.originalGenImage)}
                        >
                          <ZoomInIcon />
                        </IconButton>
                      </Grid>
                    </>        
                  </Grid>
                </ImageThumbnailContainer>
                <DetailsProductInfoContainer item>
                  <Grid container sx={{height: '100%'}}>
                    <DetailsProductButtonContainer item>
                      {/* <IconButton 
                        onClick={() => navigate('/design/placement/1')}
                        style={{ 
                          marginRight: '1rem', 
                          top: 5, 
                          color: 'white', 
                          backgroundColor: 'rgba(70,70,70, 0.5)', 
                          height: '2rem', 
                          width: '2rem'
                        }} 
                      >
                        <EditIcon fontSize= '2rem' />
                      </IconButton> */}
                      <IconButton  
                        onClick={() => handleDeleteCartItem(product?.cartId)}
                        style={{ 
                          right: 5, 
                          top: 5, 
                          color: 'white', 
                          backgroundColor: `${theme.palette.primary.main}`, 
                          height: '2rem', 
                          width: '2rem'
                        }} 
                      >
                        <DeleteForeverIcon fontSize= '2rem' />
                      </IconButton>
                    </DetailsProductButtonContainer>
                    <ProductDetailGrid item>
                      <PrimaryTypography variant='body2' sx={{fontSize: '1rem'}}>
                        {product?.name}
                      </PrimaryTypography>

                      <QuantityContent>
                        <SecondaryTypography>Qty: </SecondaryTypography>
                        <QuantityButton
                          variant="contained" 
                          color="secondary" 
                          onClick={() => handleDecrement(product)}
                          disabled={product?.quantity < 2}
                        >
                          <SecondaryTypography sx={{color: 'white'}}>
                            -
                          </SecondaryTypography>
                        </QuantityButton>
                        <Typography variant="h5">
                          {product?.quantity}
                        </Typography>
                        <QuantityButton 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => handleIncrement(product)}
                          disabled={product?.price === 0}
                        >
                          <SecondaryTypography sx={{color: 'white'}}>
                            +
                          </SecondaryTypography>
                        </QuantityButton>
                      </QuantityContent>
                      <SecondaryTypography>Price: ${((parseFloat(product?.price / 100)) * product?.quantity).toFixed(2)}</SecondaryTypography>
                    </ProductDetailGrid>
                  </Grid>
                </DetailsProductInfoContainer>
              </DetailsProductGridContainer>
            </ProductOrderedCard>
          ))) : (
            <Container 
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100%', 
                width: '100%'
              }}
            >
              <Typography variant='h5' sx={{margin: '1rem'}}>Cart is Empty</Typography>
              <Button
                variant = 'contained'
                color   = 'secondary'
                onClick = {() => navigate('/createTat/0')}
              >
                <SecondaryTypography sx={{color: 'white', width: '15rem', height: '100%', fontSize: '1.5rem'}}>
                  Add Tattoo
                </SecondaryTypography>
              </Button>
            </Container>
          )
        }

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" >
          <IconButton sx={{position: 'absolute', top: 5, right: 5, color: 'white', backgroundColor: 'darkgray'}} onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
          <DialogContent sx={{height: '100%', width: '100%', padding: '0'}}>
            <Grid container justify="center" sx={{height: '100%', width: '100%'}}>
              <img src={selectedImage} alt="Full Size" style={{width: '100%', height: '100%'}} />
            </Grid>
          </DialogContent>
        </Dialog>
      </ProductCardsContainer>
      <Container sx={{display: 'flex', justifyContent: 'flex-end', padding: '0'}}>
        <Grid sx={{display: 'flex', flex: '1', justifyContent: 'space-between', alignItems: 'center'}}>
          {/* <PlacementBackButton
            variant = 'contained'
            color   = 'secondary' 
            onClick = {() => navigate('/createTat/1')}
            sx={{padding: '1.5rem', backgroundColor: 'white'}}
          >
            <ArrowBackIcon sx={{fontSize: '2rem', color: `${theme.palette.primary.main}`}} />
          </PlacementBackButton> */}
          <Button 
            variant='contained' 
            color='primary' 
            sx={{
              margin: '1rem', 
              width: '100%', 
              height: '3rem',
            }}
            onClick={() => submitOrder()}
            disabled={cartItems?.length < 1 || checkForEmptyImage()}
          >
            <Typography variant='h5' sx={{color: 'white'}}>
              Place Order
            </Typography>
          </Button>
        </Grid>
      </Container>
    </ProductCardParentContainer>
  );
};

export default ReviewOrder