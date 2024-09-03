import React, { useEffect, useState } from 'react';
import { getCurrencies, Currency } from '../services/CurrencyService';

const CurrencyList: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [tlAmount, setTlAmount] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [result, setResult] = useState<number | null>(null);
  const [priceType, setPriceType] = useState<'buying' | 'selling'>('selling');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCurrencies();
      setCurrencies(result);
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(',', '.'); // Virgülü nokta ile değiştir
    if (/^\d*\.?\d*$/.test(value)) {
      setTlAmount(parseFloat(value));
    }
  };

  const handleCalculate = () => {
    const currency = currencies.find(curr => curr.CurrencyName === selectedCurrency);
    if (currency) {
      const amount = priceType === 'buying' 
        ? (tlAmount * currency.ForexBuying).toFixed(2)  // Alış fiyatı için çarpma
        : (tlAmount * currency.ForexSelling).toFixed(2);  // Satış fiyatı için çarpma

      setResult(parseFloat(amount));
    }
  };

  return (
    <div>
      <h2>Döviz Kurları</h2>

      {/* TL Miktarı Girişi */}
      <input 
        type="text" 
        placeholder="TL miktarını girin" 
        value={tlAmount} 
        onChange={handleInputChange} 
      />

      {/* Para Birimi Seçimi */}
      <select 
        value={selectedCurrency} 
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency.CurrencyName} value={currency.CurrencyName}>
            {currency.CurrencyName}
          </option>
        ))}
      </select>

      {/* Alış/Satış Fiyatı Seçimi */}
      <div>
        <label>
          <input 
            type="radio" 
            value="buying" 
            checked={priceType === 'buying'} 
            onChange={(e) => setPriceType(e.target.value as 'buying')}
          />
          Alış Fiyatı
        </label>
        <label>
          <input 
            type="radio" 
            value="selling" 
            checked={priceType === 'selling'} 
            onChange={(e) => setPriceType(e.target.value as 'selling')}
          />
          Satış Fiyatı
        </label>
      </div>

      {/* Hesapla Butonu */}
      <button onClick={handleCalculate}>Hesapla</button>

      {/* Hesaplama Sonucu */}
      {result !== null && (
        <div className="result">
          <h3>Hesaplanan Değer: {result.toFixed(2)} TL </h3>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Döviz Adı</th>
            <th>Alış</th>
            <th>Satış</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.CurrencyName}>
              <td>{currency.CurrencyName}</td>
              <td>{currency.ForexBuying}</td>
              <td>{currency.ForexSelling}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyList;
