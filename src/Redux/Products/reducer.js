import { GET_PRODUCTS, SORT_PRODUCTS } from "./action";

const initState = {
    products: []
};

export const productsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCTS:
            return { ...state, products: payload };
        case SORT_PRODUCTS:
            let sortedProducts = [...state.products];
            
            switch (payload) {
                case "price_low":
                    sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
                    break;
                case "price_high":
                    sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
                    break;
                case "name_az":
                    sortedProducts.sort((a, b) => 
                        (a.productName || "").localeCompare(b.productName || "")
                    );
                    break;
                case "name_za":
                    sortedProducts.sort((a, b) => 
                        (b.productName || "").localeCompare(a.productName || "")
                    );
                    break;
                case "rating":
                    sortedProducts.sort((a, b) => (b.Rating || 0) - (a.Rating || 0));
                    break;
                case "featured":
                default:
                    // Keep original order for featured
                    break;
            }
            
            return { ...state, products: sortedProducts };
        default:
            return state;
    }
};
