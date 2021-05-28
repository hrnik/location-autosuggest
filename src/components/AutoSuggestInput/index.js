import { useState } from "react";
import "./style.css";

const KEY_CODE = {
  UP: 38,
  DOWN: 40,
  ESC: 27,
};
const AutoSuggestInput = ({
  value,
  suggestions,
  renderSuggestion,
  onChange,
  placeholder,
}) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(null);
  const isEnoughLenthOfSeach = value && value.length >= 2;

  const onMouseEnter = (index) => {
    setActiveSuggestionIndex(index);
  };

  const onKeyDown = (e) => {
    const { keyCode } = e;

    switch (keyCode) {
      case KEY_CODE.DOWN:
        if (
          activeSuggestionIndex === null ||
          activeSuggestionIndex === suggestions.length - 1
        ) {
          setActiveSuggestionIndex(0);
        } else {
          setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
        break;
      case KEY_CODE.UP:
        if (activeSuggestionIndex === null || activeSuggestionIndex === 0) {
          setActiveSuggestionIndex(suggestions.length - 1);
        } else {
          setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="AutoSuggest" onKeyDown={onKeyDown}>
      <input
        className="AutoSuggest__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></input>

      {isEnoughLenthOfSeach && Array.isArray(suggestions) && (
        <ul className="AutoSuggest__suggestions">
          {suggestions.length === 0 && (
            <div className="AutoSuggest__noResults">No results found</div>
          )}
          {suggestions.map((suggestion, index) => (
            <div onMouseEnter={() => onMouseEnter(index)}>
              {renderSuggestion(suggestion, {
                isActive: activeSuggestionIndex === index,
              })}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggestInput;
