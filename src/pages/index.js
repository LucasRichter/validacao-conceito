import React, { useState, useCallback } from 'react';
import getGames from '../services/getGames.js';
const SearchInput = React.lazy(() => import('../components/SearchInput.js'));

function Container() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const onChange = useCallback(async title => {
    try {
      setLoading(true)
      const data = await getGames({ title })
      setData(data)
    } catch (err) {
      setData([])
    } finally {
      setLoading(false)
    }
  },[])

  return (
    <div className="container">
      <h1>Game finder</h1>
      <SearchInput loading={loading} debounce={800} onChange={onChange} />
      <div className="grid">
        {data.map(game => (
          <div key={game.external} className="card grid-child">
            <img src={game.thumb} className="card-img-top" alt={game.external} />
            <p className="card-text">{game.external}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Container;