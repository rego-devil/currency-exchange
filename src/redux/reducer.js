import * as constants from './constants';

// Reducer
const initialState = {
  cryptoСurrencies: [],
  loading: false,
  error: false,
};

export const currencyExchange = (state = initialState, action) => {

  switch (action.type) {
    case constants.REQUEST_CURRENCY_EXCHANGE:
      return {
        ...state, 
        loading: true,
      };

    case constants.REQUEST_CURRENCY_EXCHANGE_SUCCEEDED:
      return {
        ...state,
        cryptoСurrencies: action.payload,
        loading: false,
      };

    case constants.REQUEST_CURRENCY_EXCHANGE_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
};