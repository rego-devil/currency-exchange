import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { currencyExchange } from './reducer';
import { watchFetchCurrencyExchange } from './saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const reducers = combineReducers({
  currencyExchange
});

export const store = createStore(reducers, enhancer);

sagaMiddleware.run(watchFetchCurrencyExchange); //run middleware saga