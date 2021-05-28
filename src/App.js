import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import SearchForm from "modules/Search/components/SearchForm";
import "./App.css";

const PLACE_TYPE = {
  CITY: "C",
  AIRPORT: "A",
  DISTRICT: "D",
};
const getAddress = (items) => items.filter((x) => x).join(", ");

const transformSearch = (search) => {
  const { name, region, city, country, placeType } = search;
  const newResult = {
    name,
    placeType,
  };

  let address = getAddress([region, country]);

  if (placeType !== PLACE_TYPE.CITY && city) {
    address = getAddress([city, address]);
  }

  newResult.address = address;

  return newResult;
};

function App() {
  return (
    <div className="App">
      <SearchForm />
    </div>
  );
}

export default App;
