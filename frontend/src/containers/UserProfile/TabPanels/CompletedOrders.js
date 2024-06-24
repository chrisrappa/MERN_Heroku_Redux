import { Card, Container } from "@mui/material";
import { SecondaryTypography } from "../styled";

export default function CompletedOrders({
  sortedCompletedOrders
}){
    
  return (
    <>
      {
        sortedCompletedOrders?.map((order) => (
          <Card sx={{margin: '1rem'}} >
            <SecondaryTypography>Payment Status: {order?.isPaid && 'Paid'}</SecondaryTypography>
            <SecondaryTypography>Total Price: {order?.totalPrice}</SecondaryTypography>
            <SecondaryTypography>Order Placed: {order?.paidAt}</SecondaryTypography>
            <SecondaryTypography>Order Status: {order?.orderStatus}</SecondaryTypography>
            <Container>
              {
                order?.orderItems?.map((item) => (
                  <Container sx={{display: 'flex'}}>
                    <img 
                      alt='mockup'
                      style={{
                        maxHeight: '250px', 
                        maxWidth: '250px'
                      }} 
                      src={item?.upscaledImageUrl ?? item?.printedImage} 
                    />
                    <SecondaryTypography>Item Price: ${item?.price}</SecondaryTypography>
                  </Container>
                ))
              }
            </Container>
          </Card>
        ))
      }
    </>
  )
};