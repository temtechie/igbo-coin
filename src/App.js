import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Coin from './components/Coin';
import { useEffect, useState } from 'react';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';
    // const apiUrl2 = "https://api.coinstats.app/public/v1/coins?skip=0";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  console.log("coins", coins);

  console.log(search);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="coin-app">
        <div className="choo-coin" >
          <h3 className='coin-text'>Chooputa Coin</h3>
          <form>
            <input
              type="text"
              className="coin-input"
              placeholder="Choputa"
              onChange={handleChange}
            />
          </form>
        </div>
        {filteredCoins?.map((coin, index) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
