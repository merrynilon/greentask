import axios from 'axios';
import { setAlert } from './alert';
import {
  CLEAR_SELLERS,
  GET_SELLERS_SQS,
  GET_AUTHORIZED_SELLERS,
  SET_CHANGE_SELLER_LOADING,
  CHANGE_AUTHORIZED_SELLERS
} from './types';
import { actionErrorHandler } from '../utils/global.services';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

//Dashboard get Amazon SQS
export const getSellersSQS = (name) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/sellers?name=${encodeURIComponent(name)}`
    );

    dispatch({
      type: GET_SELLERS_SQS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_SELLERS_SQS,
      payload: {}
    });
    actionErrorHandler(err, dispatch, setAlert);
  }
};

//Get All Sellers
export const getAuthorizedSellers = (name) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/sellers/authorized?name=${encodeURIComponent(name)}`
    );

    dispatch({
      type: GET_AUTHORIZED_SELLERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_AUTHORIZED_SELLERS,
      payload: []
    });
    actionErrorHandler(err, dispatch, setAlert);
  }
};

//Add auth Sellers
export const changeAuthorizedSeller = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_CHANGE_SELLER_LOADING,
      payload: true
    });
    const body = JSON.stringify(data);
    const res = await axios.put('/api/sellers/authorized', body, config);

    dispatch({
      type: CHANGE_AUTHORIZED_SELLERS,
      payload: res.data
    });
    return true;
  } catch (err) {
    dispatch({
      type: SET_CHANGE_SELLER_LOADING,
      payload: false
    });
    actionErrorHandler(err, dispatch, setAlert);
  }
  return false;
};

//Clear Dashboard
export const cleaSellers = () => (dispatch) => {
  dispatch({
    type: CLEAR_SELLERS
  });
};
