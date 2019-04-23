import { put, call, take, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';
import { find } from 'lodash';

const url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';

function* fetchCurrencyExchangeAsync() {
  try {
    const data = yield call(() => {
      return fetch(url).then(res => res.json())
      }
    );
    
    const BTC = find(data, (item) => item.ccy === 'BTC');
    const USD = find(data, (item) => item.ccy === 'USD');
    const RUR = find(data, (item) => item.ccy === 'RUR');
    const EUR = find(data, (item) => item.ccy === 'EUR');

    const BTCExchange = {
      'id': '1',
      'currencyName': 'BTC',
      'imgUrl': 'https://endotech.io/img/coinicon/BTC.png',
      'currencies': {
        'USD': Number(BTC.buy).toFixed(2),
        'UAH': (Number(BTC.buy) * Number(USD.buy)).toFixed(2),
        'RUR': (Number(BTC.buy) * Number(USD.buy) / Number(RUR.buy)).toFixed(2)
      }
    };

    const EuroExchange = {
      'id': '2',
      'currencyName': 'EUR',
      'imgUrl': 'http://www.el-informador.com/wp-content/uploads/2016/06/ein-Girokonto-300x300.png',
      'currencies': {
        'USD': (Number(EUR.buy) / Number(USD.buy)).toFixed(2),
        'UAH': Number(EUR.buy).toFixed(2),
        'RUR': (Number(EUR.buy) / Number(RUR.buy)).toFixed(2)
      }
    };

    yield put(actions.requestСurrencyExchangeSuccess([BTCExchange, EuroExchange]));
    
  } 
  catch (error) {
    yield put(actions.requestСurrencyExchangeFailed());
  }
}

export function* watchFetchCurrencyExchange() {
  while(true) {
    yield take(constants.REQUEST_CURRENCY_EXCHANGE);
    yield call(fetchCurrencyExchangeAsync);
  }
}