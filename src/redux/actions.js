import * as constants from './constants';

export const requestСurrencyExchange = () => ({
  type: constants.REQUEST_CURRENCY_EXCHANGE
});
  
export const requestСurrencyExchangeSuccess = (data) => ({ 
	type: constants.REQUEST_CURRENCY_EXCHANGE_SUCCEEDED,
	payload: data
});

export const requestСurrencyExchangeFailed = () => ({
	type: constants.REQUEST_CURRENCY_EXCHANGE_FAILED
});
