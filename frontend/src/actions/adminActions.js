import axios from "axios";
import { GET_ALL_USER_ORDERS_FAIL, GET_ALL_USER_ORDERS_REQUEST, GET_ALL_USER_ORDERS_SUCCESS } from "../consts/adminConstants";

export const config = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};


export const getAllUserOrders = () => async(dispatch) => {
  
  const url = `${process.env.REACT_APP_API_PATH}api/admin/orders`;
  
  dispatch({ type: GET_ALL_USER_ORDERS_REQUEST, payload: {isLoading: true} })

  try{
    const response = await axios.get(url, config);

    if(response.status === 200){
      dispatch({ 
        type: GET_ALL_USER_ORDERS_SUCCESS, 
        payload: {orders: response?.data, isLoading: false} 
      });
    };

  } catch (err) {
    console.log('error', err)
    dispatch({ type: GET_ALL_USER_ORDERS_FAIL, payload: {error: err, isLoading: false} })
  };
};
