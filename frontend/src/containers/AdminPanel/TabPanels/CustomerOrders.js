import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function CustomerOrders({ ordersData }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
  }

  const orderData = {
    createdAt: "2024-06-18T15:42:09.420Z",
    deliveredAt: "n/a",
    email: "vortexmediaconsulting@gmail.com",
    isDelivered: false,
    isPaid: true,
    orderItems: [
      {
        cartId: 1,
        completedBaseImageUrl: "https://res.cloudinary.com/djrbfvpit/image/upload/v1718725328/gg5tlk2gnmevpablqud8.png",
        id: 0,
        name: "2\" x 3\"",
        price: "0",
        quantity: 1,
        variants: [],
        _id: "6671aad1d6ec64cc411a71c5"
      }
    ],
    orderStatus: "processing",
    paidAt: "2024-06-18T15:42:09.383Z",
    totalPrice: 0,
    updatedAt: "2024-06-18T15:42:09.420Z",
    user: "653c3802ffa18c92d80b7aba",
    __v: 0,
    _id: "6671aad1d6ec64cc411a71c4"
  };
  
  const columns = [
    { field: '_id', headerName: 'id', width: 250, editable: false },
    { field: 'createdAt', headerName: 'Created At', width: 200, editable: false, renderCell: (params) => {
      return formatDate(params?.row?.createdAt)
    } },
    { field: 'deliveredAt', headerName: 'Delivered At', width: 150, editable: true, renderCell: (params) => {
      if(params?.row?.deliveredAt !== 'n/a'){
        return formatDate(params?.row?.deliveredAt)
      };

      return 'N/A'
    } },
    { field: 'email', headerName: 'Email', width: 250, editable: false },
    { field: 'isDelivered', headerName: 'Delivered', width: 150, editable: true },
    { field: 'isPaid', headerName: 'Paid', width: 150, editable: false },
    { field: 'orderStatus', headerName: 'Order Status', width: 150, editable: true },
    { field: 'paidAt', headerName: 'Paid At', width: 200, editable: false },
    { field: 'totalPrice', headerName: 'Total Price', width: 150, editable: false },
    { field: 'updatedAt', headerName: 'Updated At', width: 200, editable: true },
    { field: 'user', headerName: 'User', width: 200, editable: true },
    { field: 'orderItems', headerName: 'Order Items', width: 500, renderCell: (params) => (
      <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
        {params.value.map((item, index) => (
          <Box key={item.id} sx={{ width: '100%', display: 'flex', height: '100%', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <Typography variant="body2"><strong>ID:</strong> {item?.id}</Typography>
            <Typography variant="body2"><strong>Name:</strong> {item?.name}</Typography>
            <Typography variant="body2"><strong>Price:</strong> {item?.price}</Typography>
            <Typography variant="body2"><strong>Quantity:</strong> {item?.quantity}</Typography>
            <Typography variant="body2"><strong>Image URL:</strong> <a href={item?.completedBaseImageUrl} target="_blank" rel="noopener noreferrer">{item.completedBaseImageUrl}</a></Typography>
          </Box>
        ))}
      </Box>
    ) },
  ];
  
  const rows = [orderData];

  const handleProcessRowUpdate = async (newRow) => {
    // Dispatch the updated row to your Redux action for updating the database
    console.log('new row', newRow)
    return newRow;
  };

  return (
    <Box sx={{ height: '60dvh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => {console.log('row', row); return row._id}}
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  )
}

export default CustomerOrders;