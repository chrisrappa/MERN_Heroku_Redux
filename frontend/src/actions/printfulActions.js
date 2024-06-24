import axios from 'axios';
import {
  GET_PRINTFUL_PRODUCT_REQUEST,
  GET_PRINTFUL_PRODUCT_SUCCESS,
  GET_PRINTFUL_PRODUCT_FAIL,
  RETRIEVE_TEMPLATE_DATA_REQUEST,
  RETRIEVE_TEMPLATE_DATA_SUCCESS,
  RETRIEVE_TEMPLATE_DATA_FAIL,
  ORDER_STATUS_UPDATE_SUCCESS,
  ORDER_STATUS_UPDATE_FAIL,
  ORDER_STATUS_UPDATE_REQUEST
} from '../consts/printfulConstants';
import { findVariantTemplateData, getTemplateId } from './helpers';
import { convertToDecimalFormat } from '../helpers/dataConversionHelpers';

export const storeTemplateData = (productId, variantId) => async(dispatch) => {

  dispatch({  type: RETRIEVE_TEMPLATE_DATA_REQUEST });

  try{
    const {
      data: {
        result: { templates, variant_mapping}
      }
    } = await axios.get((`${process.env.REACT_APP_API_PATH}api/printful/templates/${productId}`));

    const templateId = getTemplateId(variantId, variant_mapping);
    const [templateProps] = findVariantTemplateData(templateId, templates);
    
    dispatch({ 
      type: RETRIEVE_TEMPLATE_DATA_SUCCESS, 
      payload: templateProps
    });

  } catch(error){
    dispatch({ type: RETRIEVE_TEMPLATE_DATA_FAIL, payload: error.message});
  }
};

export const placePrintfulOrder = ({
  orderItems, 
  customerData, 
  shippingData,
}) => async(dispatch) => {

  const url = `${process.env.REACT_APP_API_PATH}api/printful/placeOrder`;

  const organizeOrderItemDataForPurchase = 
    orderItems?.map((item) => {

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
            filename: `${customerData?._id}_${Math.random(10000)}.png`,
            visible: true,
            position: {
              area_width: item?.templateData?.print_area_width,
              area_height: item?.templateData?.print_area_height,
              width: item?.artworkPlacementDimensions?.width,
              height: item?.artworkPlacementDimensions?.height,
              // Need to grab print_area_top && print_area_left for this
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
    }
  );

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
      email: customerData.email,
    },
    items: organizeOrderItemDataForPurchase,
    packing_slip: {}
  };

  try{
    const response = await axios.post(url, order);
    return response;
  } catch(error) {
    return error;
  };
};

export const storePrintfulProducts = (products) => async(dispatch) => {

  dispatch({ type: GET_PRINTFUL_PRODUCT_REQUEST, payload: { isLoading: true }});

  console.log('products', products);
  
  try{

    // const requestProductDetails = async() => {
    //   const results = [];

    //   for (const product of products) {
    //     if(product.enabled){
    //       const url = `${process.env.REACT_APP_API_PATH}api/printful/${product.id}`;
    //       const { data: { result } } = await axios.post(url);
    //       results.push(result);
    //     };
    //   };
  
    //   return results;
    // };

    // const productList = await requestProductDetails();

    dispatch({ 
      type: GET_PRINTFUL_PRODUCT_SUCCESS, 
      payload: { data: products, isLoading: false }
    });

  } catch(error){
    dispatch({ 
      type: GET_PRINTFUL_PRODUCT_FAIL, 
      payload: { isLoading: false, error: error.message }
    });
  }
};

export const checkOrderStatus = (userOrdersInfo) => async(dispatch) => {

  const url = `${process.env.REACT_APP_API_PATH}api/printful/checkOrderStatus`;

  userOrdersInfo?.forEach(async order => {
    try{
      dispatch({ type: ORDER_STATUS_UPDATE_REQUEST, payload: {orderStatus: 'updating', orderId: order.printfulOrderId} });

      if(order?.orderStatus === 'processing' || order?.orderStatus === 'draft'){
        const response = await axios.get(`${url}/${order?.printfulOrderId}`);
        if(response?.status === 200){
          dispatch({ 
            type: ORDER_STATUS_UPDATE_SUCCESS, 
            payload: {
              orderStatus: response?.data?.status, 
              orderId: order?.printfulOrderId,
              shippingService: response?.data?.shipping_service_name
            }
          })
        } 
      };
    } catch (error) {
      dispatch({ type: ORDER_STATUS_UPDATE_FAIL, payload: {orderId: order?.printfulOrderId, error: error} });
      console.error(error);
    }
  });
};