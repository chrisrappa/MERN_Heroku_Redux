import React from 'react';
import { 
  Autocomplete,
  Button, 
  Grid,
  TextField, 
} from '@mui/material';
import states from 'states-us';

function PaymentDetailsAddressEdit({
  paymentUpdateforSubmit,
  setPaymentUpdateforSubmit,
  setEditBillingOpen
}) {

  const handleCardInfoChange = (fieldToChange, newData) => {

    setPaymentUpdateforSubmit((prev) => ({
      ...prev,
      [fieldToChange]: newData
    }));
  };

  return (
    <Grid item sx={{display: 'flex', flexDirection: 'row', width: '100%', padding: '1rem', height: '100%'}}>
      <Grid item xs={12}>
        <TextField 
          color='secondary'
          label="First Name" 
          fullWidth 
          required 
          sx={{margin: '1rem 0'}}
          value={paymentUpdateforSubmit?.firstName}
          onChange={(e) => handleCardInfoChange('firstName', e.target.value)}
        />
        <TextField 
          color='secondary'
          label="Last Name" 
          fullWidth 
          required 
          sx={{margin: '1rem 0'}}
          value={paymentUpdateforSubmit?.lastName}
          onChange={(e) => handleCardInfoChange('lastName', e.target.value)}
        />
        <TextField 
          color='secondary'
          label="Email" 
          fullWidth 
          required 
          sx={{margin: '1rem 0'}}
          value={paymentUpdateforSubmit?.email}
          onChange={(e) => handleCardInfoChange('email', e.target.value)}
        />
        <TextField
          color='secondary'
          label="Address Line 1" 
          fullWidth 
          required
          sx={{margin: '1rem 0'}}
          value={paymentUpdateforSubmit?.addressOne}
          onChange={(e) => handleCardInfoChange('addressOne', e.target.value)}
        />
        <TextField
          color='secondary'
          label="Address Line 2" 
          fullWidth 
          sx={{margin: '1rem 0'}}
          value={paymentUpdateforSubmit?.addressTwo}
          onChange={(e) => handleCardInfoChange('addressTwo', e.target.value)}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              color='secondary'
              label="City" 
              fullWidth 
              required 
              value={paymentUpdateforSubmit?.city}
              onChange={(e) => handleCardInfoChange('city', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              sx={{width: '100%'}}
              id="combo-box-demo"
              options={states}
              getOptionLabel={(option) => `${option.name} - ${option.abbreviation}`}
              renderInput={(params) => <TextField {...params} label="State" />}
              onChange={(event, newValue) => {
                handleCardInfoChange('state', newValue?.abbreviation);
                handleCardInfoChange('stateName', newValue?.name);
              }}
              defaultValue={states.find(state => state.abbreviation === paymentUpdateforSubmit.state)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              disabled
              color='secondary'
              label="Country" 
              fullWidth 
              required
              value={paymentUpdateforSubmit?.country}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              color='secondary'
              label="Zip Code" 
              fullWidth 
              required
              value={paymentUpdateforSubmit?.zipCode}
              onChange={(e) => handleCardInfoChange('zipCode', e.target.value)}
            />
          </Grid>
          <Grid 
            item 
            sx={{
              display: 'flex',
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button 
              type="submit" 
              variant="contained" 
              color="secondary"
              onClick={() => setEditBillingOpen(false)}
            >
              Done
            </Button>
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={() => setEditBillingOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PaymentDetailsAddressEdit;