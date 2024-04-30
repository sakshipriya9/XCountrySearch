import React, { useState, useEffect } from 'react';
import './CountrySearch.css';

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setError(error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="country-search">
      <h2>Country Search</h2>
      <input
        type="text"
        placeholder="Search for countries"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="country-grid">
        {filteredCountries.map(country => (
          <div className="countryCard" key={country.name.common}>
            <img src={country.flags.png} alt={country.name.common} />
            <p>{country.name.common}</p>
          </div>
        ))}
        {filteredCountries.length === 0}
      </div>
    </div>
  );
};

export default CountrySearch;
