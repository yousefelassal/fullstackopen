import {useState, useEffect} from 'react';
import axios from 'axios';

const Search = ({search, handleSearch}) => {
  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
    </div>
  );
}

const Country = ({country, setCountry, setSearch}) => {
  if (country.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    );
  }

  const handleClick = (country) => {
    setCountry([country]);
    setSearch('');
  }

  if(country.length > 1) {
    return (
      <div>
        {country.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleClick(country)}>show</button>
          </div>
        )}
      </div>
    )
  }
  if(country.length === 1) {
    const languages = Object.values(country[0].languages);
    return (
      <div>
        <h2>{country[0].name.common} ({country[0].cioc})</h2>
        <div>capital {country[0].capital}</div>
        <div>population {country[0].population}</div>
        <div>area {country[0].area} </div>
        <div>{country[0].subregion}, {country[0].region}</div>

        <h3>languages</h3>
        <ul>
          {languages.map(language => <li key={language}>{language}</li>)}
        </ul>

        <img src={country[0].flags.png} alt={country[0].flags.alt} width="250" />
        <img src={country[0].coatOfArms.png} alt="coat of arm" width="250" />
      </div>
    );
  }
  return (
    <div>Search any valid country!</div>
  );
}

const App = () => {
  const [search, setSearch] = useState(null);
  const [country, setCountry] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (search) {
      const result = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())) 
      setCountry(result)
      console.log(result)
    }
  }, [search, countries]);


  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Country country={country} setCountry={setCountry} setSearch={setSearch}/>
    </div>
  );
}

export default App;