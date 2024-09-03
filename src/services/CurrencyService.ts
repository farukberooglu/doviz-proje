import axios from 'axios';

export interface Currency {
  CurrencyName: string;
  ForexBuying: number;
  ForexSelling: number;
}

export const getCurrencies = async (): Promise<Currency[]> => {
  // TCMB'den döviz kurlarını çekmek için proxy ile istek yapıyoruz
  const response = await axios.get('/kurlar/today.xml', {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(response.data, 'text/xml');

  const currencies: Currency[] = Array.from(xmlDoc.getElementsByTagName('Currency')).map(
    (currencyElement) => ({
      CurrencyName: currencyElement.getElementsByTagName('CurrencyName')[0].textContent || '',
      ForexBuying: parseFloat(currencyElement.getElementsByTagName('ForexBuying')[0].textContent || '0'),
      ForexSelling: parseFloat(currencyElement.getElementsByTagName('ForexSelling')[0].textContent || '0'),
    })
  );

  return currencies;
};
