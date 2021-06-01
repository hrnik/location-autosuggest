import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import classNames from "classnames";
import AutoSuggestInput from "components/AutoSuggestInput";
import { ReactComponent as LocationIcon } from "./LocationIcon.svg";
import "./style.css";

const PLACE_TYPE = {
  CITY: "C",
  AIRPORT: "A",
  DISTRICT: "D",
};
const filterAndJoin = (items, prefix = ", ") =>
  items.filter((x) => x).join(prefix);

const transformSearch = (search) => {
  const { name, region, city, country, placeType } = search;
  const newResult = {
    name,
    placeType,
    city,
    country,
  };

  let address = filterAndJoin([region, country]);

  if (placeType !== PLACE_TYPE.CITY && city) {
    address = filterAndJoin([city, address]);
  }

  newResult.address = address;

  return newResult;
};

const getPlaceLabel = (search) => {
  switch (search.placeType) {
    case PLACE_TYPE.CITY:
      return "City";
    case PLACE_TYPE.AIRPORT:
      return "Airport";
    case PLACE_TYPE.DISTRICT:
      return "District";
    default:
      return "";
  }
};
const LocationInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState(null);

  const isShowSearch = searchTerm.length > 1;

  const fetchDebounce = useCallback(
    debounce((search) => {
      fetch(
        `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${search}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results.numFound === 0) {
            setSearchList([]);
          } else {
            setSearchList(data.results.docs.map(transformSearch));
          }
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
    setSearchTerm(e.target.value);
  };
  return (
    <AutoSuggestInput
      value={searchTerm}
      onChange={handleChange}
      placeholder="Pick-up Location"
      suggestions={searchList}
      icon={<LocationIcon />}
      renderSuggestion={(suggestion, { isActive }) => (
        <li
          className={classNames("LocationInput__suggestion", {
            "LocationInput__suggestion--active": isActive,
          })}
        >
          <div
            className={classNames("LocationInput__suggestionLabel", {
              "LocationInput__suggestionLabel--airport":
                suggestion.placeType === PLACE_TYPE.AIRPORT,
              "LocationInput__suggestionLabel--city":
                suggestion.placeType === PLACE_TYPE.CITY,
              "LocationInput__suggestionLabel--district":
                suggestion.placeType === PLACE_TYPE.DISTRICT,
            })}
          >
            {getPlaceLabel(suggestion)}
          </div>
          <div>
            <div className="LocationInput__suggestionName">
              {suggestion.name}
            </div>
            <div className="LocationInput__suggestionAddress">
              {suggestion.address}
            </div>
          </div>
        </li>
      )}
    />
  );
};

export default LocationInput;
