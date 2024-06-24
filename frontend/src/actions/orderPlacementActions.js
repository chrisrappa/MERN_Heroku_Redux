import axios from 'axios';
import {
  USER_MEMBERSHIP_SAVE_REQUEST,
  USER_MEMBERSHIP_SAVE_SUCCESS,
  USER_MEMBERSHIP_SAVE_FAIL,
  ORDER_SAVE_REQUEST,
  ORDER_SAVE_SUCCESS,
  USER_ORDERS_INFO_REQUEST,
  USER_ORDERS_INFO_SUCCESS,
  USER_ORDERS_INFO_FAIL,
  PURCHASE_CREDITS_REQUEST,
  PURCHASE_CREDITS_SUCCESS,
  PURCHASE_CREDITS_FAIL,
  PAYMENT_SECRET_CLEAR,
  USER_ORDER_PLACED_SUCCESS,
} from "../consts/orderPlacementConstants";
import { CLEAR_CART_ITEMS } from '../consts/cartConstants';
import { USER_INFO_SAVE_FAIL } from '../consts/userConstants';

export const config = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const createUserMembership = (
  userId, priceId, selectedPaymentMethod
) => async(dispatch) => {
  dispatch({ type: USER_MEMBERSHIP_SAVE_REQUEST});

  const path = `${process.env.REACT_APP_API_PATH}api/stripe/createSubscription`;

  try{
    const response = await axios.post(
      path, 
      {
        userId, 
        priceId, 
        selectedPaymentMethod
      }, 
      config
    );

    if(response.status === 200){
      dispatch({ type: USER_MEMBERSHIP_SAVE_SUCCESS, payload: response.data});
    };

  } catch (error) {
    dispatch({ type: USER_MEMBERSHIP_SAVE_FAIL, payload: error.message});
  };
};


export const saveOrderInfo = (orderInfo) => async(dispatch) => {
  
  dispatch({type: ORDER_SAVE_REQUEST, payload: { orderSubmitting: true }});
  const url = `${process.env.REACT_APP_API_PATH}api/user/orderSave`;
  
  try{

    const response = await axios.post(url, orderInfo, config);
        
    if(response.status === 200){

      dispatch({
        type: ORDER_SAVE_SUCCESS, 
        payload: { data: response?.data, orderSubmitting: false }
      });

      // dispatch({
      //   type: USER_ORDER_PLACED_SUCCESS,
      //   payload: response?.data
      // });
      
      dispatch({ type: CLEAR_CART_ITEMS     });
      dispatch({ type: PAYMENT_SECRET_CLEAR });

      return response;
    };

  } catch(err) {

    console.log('error', err)

    dispatch({type: USER_INFO_SAVE_FAIL, payload: {data: err.message, orderSubmitting: false}});

    throw err;
  };

};

export const getUserOrdersInfo = (user_id) => async(dispatch) => {
  dispatch({ type: USER_ORDERS_INFO_REQUEST});
  
  const url = `${process.env.REACT_APP_API_PATH}api/user/orders/${user_id}`;

  try{
    if(user_id){
      const response = await axios.get( url, config );
    
      if(response.status === 200){
        dispatch({
          type: USER_ORDERS_INFO_SUCCESS, 
          payload: response?.data
        });
      };

    } 
  } catch(err) {

    dispatch({type: USER_ORDERS_INFO_FAIL, payload: err.message});
    
    return err.message;
  };
};


export const purchaseCredits = (
  paymentMethod, 
  creditAmount,
  creditCost,
  userId
) => async(dispatch) => {
  
  dispatch({  type: PURCHASE_CREDITS_REQUEST });

  const url = `${process.env.REACT_APP_API_PATH}api/stripe/purchaseCredits`;
  const addCreditsUrl = `${process.env.REACT_APP_API_PATH}api/user/saveCredits`;

  try{
    const response = await axios.post(
      url, 
      {
        paymentMethod : paymentMethod , 
        creditAmount  : creditAmount  ,
        creditCost    : creditCost    ,
        userId        : userId
      },
      config 
    );

    if(response?.status === 200){
      const addCreditsResponse = await axios.post(
        addCreditsUrl,
        {creditAmount: creditAmount, userId: userId},
        config
      );

      if(addCreditsResponse?.status === 200){
        dispatch({ type: PURCHASE_CREDITS_SUCCESS, payload: creditAmount});
        return addCreditsResponse.status;
      };
    };
  } catch(error) {
    dispatch({  type: PURCHASE_CREDITS_FAIL, payload: error.message });
    return error.message;
  };
};
