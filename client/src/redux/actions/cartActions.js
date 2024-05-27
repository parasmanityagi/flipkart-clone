
import axios from 'axios';
import * as actionType from '../constants/cartConstant';

const URL = 'http://localhost:5000';

export const addToCart = ({ _id, quantity }) => async (dispatch) => {
    try {
        let { data } = await axios.get(`${URL}/product/${_id}`);
        dispatch({ type: actionType.ADD_TO_CART, payload: { ...data, quantity } });
    } catch (error) {
        dispatch({ type: actionType.ADD_TO_CART_ERROR, payload: error.message });
    }
};

export const removeFromCart = (id) => (dispatch) => {
    dispatch({ type: actionType.REMOVE_FROM_CART, payload: { id } });
};
