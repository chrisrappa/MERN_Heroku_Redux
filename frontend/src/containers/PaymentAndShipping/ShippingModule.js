import React from 'react';
import { 
  Autocomplete,
  Button, 
  Grid, 
  IconButton, 
  Radio, 
  TextField, 
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { 
  CardInfoTypography, 
  InfoGrid, 
  InformationCard 
} from './styled';
import states from 'states-us';

function ShippingModule({
  changeShipping,
  shippingData,
  setShippingData,
  handleShippingDataChange,
  setChangeShipping,
  userInfo,
  saveShippingData,
}) {

  if(changeShipping){
    return (
      <Grid>
        <TextField
          color='secondary'
          label="First Name" 
          fullWidth 
          required
          sx={{margin: '1rem 0'}}
          value={shippingData.firstName}
          onChange={(e) => handleShippingDataChange('firstName', e.target.value)}
        />
        <TextField
          color='secondary'
          label="Last Name" 
          fullWidth 
          required
          sx={{margin: '1rem 0'}}
          value={shippingData.lastName}
          onChange={(e) => handleShippingDataChange('lastName', e.target.value)} 
        />
        <TextField 
          color='secondary'
          label="Address Line 1" 
          fullWidth 
          required
          sx={{margin: '1rem 0'}}
          value={shippingData.addressOne}
          onChange={(e) => handleShippingDataChange('addressOne', e.target.value)} 
        />
        <TextField 
          color='secondary'
          label="Address Line 2" 
          fullWidth
          sx={{margin: '1rem 0'}}
          value={shippingData.addressTwo}
          onChange={(e) => handleShippingDataChange('addressTwo', e.target.value)} 
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField 
              color='secondary'
              label="City" 
              fullWidth 
              required
              value={shippingData.city}
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
              value={shippingData.country}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              color='secondary'
              label="Zip Code" 
              fullWidth 
              required
              value={shippingData.zipCode}
              onChange={(e) => handleShippingDataChange('zipCode', e.target.value)} 
            />
          </Grid>
        </Grid>
        <Grid 
          container 
          sx={{
            display: 'flex',
            height: '100%',
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
            sx={{color: 'white'}}
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
      </Grid>
    )
  }

  if(changeShipping === false){
    return (
      <Grid container>
        { userInfo?.shippingAddresses?.map((address) => (
          <Grid 
            item
            key={address.addressOne}
            sx={{
              display: 'flex', 
              width: '100%', 
              height: '100%',
              marginBottom: '1rem'
            }}
          >
            <InformationCard onClick={() => setShippingData(address)}>
              <Radio
                value={address} 
                checked={shippingData === address}
                onChange={() => {
                  setShippingData(address)     ;
                }} 
                color="secondary"
                sx={{
                  position: 'absolute', 
                  top: 0, 
                  right: 0
                }}
              />
              <InfoGrid container>
                <CardInfoTypography>{address.addressOne}</CardInfoTypography> 
                <CardInfoTypography>{address.addressTwo}</CardInfoTypography>
                <CardInfoTypography>
                {address.city} {address.state} {address.country}
                </CardInfoTypography>
              </InfoGrid>
            </InformationCard>
          </Grid>
        ))}
        <Grid
          item 
          sx={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '100%', 
            height: '100%',
          }}
        >
          <InformationCard>
            <IconButton onClick={() => setChangeShipping(true)}>
              <Add />
            </IconButton>
          </InformationCard>
        </Grid>
      </Grid>
    )
  }
}

export default ShippingModule;