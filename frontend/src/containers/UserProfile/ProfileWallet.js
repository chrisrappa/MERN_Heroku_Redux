import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  OutlinedInput, 
  Select, 
  Typography 
} from "@mui/material";
import { 
  AddButtonCard, 
  CreditAdditionButtons, 
  CreditBalanceGridContainer, 
  CreditBalanceGridItem, 
  ProfileWalletCard, 
  ProfileWalletContainer 
} from "./styled";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../libs/toast";
import { purchaseCredits } from "../../actions/orderPlacementActions";

export default function ProfileWallet({
  userInfo,
  setSelectedPaymentMethod,
  selectedPaymentMethod,
}){

  const navigate = useNavigate() ;
  const theme    = useTheme()    ;
  const dispatch = useDispatch() ;
  const toast    = useToast()    ;

  const userStripePaymentMethods = useSelector((state) => state?.stripeData?.userStripePaymentMethods);

  const [addCreditsOpen, setAddCreditsOpen]             = useState(false) ;
  const [creditPurchaseAmount, setCreditPurchaseAmount] = useState(0)     ;
  const [creditCost, setCreditCost]                     = useState(0);

  const handleClickOpen = (creditAmount) => {
    setCreditPurchaseAmount(creditAmount);
    switch(creditAmount){
      case 50: setCreditCost(250);
      break;
      case 100: setCreditCost(500);
      break;
      case 200: setCreditCost(1000);
      break;
      default: return null;
    };
    
    setAddCreditsOpen(true);
  };

  const handleClose = () => {
    setAddCreditsOpen(false);
  };

  const handleChargePaymentMethod = () => {
    dispatch(
      purchaseCredits(
        selectedPaymentMethod , 
        creditPurchaseAmount  , 
        creditCost            ,
        userInfo?.user_id     ,
        dispatch
      )
    )
    .then((response) => {
      if(response === 200){
        toast.success('Credits Added!');
      } else {
        toast.error(response);
      }
    })

    setAddCreditsOpen(false);
  };

  return (
    <>
      <ProfileWalletCard>
        <ProfileWalletContainer>
          <Typography
            variant='primary' 
            sx={{
              fontSize: '2rem', 
              textAlign: 'left', 
              width: '100%',
              flex: '1'
            }}
          >
            Wallet
          </Typography>
          <CreditBalanceGridContainer container>
            <CreditBalanceGridItem>
              <Typography
                variant='secondary' 
                sx={{fontSize: '1.25rem', marginRight: '1rem'}}
              >
                Art-Gen Credit Balance:
              </Typography>
              <Typography 
                variant='h5' 
                color='secondary'
              >
                {userInfo?.userCredits}
              </Typography>
            </CreditBalanceGridItem>
            {/* <CreditAdditionButtons item>
              <AddButtonCard onClick={() => handleClickOpen(50)} variant="contained">
                <Typography variant='h5'>
                  + 50 
                </Typography>
              </AddButtonCard>
              <AddButtonCard onClick={() => handleClickOpen(100)} variant="contained">
                <Typography variant='h5'>
                  + 100
                </Typography>
              </AddButtonCard>
              <AddButtonCard onClick={() => handleClickOpen(200)} variant="contained">
                <Typography variant='h5'>
                  + 200
                </Typography>
              </AddButtonCard>
            </CreditAdditionButtons> */}
          </CreditBalanceGridContainer>
        </ProfileWalletContainer>
      </ProfileWalletCard>
      <Dialog open={addCreditsOpen} onClose={handleClose}>
        <DialogTitle sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant='secondary'>
            Confirm Purchase of
          </Typography>
          <Typography variant='primary' sx={{color: `${theme.palette.secondary.main}`, fontWeight: '700'}}>{creditPurchaseAmount}</Typography>
          <Typography variant='secondary'>Credits @ ${parseFloat(creditCost/100).toFixed(2)}</Typography>
        </DialogTitle>
        <DialogContent sx={{ minWidth: '20rem' }}>
          <FormControl sx={{ width: '100%', marginTop: '1rem' }}>
            {!userStripePaymentMethods.length ? (
              <Button
                variant='contained' 
                color='secondary'
                onClick={() => navigate('/profile/payments')}
              >
                Add Payment Method
              </Button>
              ) : (
                <>
                  <InputLabel id="demo-multiple-name-label" color="secondary">Select Payment Method</InputLabel>
                  <Select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    input={<OutlinedInput label="Select Payment Method" color="secondary" />}
                  >
                    {userStripePaymentMethods.map((method) => (
                      <MenuItem
                        key={method?.card?.id}
                        value={method}
                      >
                        {method?.card?.last4 ? `...${method?.card?.last4}` : method?.card?.brand}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )
            }
            
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            color='secondary' 
            onClick={handleClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            color='secondary' 
            onClick={handleChargePaymentMethod}
            disabled={!selectedPaymentMethod}
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}