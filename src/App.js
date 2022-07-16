import { useLazyQuery, useMutation } from '@apollo/client';
import './App.css';
import {gql} from '@apollo/client'
import { useState } from 'react';


const CITIESQUERY =gql`query Cities {
  cities {
    id
    city
    country
    state
  }
}`

const CREATECITYMUTATION=gql`
mutation AddCity($city: String!, $country: String!, $state: String) {
  addCity(city: $city, country: $country, state: $state) {
    id
    city
    country
    state
  }
}`

const UPDATECITYMUTATION=gql`
mutation UpdateCity($id: Int!, $city: String!, $country: String!, $state: String) {
  updateCity(id: $id, city: $city, country: $country, state: $state) {
    id
    city
    country
    state
  }
}`

  const DELETECITYMUTATION=gql`
  mutation DeleteCity($id: Int!) {
    deleteCity(id: $id)
  }
  `

function App() {
  const [id, setId] = useState()
  const [city, setCity] = useState()
  const [country, setCountry] = useState()
  const [state, setState] = useState('')

  const [getCities, {loading, error, data}] = useLazyQuery(CITIESQUERY, {onCompleted: (responseData) => {
    console.log(responseData)
  }})

  const[createCity,{loading2, error2, data2}] = useMutation(CREATECITYMUTATION, {onCompleted: (responseData) => {
    console.log(responseData)
  }})

  const[updateCity,{loading3, error3, data3}] = useMutation(UPDATECITYMUTATION, {onCompleted: (responseData) => {
    console.log(responseData)
  }})

  const[deleteCity,{loading4, error4, data4}] = useMutation(DELETECITYMUTATION, {onCompleted: (responseData) => {
    console.log(responseData)
  }})


  const handleStateChange = (event) => {
    setState(event.target.value)
  }

  const handleIdChange = (event) => {
    setId(event.target.value)
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div className="App">
      <button onClick={getCities}>click me</button>
      <div>
        <h1>id</h1>
        <input type={id} value={id} onChange={handleIdChange}/>
        <h1>city</h1>
        <input type="text" value={city} onChange={handleCityChange} />
        <h1>country</h1>
        <input type="text" value={country}  onChange={handleCountryChange} />
        <h1>state</h1>
        <input type="text" value={state} onChange={handleStateChange} />
        <button onClick={() => createCity({variables: {city: city, state: state, country: country}})}>add city</button>

        <button onClick={() => updateCity({variables: {id: parseInt(id) , city: city, state: state, country: country}})}>update city</button>

        <button onClick={() => deleteCity({variables: {id: parseInt(id)}})}>delete city</button>
        </div>
      {/* <button onclick={addCity}>add city</button>
      <button onclick={updateCity}>update city</button>
      <button onclick={deleteCity}></button> */}
    </div>
  );
}

export default App;
