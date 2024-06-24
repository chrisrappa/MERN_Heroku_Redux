import { 
  // useEffect, 
  // useMemo, 
  useState 
} from "react";
import { 
  // Button, 
  // Dialog, 
  // DialogActions, 
  // DialogContent, 
  // DialogTitle, 
  // FormControl, 
  // Grid, 
  // IconButton, 
  // InputLabel, 
  // ListSubheader, 
  // MenuItem, 
  // OutlinedInput,
  // Select, 
  TextField, 
  // Typography, 
} from "@mui/material";
import { 
  // DialogueSelectionHeaderGrid, 
  EditProfileInfoContainer, 
  EditProfileInfoLabelTypography, 
  ProfileInfoDetailsCard, 
  // SubscriptionStatusContainer 
} from "../styled";
// import { Edit } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { createUserMembership } from "../../../actions/orderPlacementActions";
import ProfileWallet from "../ProfileWallet";
// import axios from "axios";
// import { useToast } from "../../../libs/toast";

export default function ProfileDetails({
  userInfo,
  membershipOptions,
  membershipPrices,
}){

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const toast = useToast();

  // const userStripePaymentMethods = useSelector((state) => state?.stripeData?.userStripePaymentMethods);
  // const stripeCustomerId = useSelector((state) => state?.userData?.stripeCustomerId);

  // const [editProfileInfoOpen, setEditProfileInfoOpen]     = useState(false) ;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)  ;
  // const [currentPlan, setCurrentPlan]                     = useState(null)  ;
  // const [planInfo, setPlanInfo]                           = useState(null)  ;
  // const [planName, setPlanName]                           = useState(null)  ;
  
  // const handleEditProfileInfoClose = () => {
  //   setEditProfileInfoOpen(false);
  // };

  // const handleCancelSubscription = () => {
  //   axios.delete(
  //     `${process.env.REACT_APP_API_PATH}api/stripe/cancelSubscription`,
  //     { 
  //       data: {
  //         subscriptionId: planInfo?.id 
  //       }
  //     }
  //   )
  //   .then((response) => {
  //     if(response.status === 200){
  //       toast.success('Subscription Cancelled');
  //     } else {
  //       toast.error('Error Cancelling Subscription');
  //       console.error('Sub cancel error: ', response);
  //     };
  //   });

  //   setEditProfileInfoOpen(false);
  // };

  // const handleUpdateSubscription = () => {
  //   if(currentPlan !== planInfo?.items?.data[0]?.plan.id){
  //     axios.post(
  //       `${process.env.REACT_APP_API_PATH}api/stripe/updateSubscription`,
  //       {
  //         subscriptionId: planInfo.id,
  //         newPriceId: currentPlan
  //       }
  //     )
  //     .then((response) => {
  //       if(response.status === 200){
  //         toast.success('Subscription Updated!');
  //       } else {
  //         toast.error('Error updating subscription. Contact Support.');
  //       }
  //     });

  //     setEditProfileInfoOpen(false);
  //   } else {
  //     toast.error('Already subscribed to this plan!');
  //   };
  // };

  // const handleUpdateUserMembershipAndData = () => {
  //   if(planInfo.id){
  //     handleUpdateSubscription();
  //     return;
  //   };

  //   if(currentPlan !== userInfo?.subscription?.id){
  //     dispatch(
  //       createUserMembership(
  //         userInfo?.user_id, 
  //         currentPlan,
  //         selectedPaymentMethod
  //       )
  //     );
  //   };

  //   setEditProfileInfoOpen(false);
  // };

  // const formattedNumber = (value) => {
  //   return new Intl.NumberFormat(
  //     'en-US', { style: 'currency', currency: 'USD' }
  //   )
  //   .format(value/100);
  // };

  // const getUserSubscriptions = async() => {
  //   const {data} = await axios.post(
  //     `${process.env.REACT_APP_API_PATH}api/stripe/getCustomerSubs`, 
  //     { stripeCustomerId }
  //   );

  //   if(data){
  //     setCurrentPlan(data?.plan?.id);
  //     setPlanInfo(data);
  //   }
  // };

  // useMemo(() => {
  //   if(planInfo){
  //     membershipOptions?.map((option) => {
  //       if(option.id === planInfo?.plan?.product){
  //         setPlanName(option.name);
  //       }
  
  //       return null;
  //     })
  //   }
  // }, [planInfo, membershipOptions]);

  // useEffect(() => {
  //  getUserSubscriptions();
  //  // eslint-disable-next-line
  // }, [])
  

  return (
    <>
      <ProfileInfoDetailsCard>
        {/* <SubscriptionStatusContainer container>
          <Grid item>
            <Typography variant='h6'>
              Subscription Status:
            </Typography>
            <Typography variant='body2'>
              Next Bill Date - 01/12/2024
            </Typography>
          </Grid>
          <Grid item sx={{marginLeft: '1.5rem'}}>
            {
              planInfo?.plan?.active ? (
                <Typography variant='h6' color='secondary'>
                  Active
                </Typography>
              ) : (
                <Typography variant='h6' color='red'>
                  Inactive
                </Typography>
              )
            }
          </Grid>
          <Grid 
            item 
            sx={{
              display: 'flex', 
              justifyContent: 'flex-end', 
              flex: '1',
              height: '100%'
            }}
          >
            <IconButton 
              onClick={() => setEditProfileInfoOpen(true)}
              sx={{border: '1px solid gray'}}
            >
              <Edit />
            </IconButton>
          </Grid>
        </SubscriptionStatusContainer>
          <EditProfileInfoContainer>
            <EditProfileInfoLabelTypography>
              Plan
            </EditProfileInfoLabelTypography>
            <TextField
              disabled
              sx={{flex: '4', overflow: 'hidden', marginRight: '1rem'}} 
              value  = {planName} 
              variant='standard'
            />
          </EditProfileInfoContainer> */}
          <EditProfileInfoContainer>
            <EditProfileInfoLabelTypography>
              Email
            </EditProfileInfoLabelTypography>
            <TextField
              disabled
              sx={{flex: '4', overflow: 'hidden', marginRight: '1rem'}} 
              defaultValue  = {userInfo?.email} 
              variant='standard'
            />
          </EditProfileInfoContainer>
      </ProfileInfoDetailsCard>

      <ProfileWallet 
        userInfo={userInfo}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        selectedPaymentMethod={selectedPaymentMethod}
      />

      {/* <Dialog 
        open={editProfileInfoOpen} 
        onClose={handleEditProfileInfoClose} 
        sx={{width: '100%'}}
      >
        <DialogTitle 
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'flex-start'
          }}
        >
          <Typography variant='secondary'>Profile Info</Typography>
        </DialogTitle>
        <DialogContent  sx={{minWidth: '20rem'}}>
          <FormControl sx={{ width: '100%', marginTop: '1rem' }}>
            <Grid container>
              <Grid container 
                sx={{
                  display: 'flex',  
                  width: '100%', 
                  flexDirection: 'column', 
                  marginBottom: '1rem'
                }}
              >
                <DialogueSelectionHeaderGrid item>
                  <Typography>Subscription Payment Method</Typography>
                </DialogueSelectionHeaderGrid>
                <Grid 
                  item 
                  sx={{
                    width: '100%', 
                    flex: '2', 
                    height: '100%', 
                    position: 'relative'
                  }}
                >
                  <FormControl sx={{ width: '100%' }}>
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
                          <InputLabel id="demo-multiple-name-label">Select Payment Method</InputLabel>
                          <Select
                            value={selectedPaymentMethod}
                            color='secondary'
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            input={<OutlinedInput label="Select Payment Method" />}
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
                </Grid>
              </Grid>
              <Grid container sx={{display: 'flex',  width: '100%', flexDirection: 'column', marginBottom: '1rem'}}>
                <DialogueSelectionHeaderGrid item>
                  <Typography>Current Plan</Typography>
                </DialogueSelectionHeaderGrid>
                <Grid 
                  item 
                  sx={{
                    width: '100%', 
                    flex: '2', 
                    height: '100%', 
                    position: 'relative'
                  }}
                >
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-name-label" color='secondary'>Select Plan</InputLabel>
                    <Select 
                      value={currentPlan}
                      onChange={ event => setCurrentPlan(event.target.value)}
                      input={
                        <OutlinedInput 
                          label={'Select Plan'} 
                          color='secondary'
                        />
                      }
                      sx={{width: '100%'}}
                      disabled={!selectedPaymentMethod}
                    >
                      {
                        membershipOptions?.length && membershipOptions?.map(option => {
                          const selectedOptionPrices = membershipPrices?.filter(price => price.product === option.id);
                          const menuItemGroup = [
                            <ListSubheader>{option.name}</ListSubheader>,
                            selectedOptionPrices?.map(selected => (
                              <MenuItem key={selected.id} value={selected.id}>
                                {selected.interval_count} {selected.interval} - {formattedNumber(selected.amount)}
                              </MenuItem>
                            ))
                          ];

                          return menuItemGroup;
                        })
                        .flat()
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid 
                container 
                sx={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '0!important', 
                  flexDirection: 'column',
                }}
              >
                <DialogueSelectionHeaderGrid item>
                  <Typography sx={{marginRight: '1rem'}}>Email</Typography>
                </DialogueSelectionHeaderGrid>
                <Grid item sx={{flex: '2', width: '100%'}}>
                  <TextField
                    sx={{overflow: 'hidden', width: '100%'}} 
                    defaultValue  = {userInfo?.email} 
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Grid container sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
            <Grid item>
              <Button 
                disabled={!planInfo?.plan?.active}
                onClick={() => handleCancelSubscription()}
                sx={{color: 'red', border: '1px solid red'}}
                variant="outlined"
              >
                Cancel Subscription
              </Button>
            </Grid>
            <Grid item>
              <Button 
                color='secondary' 
                onClick={handleEditProfileInfoClose}
                variant="outlined"
                sx={{marginRight: '1rem'}}
              >
                Cancel
              </Button>
              <Button 
                color='secondary' 
                onClick={() => handleUpdateUserMembershipAndData()}
                variant="contained"
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog> */}
    </>
  )
}