import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <div><h2>{country.name}</h2>
    capital {country.capital}<br/>
    population {country.population}<p/>

    <h3>languages</h3>
    <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt="flag" height="150"/>
    </div>
  )
}

const Forecast = ({country, forecast}) => {
  if(forecast === "")
    return (
      <></>
    )
  else return (
    <div>
      <h3>Weather in {country.capital}</h3>
      temperature: {forecast.current.temperature} Celsius<br/> 
      <img src={forecast.current.weather_icons} alt={forecast.current.weather_descriptions} height="150"/><br/>
      wind: {forecast.current.wind_speed} kph direction {forecast.current.wind_dir}<br/>
    </div> 
  )
}

const Countries = ({searchString, countries, setSelectedCountry, selectedCountry}) => {

  const matchingCountries = countries.filter((value) => value.name.toUpperCase().includes(searchString.toUpperCase()))

  if(matchingCountries.length > 10)
  {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if(matchingCountries.length === 1)
  {
    setSelectedCountry(matchingCountries[0])
  }


  return (
    <div>
    {matchingCountries
      .map(country => <div key={country.name}>
                          {country.name}
                          <button onClick={() => setSelectedCountry(country)}>show</button>
                      </div>)}
  </div>
  ) 
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [forecast, setForecast] = useState("")

  const handleOnChange = (event) => {
    setSelectedCountry("")
    setSearchString(event.target.value)
  }

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    console.log("calling weatherstack for ", selectedCountry.name)

    if(selectedCountry !== "")
    {
      axios
      .get(`http://api.weatherstack.com/current?access_key=d58f2c75eca2cc8d619e6f96cd403a19&query=${selectedCountry.capital}`)
      .then(response => {
        console.log(response.data)
        setForecast(response.data)
      })
    }
  }, [selectedCountry])

  if(selectedCountry !== "") {
    return (
      <div>
      find countries <input value={searchString}
             onChange={handleOnChange}/>
      <Country country={selectedCountry}/>
      <Forecast country={selectedCountry} forecast={forecast}/>
      </div>
    )
  }
  else
  {
  return (
    <div>
      find countries <input value={searchString}
             onChange={handleOnChange}/>
      <Countries searchString={searchString} countries={countries} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry}/>
    </div>
  )
  }
}    

export default App
