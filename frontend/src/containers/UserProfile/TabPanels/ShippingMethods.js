import { Fade, Grid, IconButton } from "@mui/material"
import ShippingModule from "../ShippingModule"
import { 
  AddInfoButton, 
  AddInfoCard, 
  CardGridContainer, 
  CardInfoTypography, 
  InfoGrid, 
  InformationCard, 
  SecondaryTypography 
} from "../styled"
import { AddBox, Edit } from "@mui/icons-material"
import DetailsShippingDialogue from "../DetailsShippingDialogue";
import { useState } from "react";


export default function ShippingMethods({
  addUpdateShipping,
  userInfo,
  setAddUpdateShipping,
  handleDeleteShippingAddress,
}){

  const [methodView, setMethodView] = useState('List');
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Create popup for editing payment methods
  // Populate payment method data into popup
  // Edit billing should be own secion of popup
  // Set default payment checkbox
  // On save then dispatch make default & any new data
  // dispatch edits to stripe db

  switch(methodView){
    case 'List': 
      return (
        <CardGridContainer container>
          {userInfo?.shippingAddresses?.map((address) => (
            <Fade in timeout={1000} key={address?.addressOne}>
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
                      setMethodView('Edit');
                      setSelectedAddress(address);
                    }}
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
                  <InfoGrid container>
                    <CardInfoTypography>{address?.addressOne}</CardInfoTypography> 
                    <CardInfoTypography>{address?.addressTwo}</CardInfoTypography>
                    <CardInfoTypography>
                      {address?.city} {address?.state} {address?.zipCode}
                    </CardInfoTypography>
                  </InfoGrid>
                </InformationCard>
              </Grid>
            </Fade>
          ))}
          <Fade in timeout={1000}>
            <AddInfoCard>
              <AddInfoButton
                color = 'secondary'
                sx    = {{
                  display: 'flex', 
                  justifyContent: 'space-evenly', 
                  width: '100%',
                  height: '100%'
                }}
                onClick={() => {
                  setAddUpdateShipping(true)
                  setMethodView('Add')
                }}
              >
                <AddBox sx={{fontSize: '3rem'}} />
                <SecondaryTypography>Add Shipping Address</SecondaryTypography>
              </AddInfoButton>
            </AddInfoCard>
          </Fade>
        </CardGridContainer>
      )
    case 'Add':
      return (
        <ShippingModule 
          userId={userInfo?.user_id}
          setChangeShipping={setAddUpdateShipping}
        /> 
      )
    case 'Edit':
      return (
        <DetailsShippingDialogue
          userId             = { userInfo?.user_id           }
          selectedAddress    = { selectedAddress             }
          updateShippingView = { setMethodView               }
        /> 
      )
    default: return undefined;
  }
}