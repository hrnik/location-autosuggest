import { PLACE_TYPE } from "../types";

const filterAndJoin = (items, prefix = ", ") =>
  items.filter((x) => x).join(prefix);

const transformSuggestion = (search) => {
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

export const fetchSuggestion = ({ search }) =>
  fetch(
    `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${search}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.results.numFound === 0) {
        return [];
      } else {
        return data.results.docs.map(transformSuggestion);
      }
    });
