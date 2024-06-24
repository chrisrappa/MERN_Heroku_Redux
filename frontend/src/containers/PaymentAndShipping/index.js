import React, 
{ 
  // useMemo, 
  useState 
} from 'react';
import {
  Typography,
  Grid,
  Button,
  CircularProgress,
  // Fade,
  // Radio,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  CircularLoadingContainer,
  OptionAccordion, 
  OptionAccordionDetails, 
  OptionAccordionSummary,
  DetailsProductGridContainer, 
  ImageThumbnailContainer, 
  ProductOrderedCard, 
  CheckoutNavigationButtonContainer,
  // CardGridContainer
} from './styled';
import { 
  getUserOrdersInfo,
  saveOrderInfo
} from '../../actions/orderPlacementActions';
import {
  saveShippingInfo,
  // processPayment,
  saveArtworkInUserProfile
} from '../../actions/userActions';
import ShippingModule from './ShippingModule';
import { storeImagesInCloudinary } from '../../helpers/dbImageSave';
import { useToast } from '../../libs/toast';
// import PaymentStripe from './PaymentStripe';
// import { 
//   AddInfoButton, 
//   AddInfoCard, 
//   CardImageGridContainer, 
//   CardInfoTypography, 
//   InfoGrid, 
//   InformationCard, 
//   SecondaryTypography 
// } from '../UserProfile/styled';
// import { AddBox } from '@mui/icons-material';
// import { showCreditCardImage } from './helpers';
// import { placePrintfulOrder } from '../../actions/printfulActions';
// import { calculateOrderCostTotals } from '../../actions/cartActions';
import { solititationAgreenment } from '../../staticData/creationSteps';

