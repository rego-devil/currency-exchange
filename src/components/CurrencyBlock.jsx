import React from 'react';

export const CurrencyBlock = ({ currency, onSelectCoin }) => {
  return (
    <div className="currencyBlock" onClick={() => onSelectCoin(currency)}>
      <div className="currencyBlock__img">
        <img src={currency.imgUrl} alt=""/>
        <span className="currencyBlock__cryptoName">{currency.currencyName}</span>
      </div>
      {
        currency.currencies && 
          <ul className="currencyBlock__values">
          {
            Object.keys(currency.currencies).map(item => (
              <li key={item}>
                <span>{item}:</span>
                {currency.currencies[item]}
              </li>
            ))
          }
          </ul>
      }      
    </div>
  )
};
