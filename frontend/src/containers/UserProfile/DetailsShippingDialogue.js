import React, { useState } from 'react';
import { 
  Autocomplete,
  Button, 
  Checkbox, 
  FormControlLabel, 
  Grid,
  TextField,
  Typography, 
} from '@mui/material';
import { deleteShippingInfo, updateShippingData } from '../../actions/userActions';
import { useDispatch } from 'react-redux';
import { useToast } from '../../libs/toast';
import states from 'states-us';

function DetailsShippingDialogue({
  userId,
  selectedAddress,
  updateShippingView,
}) {

  const toast = useToast();
  const dispatch = useDispatch();

  const handleDeleteShippingAddress = () => {
    dispatch(deleteShippingInfo(userId, selectedAddress?._id))
    .then((response) => {
      if(response === 200){
        toast.success('Shipping Method Deleted!');
      } else {
        toast.error(response);
      }
    });

    updateShippingView('List');
  };

  const [editShippingInfo, setEditShippingInfo] = useState({
    firstName        : selectedAddress.firstName,
    lastName         : selectedAddress.lastName,
    addressOne       : selectedAddress?.addressOne,
    addressTwo       : selectedAddress?.addressTwo,
    city             : selectedAddress?.city,
    state            : selectedAddress?.state,
    stateName        : selectedAddress?.stateName,
    stateCode        : selectedAddress?.stateCode,
    zipCode          : selectedAddress?.zipCode,
    defaultShipping  : selectedAddress?.defaultShipping ?? false,
    dbShippingId     : selectedAddress?._id,
    country          : 'US'            ,
    countryName      : 'United States'
  });

  const handleShippingDataChange = (fieldToChange, newData) => {
    setEditShippingInfo((prev) => ({
      ...prev,
      [fieldToChange]: newData
    }))
  };

  const saveShippingData = () => {
    dispatch(
      updateShippingData(
        userId, 
        editShippingInfo, 
        dispatch
      )
    ).then((response) => {
      if(response === 200){
        toast.success('Shipping Method Added!');
      } else {
        toast.error(response);
      }
    })

  };

  return (
    <Grid container sx={{display: 'flex', flexWrap: 'nowrap', flexDirection: 'column', justifyContent: 'space-between', widht: '100%', height: '100%'}}>
      <Grid container sx={{display: 'flex', flex: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <Grid item sx={{display: 'flex', flex: '1', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
          <Typography variant='h5' sx={{width: '100%', padding: '0.5rem'}}>
            Edit Shipping Address
          </Typography>
        </Grid>
        <Grid item sx={{flex: '1', width: '100%'}}>
          <TextField
            color='secondary'
            label="First Name" 
            fullWidth 
            required
            sx={{margin: '1rem 0'}}
            value={editShippingInfo?.firstName}
            onChange={(e) => handleShippingDataChange('firstName', e.target.value)}
          />
          <TextField 
            color='secondary'
            label="Last Name" 
            fullWidth 
            required
            sx={{margin: '1rem 0'}}
            value={editShippingInfo?.lastName}
            onChange={(e) => handleShippingDataChange('lastName', e.target.value)} 
          />
          <TextField
            color='secondary'
            label="Address Line 1" 
            fullWidth 
            required
            sx={{margin: '1rem 0'}}
            value={editShippingInfo?.addressOne}
            onChange={(e) => handleShippingDataChange('addressOne', e.target.value)}  
          />
          <TextField
            color='secondary'
            label="Address Line 2" 
            fullWidth
            sx={{margin: '1rem 0'}}
            value={editShippingInfo?.addressTwo}
            onChange={(e) => handleShippingDataChange('addressTwo', e.target.value)} 
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                color='secondary'
                label="City" 
                fullWidth 
                required
                value={editShippingInfo?.city}
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
                defaultValue={states.find(state => state.abbreviation === editShippingInfo.state)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                color='secondary'
                label="Country" 
                fullWidth 
                required
                value={editShippingInfo?.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                color='secondary'
                label="Zip Code" 
                fullWidth 
                required
                value={editShippingInfo?.zipCode}
                onChange={(e) => handleShippingDataChange('zipCode', e.target.value)}
              />
            </Grid>
            <Grid item sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'cetner', flex: '1', width: '100%'}}>
              <FormControlLabel 
                control={
                  <Checkbox 
                    checked={editShippingInfo?.defaultShipping} 
                    color='secondary' 
                    onChange={() => setEditShippingInfo({
                        ...editShippingInfo, defaultShipping: !editShippingInfo.defaultShipping
                      })
                    }
                  />
                } 
                label="Set as default shipping method" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
        <Grid 
          container 
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
              variant='contained' 
              color='secondary'
              onClick={() => saveShippingData()}
              sx={{marginRight: '1rem'}}
            >
              Update Address
            </Button>
            <Button
              variant='contained' 
              color='secondary'
              onClick={() => handleDeleteShippingAddress()}
              sx={{backgroundColor: 'red', color: 'white'}}
            >
              Delete Address
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant='outlined' 
              color='secondary'
              onClick={() => updateShippingView('List')}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  )
}

export default DetailsShippingDialogue;