function PaymentAndShipping(){

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast    = useToast()   ;

  const userInfo             = useSelector((state) => state?.userData?.loginInfo)                     ;
  const paymentSubmitting    = useSelector((state) => state?.userData?.paymentInfo?.submittingPayment);
  const cartItems            = useSelector((state) => state.cartInfo.cartItems)                       ;
  const orderSubmitting      = useSelector((state) => state?.orderData?.orderSubmitting);
  const stepData             = useSelector((state) => state?.stepData?.currentInfo?.artworkProps);            
  
  const [optionsExpanded, setOptionsExpanded]         = useState(0)     ;
  const [changeShipping, setChangeShipping]           = useState(false) ;
  const [email, setEmail]                             = useState(userInfo?.email)  ;
  const [solicitation, setSolicitation]               = useState(true);

  const [shippingData, setShippingData] = useState({
    firstName   : null             ,
    lastName    : null             ,
    addressOne  : null             ,
    addressTwo  : null             ,
    city        : null             ,
    stateName   : null             ,
    stateCode   : null             ,
    zipCode     : null             ,
    countryName : 'United States',
    country     : 'US'
  });

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleShippingDataChange = (fieldToChange, newData) => {
    setShippingData((prev) => ({
      ...prev,
      [fieldToChange]: newData
    }));
  };

  const saveShippingData = () => {
    dispatch(
      saveShippingInfo(
        shippingData    , 
        userInfo.user_id, 
        dispatch
      )
    ).then((response) => {
      if(response === 200){
        toast.success('Shipping Method Saved!');
      } else {
        toast.error(response);
      };
    });

    setChangeShipping(false);
  };

  const createCloudinaryUrl = async() => {
    return await storeImagesInCloudinary(stepData?.base64Image, userInfo?.user_id)
    .then((res) => res?.data );
  };  

  const submitPaymentDispatcher = async() => {

    const hostedBaseImageUrl = await createCloudinaryUrl();

    dispatch(
      saveArtworkInUserProfile(
        {
          colors: stepData?.colors,
          styles: stepData?.styles,
          lightings: stepData?.lightings,
          prompt: stepData?.prompt,
          hostedBaseImageUrl: hostedBaseImageUrl,
          upscaleJobId: '',
          upscaleProcessing: false
        },
        userInfo?.user_id,
        dispatch
      )
    )
    .then((response) => {

      if(response.status === 200){

        const orderDataPostPayment = {
          isPaid          : true                              ,
          orderItems      : [{...cartItems[0], completedBaseImageUrl: hostedBaseImageUrl}],
          paidAt          : Date.now()                        ,
          orderStatus     : 'processing'                      ,
          isDelivered     : false                             ,
          deliveredAt     : 'n/a'                             ,
          totalPrice      : 0.00                              ,
          shippingData    : shippingData                      ,
          email           : email                             ,
          user            : userInfo?.user_id
        }
    
        dispatch(saveOrderInfo(orderDataPostPayment, dispatch))
        .then((saveOrderResponse) => {
    
          console.log('save order response', saveOrderResponse);
          if(saveOrderResponse?.status === 200){
            dispatch(getUserOrdersInfo(userInfo?.user_id, dispatch));
            toast.success('Order Placed!');
            navigate('/profile/track-orders');
          }
        })
        .catch((error) => {
          toast.error('Order Not Saved, Contact Support');
          console.error(error);
        });

      } else {
        toast.error('There was a problem with your order: ', response);
      }
    });

    
  };

  const handleButtonsDisplay = () => {
    switch(optionsExpanded){
      case 0: 
        return(
          <CheckoutNavigationButtonContainer container>
            <Grid item>
              <Button 
                onClick={() => navigate('/cart')}
                color='secondary'
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained"
                color='secondary'
                onClick={() => setOptionsExpanded(1)}
                disabled={cartItems?.length < 1 || !shippingData?.zipCode}
                sx={{color: 'white'}}
              >
                Enter Email
              </Button>
            </Grid>
          </CheckoutNavigationButtonContainer>
        )
      case 1: 
        return(
          <CheckoutNavigationButtonContainer container>
            <Grid item>
              <Button 
                color='secondary'
                onClick={() => setOptionsExpanded(0)}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained"
                color='secondary'
                onClick={() => {
                  setOptionsExpanded(2);
                  // handleTotalPriceCalculation();
                }}
                disabled={!validateEmail()}
                sx={{color: 'white'}}
              >
                Review Order
              </Button>
            </Grid>
          </CheckoutNavigationButtonContainer>
        )
      case 2: 
        return(
          <CheckoutNavigationButtonContainer container>
            <Grid item>
              <Button 
                color='secondary'
                onClick={() => setOptionsExpanded(1)}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant   = "contained"
                color     = 'secondary'
                onClick   = {() => submitPaymentDispatcher()}
                disabled  = {shippingData?.addressOne === null}
                sx={{color: 'white'}}
              >
                Complete Order
              </Button>
            </Grid>
          </CheckoutNavigationButtonContainer>
        )
      default: return;
    }
  };
      
  return (
    <Grid 
      container
      sx={{
        display       : 'flex'         ,
        width         : '100%'         ,
        flexDirection : 'column'       ,
        justifyContent: 'space-between'
      }}
    >
      <Grid
        item 
        sx={{
          height        : '95%'          , 
          display       : 'flex'         , 
          flexDirection : 'column'       , 
          justifyContent: 'space-between',
          marginTop     : '2rem'         ,
          // marginLeft    : '1rem'         ,
          marginRight   : '1rem'         ,
          flex          : '9'            ,
          width         : '100%'
        }}
      >
        { (orderSubmitting || paymentSubmitting) ? (
          <CircularLoadingContainer>
            <CircularProgress color='primary' size={'10rem'}/>
          </CircularLoadingContainer>

          )  :  (
          
          <Grid container sx={{display: 'flex', flexDirection: 'column'}}>
          
            <OptionAccordion expanded = { optionsExpanded === 0 } >
              <OptionAccordionSummary aria-controls="style">
                <Typography variant='secondary'>Shipping</Typography>
              </OptionAccordionSummary>
              <OptionAccordionDetails>
                <Grid item xs={12}>
                  <ShippingModule
                    changeShipping            = { changeShipping            }
                    // shippingLikePayment       = { shippingLikePayment       }
                    shippingData              = { shippingData              }
                    setShippingData           = { setShippingData           }
                    handleShippingDataChange  = { handleShippingDataChange  }
                    setChangeShipping         = { setChangeShipping         }
                    userInfo                  = { userInfo                  }
                    saveShippingData          = { saveShippingData          }
                    // setShippingLikePayment    = { setShippingLikePayment    }
                  />
                </Grid>
              </OptionAccordionDetails>
            </OptionAccordion>
            <OptionAccordion expanded={optionsExpanded === 1} >
              <OptionAccordionSummary aria-controls="style">
                <Typography variant='secondary'>Email</Typography>
              </OptionAccordionSummary>
              <OptionAccordionDetails>
                <TextField
                  color='secondary'
                  label="Email" 
                  fullWidth 
                  required
                  sx={{margin: '1rem 0'}}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <Grid>
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        checked={solicitation} 
                        onChange={
                          (e) => setSolicitation(e.target.checked)
                        }
                      />
                    } 
                    label={solititationAgreenment} 
                  />
                </Grid> */}
              </OptionAccordionDetails>
            </OptionAccordion>
            <OptionAccordion expanded={optionsExpanded === 2}  >
              <OptionAccordionSummary aria-controls="style">
                <Typography variant='secondary'>Order Summary</Typography>
              </OptionAccordionSummary>
              <OptionAccordionDetails>
                {cartItems?.map((item) => (
                  <ProductOrderedCard>
                    <DetailsProductGridContainer container>
                      <ImageThumbnailContainer item>
                        <img 
                          src     = { item?.originalGenImage } 
                          alt     = '' 
                          height  = '100%' 
                          width   = '100%'
                          style   = {{
                            border: '1px solid gray'
                          }}
                        />
                      </ImageThumbnailContainer>
                    </DetailsProductGridContainer>
                    <Grid container sx={{display: 'flex', flex: '1', flexDirection: 'column'}}>
                      <Typography variant='secondary'>{item?.name}</Typography>
                      <Typography variant='secondary'>Price: ${(item?.price / 100).toFixed(2)}</Typography>
                      <Typography variant='secondary'>Qty: {item?.quantity}</Typography>
                    </Grid>
                  </ProductOrderedCard>
                ))}
              </OptionAccordionDetails>
            </OptionAccordion>
          </Grid>
        )}
      </Grid>
      <Grid 
        item 
        sx={{
          display: 'flex', 
          flex: '1', 
          justifyContent: 'flex-end', 
          margin: '1rem'
        }}
      >
        { handleButtonsDisplay() }
      </Grid>
    </Grid>
  );
};

export default PaymentAndShipping;