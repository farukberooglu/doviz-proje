import React from 'react';
import CurrencyList from './components/CurrencyList';
import Weather from './components/Weather';  // Weather bileşenini import ediyoruz

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="weather-container">
          <Weather />  {/* Hava durumu bileşenini buraya ekliyoruz */}
        </div>
      </header>
      <CurrencyList />
    </div>
  );
}

export default App;
