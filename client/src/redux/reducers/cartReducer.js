
import * as actionType from '../constants/cartConstant';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case actionType.ADD_TO_CART:
            const item = action.payload;
            const exist = state.cartItems.find(product => product._id === item._id);

            if (exist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(data =>
                        data._id === exist._id ? item : data
                    )
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }

        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(product => product._id !== action.payload.id)
            };

        default:
            return state;
    }
};
