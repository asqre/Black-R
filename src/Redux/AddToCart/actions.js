export const ADD_TO_CART = "ADD_TO_CART";
export const DEL_FROM_CART = "DEL_FROM_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (data) => {
   return {
      type: ADD_TO_CART,
      payload: data,
   };
};

export const delFromCart = (data) => {
   return {
      type: DEL_FROM_CART,
      payload: data,
   };
};

export const updateQuantity = (id, quantity) => {
   return {
      type: UPDATE_QUANTITY,
      payload: { id, quantity },
   };
};

export const clearCart = () => {
   return {
      type: CLEAR_CART,
   };
};
