import React from "react";
import MyButton from "../UI/MyButton.jsx";
import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import Input from "../UI/InputField.jsx"
import { Grid } from "@mui/material";

const CITIESQUERY = gql`
  query Cities {
    cities {
      id
      city
      country
      state
    }
  }
`;

const CREATECITYMUTATION = gql`
  mutation AddCity($city: String!, $country: String!, $state: String) {
    addCity(city: $city, country: $country, state: $state) {
      id
      city
      country
      state
    }
  }
`;

const UPDATECITYMUTATION = gql`
  mutation UpdateCity(
    $id: Int!
    $city: String!
    $country: String!
    $state: String
  ) {
    updateCity(id: $id, city: $city, country: $country, state: $state) {
      id
      city
      country
      state
    }
  }
`;

const DELETECITYMUTATION = gql`
  mutation DeleteCity($id: Int!) {
    deleteCity(id: $id)
  }
`;

const FormCard = () => {
  const [id, setId] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState("");

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const [getCities, { loading, error, data }] = useLazyQuery(CITIESQUERY, {
    onCompleted: (responseData) => {
      console.log(responseData);
    },
  });

  const [createCity, { loading2, error2, data2 }] = useMutation(
    CREATECITYMUTATION,
    {
      onCompleted: (responseData) => {
        console.log(responseData);
      },
    }
  );

  const [updateCity, { loading3, error3, data3 }] = useMutation(
    UPDATECITYMUTATION,
    {
      onCompleted: (responseData) => {
        console.log(responseData);
      },
    }
  );

  const [deleteCity, { loading4, error4, data4 }] = useMutation(
    DELETECITYMUTATION,
    {
      onCompleted: (responseData) => {
        console.log(responseData);
      },
    }
  );
  return (
    <div style={{ width: 800, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{ width: 800, alignItems: "center", justifyContent: "center", marginBottom: 30 }}
        >
          <h1>GraphQL React Frontend</h1>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <h1>id</h1>
              <Input
                variant="outlined"
                label="Id"
                id="outlined-basic"
                type={id}
                value={id}
                onChange={handleIdChange}
              />
            </Grid>

            <Grid item xs={3}>
              <h1>city</h1>
              <Input
                variant="outlined"
                label="City"
                id="outlined-basic"
                type="text"
                value={city}
                onChange={handleCityChange}
              />
            </Grid>

            <Grid item xs={3}>
              <h1>country</h1>
              <Input
                variant="outlined"
                label="Country"
                id="outlined-basic"
                type="text"
                value={country}
                onChange={handleCountryChange}
              />
            </Grid>

            <Grid item xs={3}>
              <h1>state</h1>
              <Input
                variant="outlined"
                label="State"
                id="outlined-basic"
                type="text"
                value={state}
                onChange={handleStateChange}
              />
            </Grid>
          </Grid>
        </div>

        <div
          style={{
            width: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <MyButton
                onClick={getCities}
                variant="contained"
                text="Get Cities"
                sx={{ width: 110, padding: 1, margin: 2 }}
              ></MyButton>
            </Grid>

            <Grid item xs={3}>
              <MyButton
                onClick={() =>
                  createCity({
                    variables: { city: city, state: state, country: country },
                  })
                }
                text="Add City"
                color="success"
                variant="contained"
                sx={{ width: 110, padding: 1, margin: 2 }}
              ></MyButton>
            </Grid>

            <Grid item xs={3}>
              <MyButton
                onClick={() =>
                  updateCity({
                    variables: {
                      id: parseInt(id),
                      city: city,
                      state: state,
                      country: country,
                    },
                  })
                }
                text="Update City"
                color="secondary"
                variant="contained"
                sx={{ width: 110, padding: 1, margin: 2 }}
              ></MyButton>
            </Grid>

            <Grid item xs={3}>
              <MyButton
                onClick={() => deleteCity({ variables: { id: parseInt(id) } })}
                text="Delete City"
                color="error"
                variant="contained"
                sx={{ width: 110, padding: 1, margin: 2 }}
              ></MyButton>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
