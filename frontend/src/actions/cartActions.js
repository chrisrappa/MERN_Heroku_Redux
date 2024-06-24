import axios from "axios";
import { 
  CART_ADD_PRODUCT_FAIL, 
  CART_ADD_PRODUCT_REQUEST,
  CART_ADD_PRODUCT_SUCCESS,
  CART_REMOVE_PRODUCT_REQUEST,
  CART_REMOVE_PRODUCT_SUCCESS,
  CART_REMOVE_PRODUCT_FAIL,
  EDIT_CART_QTY,
  UPDATE_PRODUCT_VARIANT,
  GET_PRINTFUL_TOTAL_COSTS_SUCCESS,
  GET_PRINTFUL_TOTAL_COSTS_FAIL,
  GET_PRINTFUL_TOTAL_COSTS_REQUEST,
  CART_EDIT_PRODUCT_REQUEST,
  CART_EDIT_PRODUCT_SUCCESS,
  CART_EDIT_PRODUCT_FAIL
} from "../consts/cartConstants";
import { 
  SAVE_ARTWORK_PLACEMENT_FAIL, 
  SAVE_ARTWORK_PLACEMENT_REQUEST, 
  SAVE_ARTWORK_PLACEMENT_SUCCESS 
} from "../consts/printfulConstants";
import { convertToDecimalFormat } from "../helpers/dataConversionHelpers";

export const config = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const addProductToCart = (product) => async(dispatch) => {

  dispatch({ type: CART_ADD_PRODUCT_REQUEST });

  try{

    dispatch({ 
      type: CART_ADD_PRODUCT_SUCCESS, 
      payload: product
    });

  } catch(err) {

    dispatch({ 
      type: CART_ADD_PRODUCT_FAIL, 
      payload: err.message
    });

  }
};

export const updateCartGenImageProp = (cartItem) => async(dispatch) => {

  dispatch({ type: CART_EDIT_PRODUCT_REQUEST });

  try{

    dispatch({ 
      type: CART_EDIT_PRODUCT_SUCCESS, 
      payload: cartItem
    });

  } catch(err) {

    dispatch({ 
      type: CART_EDIT_PRODUCT_FAIL, 
      payload: err.message
    });

  }
};

export const removeProductFromCart = (cartId) => async(dispatch) => {

  dispatch({ type: CART_REMOVE_PRODUCT_REQUEST });

  try{

    dispatch({ 
      type: CART_REMOVE_PRODUCT_SUCCESS, 
      payload: cartId
    });

  } catch(err) {

    dispatch({ 
      type: CART_REMOVE_PRODUCT_FAIL, 
      payload: err.message
    });

  }
};

export const editCartQuantity = (newQuantity, cartId) => (dispatch) => {

  dispatch({ 
    type: EDIT_CART_QTY, 
    payload: { quantity: newQuantity, cartId: cartId }
  });
};

export const updateProductVariant = (selectedProduct, variantInfo) => (dispatch) => {

  dispatch({ 
    type: UPDATE_PRODUCT_VARIANT, 
    payload: { selectedProduct, variantInfo }
  });
};

export const storeArtworkPlacement = (
  completeImage, 
  variantId, 
  cartId,
  artworkPlacementDimensions,
  templateData
) => async(dispatch) => {

  dispatch({ type: SAVE_ARTWORK_PLACEMENT_REQUEST });

  try{
    
    dispatch({ 
      type: SAVE_ARTWORK_PLACEMENT_SUCCESS, 
      payload: {
        completeImage: completeImage, 
        variantId: variantId, 
        cartId: cartId,
        artworkPlacementDimensions: artworkPlacementDimensions,
        templateData: templateData
      }
    });

  } catch(error){
    dispatch({ type: SAVE_ARTWORK_PLACEMENT_FAIL, payload: error.message });
  }
};

export const calculateOrderCostTotals = (orderData, shippingData) => async(dispatch) => {
  
  const url = `${process.env.REACT_APP_API_PATH}api/printful/estimateCost`;
  
  dispatch({ type: GET_PRINTFUL_TOTAL_COSTS_REQUEST, payload: {isLoading: true} })

  const oragnizeOrderItemsForTotalPrice = 
    orderData?.orderItems?.map((item) => {

      return {
        id: item.id,
        external_id: null,
        variant_id: item?.selectedVariant?.id,
        quantity: item?.quantity,
        price: convertToDecimalFormat(item.price),
        name: item.name,
        product: {
          variant_id: item.selectedVariant.id,
          product_id: item.id,
          image: item.rest?.product?.image,
          name: item.name,
        },
        files: [
          {
            type: 'default',
            url: item.completedBaseImageUrl,
            options: [
              {
                id: 'template_type',
                value: 'native'
              }
            ],
            filename: null,
            visible: true,
            position: {
              area_width: item?.templateData?.print_area_width,
              area_height: item?.templateData?.print_area_height,
              width: item?.artworkPlacementDimensions?.width,
              height: item?.artworkPlacementDimensions?.height,
              top: 0,
              left: 0,
              limit_to_print_area: false
            }
          }
        ],
        sku: null,
        discontinued: false,
        out_of_stock: false
      }
    });

  const order = {
    external_id: null,
    shipping: "STANDARD",
    recipient: {
      name: `${shippingData?.firstName} ${shippingData?.lastName}`,
      company: shippingData?.company,
      address1: shippingData?.addressOne,
      address2: shippingData?.addressTwo,
      city: shippingData?.city,
      state_code: shippingData?.stateCode,
      state_name: shippingData?.stateName,
      country_code: shippingData?.country,
      country_name: shippingData?.countryName,
      zip: shippingData?.zipCode,
      email: null
    },
    items: await oragnizeOrderItemsForTotalPrice,
    packing_slip: {}
  };

  try{
    const response = await axios.post(url, order, config);

    if(response.status === 200){
      dispatch({ 
        type: GET_PRINTFUL_TOTAL_COSTS_SUCCESS, 
        payload: {costs: response?.data?.costs, isLoading: false} 
      });
    };

  } catch (err) {
    dispatch({ type: GET_PRINTFUL_TOTAL_COSTS_FAIL, payload: {error: err, isLoading: false} })
  };
};
