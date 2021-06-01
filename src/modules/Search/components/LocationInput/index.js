import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import classNames from "classnames";
import AutoSuggestInput from "components/AutoSuggestInput";
import { ReactComponent as LocationIcon } from "./LocationIcon.svg";
import { PLACE_TYPE } from "../../types";
import { fetchSuggestion } from "../../API";
import "./style.css";

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

const SuggestionItem = ({ isActive, suggestion }) => (
  <div
    role="button"
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
      <div className="LocationInput__suggestionName">{suggestion.name}</div>
      <div className="LocationInput__suggestionAddress">
        {suggestion.address}
      </div>
    </div>
  </div>
);

const LocationInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionList, setSuggestionList] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchDebounce = useCallback(
    debounce((search) => {
      setIsFetching(true);
      fetchSuggestion({ search })
        .then((data) => {
          setSuggestionList(data);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }, 300),
    []
  );

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetchDebounce(searchTerm);
    } else {
      setSuggestionList(null);
    }
  }, [searchTerm, fetchDebounce]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <AutoSuggestInput
      value={searchTerm}
      onChange={handleChange}
      placeholder="Pick-up Location"
      suggestions={suggestionList}
      icon={<LocationIcon />}
      isLoading={isFetching}
      renderSuggestion={(suggestion, { isActive }) => (
        <SuggestionItem suggestion={suggestion} isActive={isActive} />
      )}
    />
  );
};

export default LocationInput;
