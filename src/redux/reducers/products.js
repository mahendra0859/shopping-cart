import { UPDATE_PRODUCTS, UPDATE_FILTERED_PRODUCTS } from "../action";

const initialState = {
  products: [],
  filteredProducts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return { ...state, products: [...action.payload] };
    case UPDATE_FILTERED_PRODUCTS:
      return { ...state, filteredProducts: [...action.payload] };
    default:
      return state;
  }
};

export default reducer;
