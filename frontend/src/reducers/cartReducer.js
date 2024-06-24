import { 
  CART_ADD_PRODUCT_SUCCESS, 
  CART_EDIT_PRODUCT_SUCCESS, 
  CART_REMOVE_PRODUCT_SUCCESS, 
  CLEAR_CART_ITEMS, 
  EDIT_CART_QTY, 
  GET_PRINTFUL_TOTAL_COSTS_FAIL, 
  GET_PRINTFUL_TOTAL_COSTS_REQUEST, 
  GET_PRINTFUL_TOTAL_COSTS_SUCCESS, 
  UPDATE_PRODUCT_VARIANT
} from "../consts/cartConstants";
import { CREATE_MEDIAMOD_MOCKUP_SUCCESS } from "../consts/mediaModConstants"
import { SAVE_ARTWORK_PLACEMENT_SUCCESS } from "../consts/printfulConstants";


export const cartReducer = (state = {}, action) => {
  
  switch(action.type){
    case CART_ADD_PRODUCT_SUCCESS: 
      return {
        ...state,
        cartItems: state?.cartItems?.concat(action.payload)
      };
    case CART_EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        cartItems: [action.payload]
      }
    case CART_REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.cartId !== action.payload
        )
      }
    case CLEAR_CART_ITEMS:
      return {
        ...state,
        cartItems: []
      }
    case EDIT_CART_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map(product => { 
          if (product.cartId === action.payload.cartId) {
            return { ...product, quantity: action.payload.quantity };
          }
          return product;
        })
      }
    case UPDATE_PRODUCT_VARIANT: {
      return{
        ...state,
        cartItems: state.cartItems.map(product => { 
          if (product.cartId === action.payload.selectedProduct?.cartId) {
            return { ...product, selectedVariant: action.payload.variantInfo };
          }
          return product;
        })
      }
    }
    case CREATE_MEDIAMOD_MOCKUP_SUCCESS: 
      return {
        ...state,
        cartItems: state.cartItems.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              mockupImage: action.payload.mockupImage
            };
          }

          return product;
        })
      }
    case SAVE_ARTWORK_PLACEMENT_SUCCESS:
      const selectedIndex = state.cartItems.findIndex(item =>
        item?.cartId === action?.payload?.cartId
      );

      if (selectedIndex !== -1) {
        const updatedItem = {
          ...state.cartItems[selectedIndex],
          userImageUrl: action?.payload?.completeImage,
          artworkPlacementDimensions: action?.payload?.artworkPlacementDimensions,
          templateData: action?.payload?.templateData
        };

        return {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, selectedIndex),
            updatedItem,
            ...state.cartItems.slice(selectedIndex + 1)
          ]
        };
      } else {
      
      return state;
    }
    case GET_PRINTFUL_TOTAL_COSTS_REQUEST: 
      return {
        ...state,
        orderCostTotals: {
          ...state.orderCostTotals,
          isLoading: action.payload.isLoading
        }
      }
    case GET_PRINTFUL_TOTAL_COSTS_SUCCESS:
      return {
        ...state,
        orderCostTotals: {
          ...state.orderCostTotals,
          isLoading: action.payload.isLoading,
          totals: action.payload.costs
        }
      }
    case GET_PRINTFUL_TOTAL_COSTS_FAIL:
      return {
        ...state,
        orderCostTotals: {
          ...state.orderCostTotals,
          isLoading: action.payload.isLoading,
          error: action.payload
        }
      }
    default: return {
      ...state
    };
  };
}