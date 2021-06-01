import { useState } from "react";
import Spinner from "components/Spinner";
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
  icon,
  isLoading = false,
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
      {icon && <div className="AutoSuggest__icon">{icon}</div>}
      <input
        className="AutoSuggest__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autocomplete="off"
        aria-activedescendant={`AutoSuggest__suggestions--option-${activeSuggestionIndex}`}
      ></input>

      {isEnoughLenthOfSeach && Array.isArray(suggestions) && (
        <ul className="AutoSuggest__suggestions" role="listbox">
          {suggestions.length === 0 && (
            <div className="AutoSuggest__noResults">No results found</div>
          )}
          {suggestions.map((suggestion, index) => (
            <li
              id={`AutoSuggest__suggestions--option-${index}`}
              onMouseEnter={() => onMouseEnter(index)}
              role="option"
              aria-selected={activeSuggestionIndex === index}
              tabIndex={0}
            >
              {renderSuggestion(suggestion, {
                isActive: activeSuggestionIndex === index,
              })}
            </li>
          ))}
        </ul>
      )}

      {isLoading && (
        <div className="AutoSuggest__loader">
          <Spinner></Spinner>
        </div>
      )}
    </div>
  );
};

export default AutoSuggestInput;
