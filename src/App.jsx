import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import styles from "./App.module.css";

function App() {
  // const [count, setCount] = useState(0)
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    async function getCountries() {
      try {

        let response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
          );
          let responseJSON = await response.json();
          console.log(responseJSON, "responseJSON");
          setCountries(responseJSON);
        } catch (error) {
          console.log(error, "get countries error");
        }
    }
    getCountries();
  }, []);

  useEffect(() => {
    async function getStates() {
      let response = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      let responseJSON = await response.json();
      setStates(responseJSON);
    }
    if (selectedCountry !== "") {
      getStates();
    }

    setSelectedState("");
    setSelectedCity("");
  }, [selectedCountry]);

  useEffect(() => {
    async function getCities() {
      try {
        let response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        let responseJSON = await response.json();
        setCities(responseJSON);
      } catch (error) {
        console.log(error, "get cities error");
      }
    }
    if (selectedState !== "") {
      getCities();
    }
    setSelectedCity("");
  }, [selectedState]);

  return (
    <>
      <div className={styles.center}>
        <h1>Select Location</h1>
        <div>
          <select
            value={selectedCountry}
            onChange={(e) => {
              console.log("running");
              setSelectedCountry(e.target.value);
            }}
          >
            <option value="">Select Country</option>
            {countries.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
            }}
          >
            <option value="">Select State</option>
            {states.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
            }}
          >
            <option value="">Select City</option>
            {cities.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {selectedCity && (
          <p>
            You selected{" "}
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              {selectedCity}
            </span>
            , {selectedState}, {selectedCountry}
          </p>
        )}
      </div>
    </>
  );
}

export default App;
