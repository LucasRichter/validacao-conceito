const getGames = async params => {
  const query = new URLSearchParams(params)
  const res = await fetch(`${process.env.REACT_APP_API_URL}/games?${query.toString()}`)
  const json = await res.json()
  return json
}

export default getGames
