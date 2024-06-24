import React, { useState } from 'react';
import { 
  Button, 
  Checkbox, 
  Dialog, 
  FormControl, 
  FormControlLabel, 
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography, 
} from '@mui/material';
import { deleteCardInfo, updatePaymentBillingData } from '../../actions/userActions';
import { useDispatch } from 'react-redux';
import { useToast } from '../../libs/toast';
import PaymentDetailsAddressEdit from './PaymentDetailsAddressEdit';

function DetailsPaymentDialogue({
  userId,
  selectedPayment,
  updatePaymentView,
}) {

  const toast = useToast();
  const dispatch = useDispatch();

  const [month, setMonth] = useState(selectedPayment?.card?.exp_month);
  const [year, setYear] = useState(selectedPayment?.card?.exp_year);
  const [editBillingOpen, setEditBillingOpen] = useState(false);
  const [paymentUpdateforSubmit, setPaymentUpdateforSubmit] = useState({
    cardName         : selectedPayment?.cardName,
    cardNumber       : selectedPayment?.cardNumber, 
    expiryMonth      : month,
    expiryYear       : year,
    cvv              : selectedPayment?.cvv,
    email            : selectedPayment?.email,
    addressOne       : selectedPayment?.addressOne,
    addressTwo       : selectedPayment?.addressTwo,
    city             : selectedPayment?.city,
    state            : selectedPayment?.state,
    stateName        : selectedPayment?.stateName,
    zipCode          : selectedPayment?.zipCode,
    country          : selectedPayment?.country,
    countryName      : selectedPayment?.countryName,
    paymentMethodId  : selectedPayment?.paymentMethodId,
    stripeCustomerId : selectedPayment?.stripeCustomerId,
    defaultPayment   : selectedPayment?.defaultPayment ?? false,
    dbPaymentId      : selectedPayment?._id
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 16}, (_, i) => (currentYear + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));

  const handleDeletePaymentMethod = () => {
    dispatch(deleteCardInfo(userId, selectedPayment?._id))
    .then((response) => {
      if(response === 200){
        toast.success('Payment Method Deleted!');
      } else {
        toast.error(response);
      }
    })
  };

  const updatePaymentInfo = () => {
    dispatch(updatePaymentBillingData(userId, paymentUpdateforSubmit));
  };

  return (
    <Grid container sx={{display: 'flex', flexWrap: 'nowrap', flexDirection: 'column', justifyContent: 'space-between', widht: '100%', height: '100%'}}>
      <Grid container sx={{display: 'flex', flex: 8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Grid item sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Typography variant='h5' sx={{width: '100%', padding: '0.5rem 0'}}>
            Edit Payment Method
          </Typography>
        </Grid>
        {/* Add back in if we capture name information */}
        {/* <Grid item sx={{flex: '1', width: '100%'}}>
          <Typography variant='h6' sx={{padding: '0.5rem'}}>
            Name On Card
          </Typography>
          <Grid 
            item
            sx={{
              display: 'flex',
              width: '100%', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <TextField
              variant='outlined'
              color='secondary'
              value={firstName}
              sx={{flex: '1', padding: '0.5rem'}}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              variant='outlined'
              color='secondary'
              value={lastName}
              sx={{flex: '1', padding: '0.5rem'}}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid> */}
        <Grid item sx={{width: '100%'}}>
          <Typography variant='h6' sx={{padding: '0.5rem 0'}}>
            Expiration Date
          </Typography>
          <Grid container sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Grid item sx={{flex: '1', padding: '0.5rem 0'}}>
              <FormControl sx={{width: '100%'}}>
                <InputLabel id="demo-simple-select-label" color='secondary'>Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  color='secondary'
                  value={month}
                  label="Age"
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {
                    months.map((month) => (
                      <MenuItem value={month}>{month}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item sx={{flex: '1', padding: '0.5rem'}}>
              <FormControl sx={{width: '100%'}}>
                <InputLabel id="demo-simple-select-label" color='secondary'>Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  color='secondary'
                  value={year}
                  label="Age"
                  onChange={(e) => setYear(e.target.value)}
                >
                  {
                    years.map((year) => (
                      <MenuItem value={year}>{year}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'cetner', width: '100%'}}>
          <FormControlLabel 
            control={
              <Checkbox 
                checked={paymentUpdateforSubmit?.defaultPayment} 
                color='secondary' 
                onChange={() => setPaymentUpdateforSubmit({
                    ...paymentUpdateforSubmit, defaultPayment: !paymentUpdateforSubmit.defaultPayment
                  })
                }
              />
            } 
            label="Set as default payment method" />
        </Grid>
        {/* Add this back in when we want to capture billing address */}
        {/* <Paper elevation={3} item sx={{display: 'flex', flexDirection: 'column', width: '100%', flex: '1', padding: '1rem', position: 'relative'}}>
          <Typography variant='h6' fontWeight={500}>
            Billing Address
          </Typography>
          <Typography>
            {paymentUpdateforSubmit?.firstName + ' '}
            {paymentUpdateforSubmit?.lastName}
          </Typography>
          <Typography>
            {paymentUpdateforSubmit?.addressOne}
          </Typography>
          <Typography>
            {paymentUpdateforSubmit?.addressTwo}
          </Typography>
          <Typography>
          {paymentUpdateforSubmit?.city + ", "}
          {paymentUpdateforSubmit?.state + " "}
          {paymentUpdateforSubmit?.zipCode    }
          </Typography>
          <Typography>
            {paymentUpdateforSubmit?.countryName}
          </Typography>
          <IconButton 
            onClick={() => setEditBillingOpen(true)}
            sx={{
              border: '1px solid gray', 
              position: 'absolute', 
              right: '0', 
              top: '0',
              marginTop: '0.25rem',
              marginRight: '0.25rem'
            }}
          >
            <Edit />
          </IconButton>
        </Paper> */}
        
      </Grid>
      <Dialog open={editBillingOpen} sx={{padding: '1rem'}}>
        <PaymentDetailsAddressEdit 
          currentCardInfo={selectedPayment}
          userId={userId}
          setEditBillingOpen={setEditBillingOpen}
          paymentUpdateforSubmit={paymentUpdateforSubmit}
          setPaymentUpdateforSubmit={setPaymentUpdateforSubmit}
        />
      </Dialog>
      <Grid 
        item 
        sx={{
          display: 'flex',
          flex: '1',
          width: '100%',
          height: '100%',
          marginTop: '1rem',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Grid item>
          <Button 
            type="submit" 
            variant="contained" 
            color="secondary"
            onClick={() => updatePaymentInfo()}
            sx={{marginRight: '1rem'}}
          >
            Update Payment
          </Button>
          <Button
            variant='contained'
            onClick={() => handleDeletePaymentMethod()}
            sx={{backgroundColor: 'red', color: 'white'}}
          >
            Delete Payment
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={() => updatePaymentView('List')}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>

  )
}

export default DetailsPaymentDialogue;