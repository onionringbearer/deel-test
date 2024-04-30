import { useState } from "react";
import useGetFilteredData from "./useGetFilteredData";
import SearchMatchHighlight from "../search-match-highlight/search-match-highlight";

type AutocompleteConfig = {
  minSearchLength: number;
};

type AutocompleteProps = Partial<AutocompleteConfig> & {
  id: string;
  data?: string[];
  sourceUrl?: string;
  placeholder?: string;
  noDataText?: string;
  loadingText?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
};

const Autocomplete = ({
  id,
  data = [],
  sourceUrl = "",
  placeholder = "Type to search...",
  noDataText = "No matches found.",
  loadingText = "Loading...",
  minSearchLength = 0,
  onChange,
  onSelect,
}: AutocompleteProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  const { filteredData, isLoading, error } = useGetFilteredData(
    inputValue,
    data,
    sourceUrl,
    minSearchLength
  );

  const showNoDataText =
    inputValue &&
    inputValue.length >= minSearchLength &&
    !isLoading &&
    !filteredData.length;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsListVisible(true);
    onChange?.(value);
  };

  const handleBlur = () => {
    setIsListVisible(false);
  };

  const handleItemClick = (item: string) => {
    setInputValue(item);
    setIsListVisible(false);
    onSelect?.(item);
  };

  return (
    <section onBlur={handleBlur}>
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputChange}
        placeholder={placeholder}
        autoComplete="off"
      />
      {isListVisible && (
        <div role="listbox">
          {isLoading && <i>{loadingText}</i>}
          {showNoDataText && <i>{noDataText}</i>}
          {filteredData?.map((item) => (
            <li key={item} onClick={() => handleItemClick(item)}>
              <SearchMatchHighlight text={item} searchTerm={inputValue} />
            </li>
          ))}
        </div>
      )}
      {error && <p>{error.message}</p>}
    </section>
  );
};

export default Autocomplete;
