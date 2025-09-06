import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'

const Filter = ({ filterName, handleFilter }) => {
  return (
    <div>
      Find countries <input value={filterName} onChange={handleFilter} />
    </div>
  )
}

const DisplayCountries = ({ countries, setFilter }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0]
      const apikey = import.meta.env.VITE_SOME_KEY
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${apikey}`
        )
        .then((response) => {
          setWeather(response.data)
        })
    }
  }, [countries])

  if (countries.length === 1) {
    const country = countries[0]

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>{Object.values(country.languages).map((v) => <li key={v}>{v}</li>)}</ul>
        <img src={country.flags.png} alt="flag" />

        {weather && (
          <>
            <h1>Weather in {country.name.common}</h1>
            <p>Temperature: {weather.main.temp} °C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="weather icon"
            />
            <p>Wind: {weather.wind.speed}m/s</p>
          </>
        )}
      </div>
    )
  }

  if (countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>show</button>
          </p>
        ))}
      </div>
    )
  }

  return <div>Too many matches, specify another filter</div>
}


function App() {
  useEffect(() => {
  countryService.getAll().then(response => {
      setCountries(response.data)
    })
})
  const [countries, setCountries] = useState([])
  const [filterName, setFilter] = useState('')

  const handleFilter = (event) => setFilter(event.target.value)


  const countriesToShow = filterName
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(filterName.toLowerCase())
      )
    : []
  return(
    <div>
    <Filter filterName={filterName} handleFilter={handleFilter}/>
    <DisplayCountries countries={countriesToShow} setFilter={setFilter}/>
    </div>
  )

  
}

export default App
