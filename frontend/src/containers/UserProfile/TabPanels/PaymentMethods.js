import { Fade, Grid, IconButton } from "@mui/material"
import PaymentModule from "../PaymentModule"
import { 
  AddInfoButton, 
  AddInfoCard, 
  CardGridContainer, 
  CardImageGridContainer, 
  CardInfoTypography, 
  InfoGrid, 
  InformationCard, 
  SecondaryTypography 
} from "../styled"
import { AddBox } from "@mui/icons-material"
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

export default function PaymentMethods({
  userInfo,
  handleDeletePaymentMethod,
}){

  const [methodView, setMethodView] = useState('List');
  const userStripePaymentMethods = useSelector(
    (state) => state?.stripeData?.userStripePaymentMethods
  );

  const showCreditCardImage = (cardType) => {
    switch(cardType){
      case 'visa': 
        return (
          <img 
            src="https://res.cloudinary.com/djrbfvpit/image/upload/v1704054453/CreditCardLogos/VISA-logo_bhjuer.png" 
            alt='visa' 
            height={'75px'}
            width={'125px'}
          />
        )
      case 'mastercard': 
        return (
          <img 
            src='https://res.cloudinary.com/djrbfvpit/image/upload/v1704054453/CreditCardLogos/Mastercard-logo_dqp5ml.png' 
            alt='mastercard' 
            height={'75px'}
            width={'125px'}
          />
        )
      case 'discover': 
        return (
          <img 
            src='https://res.cloudinary.com/djrbfvpit/image/upload/v1704054453/CreditCardLogos/Discover-logo_edxbwq.png' 
            alt='discover' 
            height={'75px'}
            width={'125px'}
          />
        )
      case 'amex': 
        return (
          <img 
            src='https://res.cloudinary.com/djrbfvpit/image/upload/v1704054453/CreditCardLogos/American-Express-Color_pce8pp.png' 
            alt='amex' 
            height={'75px'}
            width={'125px'}
          />
        )
      default: return null;
    };
  };

  switch(methodView){
    case 'List': 
      return (
        <CardGridContainer container>
          {userStripePaymentMethods?.map((paymentMethod) => (
            <Fade in timeout={1000} key={paymentMethod?.id}>
              <Grid
                item
                sx={{
                  minHeight: '10rem',
                  margin: '1rem',
                }}
              >
                <InformationCard sx={{position: 'relative'}}>

                  <IconButton 
                    onClick={() => {
                      handleDeletePaymentMethod(paymentMethod)
                    }}
                    sx={{
                      border: '1px solid red', 
                      position: 'absolute', 
                      right: '0', 
                      top: '0',
                      marginTop: '0.25rem',
                      marginRight: '0.25rem',
                      color: 'red'
                    }}
                  >
                    <DeleteIcon/>
                  </IconButton>
                  <InfoGrid container>
                    <CardImageGridContainer container>
                      {showCreditCardImage(paymentMethod?.card?.brand)}
                    </CardImageGridContainer>
                    <CardInfoTypography>...{paymentMethod?.card?.last4}</CardInfoTypography>
                    <CardInfoTypography>
                      {paymentMethod?.card?.exp_month}/{paymentMethod?.card?.exp_year}
                    </CardInfoTypography>
                  </InfoGrid>
                </InformationCard>
              </Grid>
            </Fade>

          ))}
          
          <Fade in timeout={1000}>
            <AddInfoCard>
              <AddInfoButton 
                color   = 'secondary'
                sx      = {{
                  display: 'flex', 
                  justifyContent: 'space-evenly', 
                  width: '100%',
                  height: '100%'
                }}
                onClick = {() => setMethodView('Add')}
              >
                <AddBox sx={{fontSize: '3rem'}} />
                <SecondaryTypography>Add Payment Method</SecondaryTypography>
              </AddInfoButton>
            </AddInfoCard> 
          </Fade>
        </CardGridContainer>
      )
    case 'Add':
      return (
        <PaymentModule
          userId            = { userInfo?.user_id           }
          stripeCustomerId  = { userInfo?.stripeCustomerId  }
          updatePaymentView = { setMethodView               }
        /> 
      )
    // Removing Edit capability for now for simplicity sake
    // case 'Edit':
    //   return (
    //     <DetailsPaymentDialogue
    //       userId            = { userInfo?.user_id           }
    //       selectedPayment   = { selectedPayment             }
    //       stripeCustomerId  = { userInfo?.stripeCustomerId  }
    //       updatePaymentView = { setMethodView               }
    //     /> 
    //   )
    default: return undefined;
  }
}