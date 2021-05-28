import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);

  const isShowSearch = searchTerm.length > 1;

  const fetchDebounce = useCallback(
    debounce((search) => {
      fetch(
        `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${search}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchList(data.results.docs.map(transformSearch));
        });
    }, 500),
    []
  );

  useEffect(() => {
    if (isShowSearch) {
      fetchDebounce(searchTerm);
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };
  return (
    <div className="App">
      <form>
        <input
          value={searchTerm}
          onChange={handleChange}
          placeholder="Pick-up Location"
        ></input>
        <ul>
          {searchList.map((search) => (
            <li>
              <div>{search.name}</div>
              <div>{search.address}</div>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
