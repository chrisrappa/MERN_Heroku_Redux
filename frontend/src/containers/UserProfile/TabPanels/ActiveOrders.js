import { Box, Fade, Typography } from "@mui/material"
import { 
  ActiveOrderInfoCard, 
  BaseButtonOption, 
  ButtonContainer, 
  MenuOptionRow, 
  OrderDetailsText, 
  OrderItemDetailsContainer, 
  OrderItemTitleGridContainer, 
  OrderItemTitleGridItem, 
  SecondaryTypography 
} from "../styled";


export default function ActiveOrders({
  sortedActiveOrders
}){
  
  return (
    <>
      {
        sortedActiveOrders?.map((order) => {
          return order?.orderItems?.map((item) => (
            <Fade in timeout={1000} key={item?._id}>
              <Box position="relative" maxWidth="100%" sx={{width: '100%', marginTop: '1rem'}}>
                <MenuOptionRow item>
                  <ActiveOrderInfoCard>
                    <ButtonContainer
                      sx={{
                        flex: '1',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        minWidth: '10rem'
                      }} 
                      key={item?._id}
                    >
                      <BaseButtonOption
                        value={item?.value ?? 0}
                        disabled
                      >
                        <img 
                          alt='mockup'
                          style={{
                            maxHeight: '200px', 
                            maxWidth: '200px',
                          }} 
                          src={item?.upscaledImageUrl ?? item?.completedBaseImageUrl} 
                        />
                      </BaseButtonOption>
                    </ButtonContainer>
                    <OrderItemTitleGridContainer sx={{flex: '1'}} container>
                      <OrderItemTitleGridItem item>
                        <SecondaryTypography 
                          variant='h5' 
                          color={'secondary'}
                          sx={{textAlign: 'center', width: '100%'}}
                        >
                          {item?.name}
                        </SecondaryTypography>
                      </OrderItemTitleGridItem>
                      <OrderItemTitleGridItem item>
                        <Typography variant='p' sx={{textAlign: 'center', width: '100%'}}>
                          {order?.orderStatus === 'draft' ? 'PROCESSING' : order?.orderStatus?.toUpperCase()}
                        </Typography>
                      </OrderItemTitleGridItem>
                    </OrderItemTitleGridContainer>
                    <OrderItemDetailsContainer sx={{flex: '1', height: '20rem'}}>
                      <OrderDetailsText>QTY: {item?.quantity}</OrderDetailsText>
                      <OrderDetailsText>Price: ${(item?.price / 100).toFixed(2)}</OrderDetailsText>
                      <OrderDetailsText variant='h7' color={'secondary'}>
                        Shipping Service: {order?.shippingService ?? 'Processing'}
                      </OrderDetailsText>
                    </OrderItemDetailsContainer>
                  </ActiveOrderInfoCard>
                </MenuOptionRow>        
              </Box>
            </Fade>
          ))
        })
      }
    </>
  )
};