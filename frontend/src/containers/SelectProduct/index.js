import { 
  Button,
  CircularProgress,
  Grid,
  Typography,
  useTheme, 
} from '@mui/material';
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
  ParentContainer, 
} from '../CreateArtwork/styled';
import ProductCard from '../../components/ProductCard';
import { 
  addProductToCart, 
  editCartQuantity, 
  removeProductFromCart, 
  updateCartGenImageProp, 
  updateProductVariant
} from '../../actions/cartActions';
import { currentProducts } from '../../staticData/products';
import { CircularLoadingContainer } from '../ReviewOrder/styled';
import { ProductCardContainer } from './styled';
import { useToast } from '../../libs/toast';
import { storePrintfulProducts } from '../../actions/printfulActions';
import { 
  PlacementBackButton, 
  // PromptOptionsContainer 
} from '../ImagePlacementEditor/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function SelectProduct({
  navigate,
  artworkData,
  setArtworkData
}) {

  const dispatch = useDispatch();
  const toast    = useToast()   ;
  const theme    = useTheme();

  const currentCart = useSelector((state) => state?.cartInfo?.cartItems);
  const originalGenImage  = useSelector((state) => (
    state?.stepData?.currentInfo?.artworkProps?.base64Image
  ));
  const productListInfo = useSelector((state) => state?.productInfo?.productsListInfo);
  const productListLoading = useSelector((state) => state?.productInfo?.isLoading);
  
  const [selectedProducts, setSelectedProducts] = useState(null);

  const handleUpdateQuantity = (cartId, newQuantity) => {

    setSelectedProducts(prevProducts => {
      return newQuantity === 0 ?
      prevProducts?.filter(product => product.cartId !== cartId) :
      prevProducts?.map(product =>
        product.cartId === cartId ? { ...product, quantity: newQuantity } : 
        product
      )}
    );

    if(newQuantity === 0){
      dispatch( removeProductFromCart(cartId, dispatch));
    };

    if(newQuantity !== 0){
      dispatch( editCartQuantity(newQuantity, cartId)(dispatch));
    };
  };

  const handleAddProduct = (
    productId, 
    name, 
    quantity,
    price,
    rest
  ) => {
 
    const createCartId = currentCart?.length ? currentCart?.length + 1 : 1;
    const newProduct = {
      cartId            : createCartId     ,
      id                : productId        , 
      name              : name             , 
      quantity          : quantity         ,
      originalGenImage  : originalGenImage ,
      price             : price            ,
      rest              : rest
    };

    if(selectedProducts){
      setSelectedProducts((prev) => [...prev, newProduct]);
    } else {
      setSelectedProducts([newProduct]);
    }

    dispatch( addProductToCart(newProduct, dispatch) );
    toast.success('Product Added to Cart!');
  };

  const updateCartImage = () => {
    dispatch(updateCartGenImageProp({...currentCart[0], originalGenImage: originalGenImage}))
  };

  useMemo(() => { 
    if(!productListInfo){
      dispatch(storePrintfulProducts(currentProducts, dispatch))
    };

  // eslint-disable-next-line
  }, [productListInfo]);

  const HandleLoadingDisplay = () => {
    if(productListLoading){
      return (
        <CircularLoadingContainer>
          <CircularProgress 
            color='secondary' 
            size={'10rem'} 
            thickness={4} 
            disableShrink
            sx={{animationDuration: '550ms'}}
          />
        </CircularLoadingContainer>
      )
    };

    return (
      <Grid sx={{flex: '6', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {
          productListInfo?.map((product) => (
            <ProductCard
              key                        = { product?.id         }
              productSelectionCallback   = { handleAddProduct           }
              quantityChange             = { handleUpdateQuantity       }
              selectedProducts           = { selectedProducts ?? []     }
              productInfo                = { product             }
              // variantInfo                = { product?.variants            }
              currentCart = { currentCart }
            />
          ))
        }
      </Grid>
    );
  };

  return (
    <ParentContainer>
      <ProductCardContainer sx={{width: '100%'}}>
        <HandleLoadingDisplay sx={{flex: '5'}}/>
        <Grid sx={{display: 'flex', flex: '1', justifyContent: 'space-between', alignItems: 'center'}}>
          <PlacementBackButton
            variant = 'contained'
            color   = 'secondary' 
            onClick = {() => navigate('/createTat/0')}
            sx={{padding: '1.5rem', backgroundColor: 'white'}}
          >
            <ArrowBackIcon sx={{fontSize: '2rem', color: `${theme.palette.primary.main}`}} />
          </PlacementBackButton>
          <Button 
            variant='contained' 
            color='primary' 
            sx={{
              margin: '1rem', 
              width: '100%', 
              height: '3rem',
            }}
            disabled={currentCart.length < 1}
            onClick={() => {
              updateCartImage()
              navigate('/createTat/2')
            }}
          >
            <Typography variant='h5' sx={{color: 'white'}}>
              Next Step
            </Typography>
          </Button>
        </Grid>
      </ProductCardContainer>
    </ParentContainer>
  )
}

export default SelectProduct;