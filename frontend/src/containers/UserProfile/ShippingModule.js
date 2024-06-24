import React, { useState } from 'react';
import { 
  Autocomplete,
  Button, 
  Grid, 
  TextField, 
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/userActions';
import { useToast } from '../../libs/toast';
import states from 'states-us';

function ShippingModule({
  userId,
  setChangeShipping,
}) {

  const dispatch = useDispatch();
  const toast    = useToast()   ;

  const [addShippingInfo, setAddShippingInfo] = useState({
    firstName   : ''              ,
    lastName    : ''              ,
    addressOne  : ''              ,
    addressTwo  : ''              ,
    city        : ''              ,
    stateCode   : ''              ,
    stateName   : ''              ,
    zipCode     : ''              ,
    country     : 'US'            ,
    countryName : 'United States'
  });

  const handleShippingDataChange = (fieldToChange, newData) => {
    setAddShippingInfo((prev) => ({
      ...prev,
      [fieldToChange]: newData
    }))
  };

  const saveShippingData = () => {
    dispatch(
      saveShippingInfo(
        addShippingInfo   , 
        userId            , 
        dispatch
      )
    ).then((response) => {
      if(response === 200){
        toast.success('Shipping Method Added!');
      } else {
        toast.error(response);
      }
    })

    setChangeShipping(false);
  };

  return (
    <>
      <TextField
        color='secondary'
        label="First Name" 
        fullWidth 
        required
        sx={{margin: '1rem 0'}}
        value={addShippingInfo?.firstName}
        onChange={(e) => handleShippingDataChange('firstName', e.target.value)}
      />
      <TextField 
        color='secondary'
        label="Last Name" 
        fullWidth 
        required
        sx={{margin: '1rem 0'}}
        value={addShippingInfo?.lastName}
        onChange={(e) => handleShippingDataChange('lastName', e.target.value)} 
      />
      <TextField
        color='secondary'
        label="Address Line 1" 
        fullWidth 
        required
        sx={{margin: '1rem 0'}}
        value={addShippingInfo?.addressOne}
        onChange={(e) => handleShippingDataChange('addressOne', e.target.value)}  
      />
      <TextField
        color='secondary'
        label="Address Line 2" 
        fullWidth
        sx={{margin: '1rem 0'}}
        value={addShippingInfo?.addressTwo}
        onChange={(e) => handleShippingDataChange('addressTwo', e.target.value)} 
      />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            color='secondary'
            label="City" 
            fullWidth 
            required
            value={addShippingInfo?.city}
            onChange={(e) => handleShippingDataChange('city', e.target.value)}
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
              handleShippingDataChange('stateCode', newValue?.abbreviation);
              handleShippingDataChange('stateName', newValue?.name);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            color='secondary'
            label="Country" 
            fullWidth 
            required
            value={addShippingInfo?.country}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            color='secondary'
            label="Zip Code" 
            fullWidth 
            required
            value={addShippingInfo?.zipCode}
            onChange={(e) => handleShippingDataChange('zipCode', e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid 
        container 
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem'
        }}
      >
        <Button
          variant='contained' 
          color='secondary'
          onClick={() => saveShippingData()}
        >
          Save Address
        </Button>
        <Button 
          variant='outlined' 
          color='secondary'
          onClick={() => setChangeShipping(false)}
        >
          Cancel
        </Button>
      </Grid>
    </>
  )
}

export default ShippingModule;