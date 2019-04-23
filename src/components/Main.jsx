import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestСurrencyExchange }  from '../redux/actions';
import { CurrencyBlock } from './CurrencyBlock';

class AppContainer extends React.Component {

  state = {
    сurrentСurrency: null,
    activeСurrency: 'USD',
    volumeValue: '',
  }

  componentDidMount() {
    this.props.requestCurrencyExchange();
  }

  selectCoin = (currency) => {
    this.setState({сurrentСurrency: currency})
  }

  setActiveCurrency = (activeCurrency) => {
    this.setState({activeСurrency: activeCurrency})
  }

  handleChangeVolume = (event) => {
      
    if(!isNaN(event.target.value)) {
      this.setState({volumeValue: event.target.value})
    }
    
  }

  currenciesBlock = (item) => {
    return (
      <CurrencyBlock
        key={item.id}
        currency={item}
        onSelectCoin={this.selectCoin}
      />
    )
  }

  render () {
    const { loading, error, currencies } = this.props;
    const { сurrentСurrency, activeСurrency, volumeValue } = this.state;
    return (
      <div className="layout"> 
        <div className="currencies">
          { error && <p>Error, try again</p> }
          { loading && <p>Loading...</p> }
          { currencies && currencies.map(this.currenciesBlock) }
        </div>
        <div className="currentCurrency">Selected Coin: {сurrentСurrency && сurrentСurrency.currencyName}</div>
        {
          сurrentСurrency && 
            <React.Fragment>
              <div className="volume">
                Volume: <input type="text" value={volumeValue} onChange={this.handleChangeVolume}/>
              </div>
              <div className="convertCurrencies">
                {
                  сurrentСurrency.currencies && Object.keys(сurrentСurrency.currencies).map(item => (
                    <button
                      className={item === activeСurrency ? 'convertCurrencies__active' : '' }
                      key={item}
                      onClick={() => this.setActiveCurrency(item)}
                    >
                      {item}
                    </button>
                  ))
                }
              </div>
              {
                volumeValue && 
                  <div className="result">
                    {сurrentСurrency && сurrentСurrency.currencyName}&nbsp;
                    will be {(Number(volumeValue) * сurrentСurrency.currencies[activeСurrency]).toFixed(2)}&nbsp;
                    in {activeСurrency}
                  </div>
              }
            </React.Fragment>
        }
      </div>
    )
  }
};

AppContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  currencies: PropTypes.array
};

const mapStateToProps = (state) => ({
  currencies: state.currencyExchange.cryptoСurrencies,
  loading: state.currencyExchange.loading,
  error: state.currencyExchange.error
});

const mapDispatchToProps = (dispatch) => ({
  requestCurrencyExchange: (data) => dispatch(requestСurrencyExchange(data)),
});

export const Main = connect(mapStateToProps,mapDispatchToProps)(AppContainer);
