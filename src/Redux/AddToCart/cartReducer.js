import {
  ADD_TO_CART,
  DEL_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
} from "./actions";

// Load cart from localStorage on initialization
const loadCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem("cartBoat");
    if (cartData) {
      const parsed = JSON.parse(cartData);
      return { data: parsed };
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return { data: [] };
};

const init = loadCartFromStorage();

// Save cart to localStorage
const saveCartToStorage = (cartData) => {
  try {
    localStorage.setItem("cartBoat", JSON.stringify(cartData));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const cartReducer = (store = init, action) => {
  let newState;

  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = store.data.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        // Item already exists, increment quantity
        const updatedData = [...store.data];
        updatedData[existingItemIndex] = {
          ...updatedData[existingItemIndex],
          quantity: (updatedData[existingItemIndex].quantity || 1) + 1,
        };
        newState = { ...store, data: updatedData };
      } else {
        // New item, add with quantity 1
        newState = {
          ...store,
          data: [...store.data, { ...action.payload, quantity: 1 }],
        };
      }
      saveCartToStorage(newState.data);
      return newState;

    case DEL_FROM_CART:
      newState = {
        ...store,
        data: [
          ...store.data.filter((e) => {
            return e._id !== action.payload.id;
          }),
        ],
      };
      saveCartToStorage(newState.data);
      return newState;

    case UPDATE_QUANTITY:
      newState = {
        ...store,
        data: store.data.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
      saveCartToStorage(newState.data);
      return newState;

    case CLEAR_CART:
      newState = {
        ...store,
        data: [],
      };
      saveCartToStorage([]);
      return newState;

    default:
      return store;
  }
};
