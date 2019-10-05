import { UPDATE } from "./action";

const initialState = {
  cartItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return { cartItems: [...action.payload] };
    default:
      return state;
  }
};

export default reducer;
