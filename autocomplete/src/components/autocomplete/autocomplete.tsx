import { useMemo, useState } from "react";
import useGetFilteredData from "./useGetFilteredData";
import SearchMatchHighlight from "../search-match-highlight/search-match-highlight";

import styles from "./autocomplete.module.css";

type AutocompleteConfig = {
  minSearchLength: number;
  inputClass: string;
  listClass: string;
  listItemClass: string;
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
  inputClass = "",
  listClass = "",
  listItemClass = "",
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

  const showNoDataText = useMemo(
    () =>
      inputValue &&
      inputValue.length >= minSearchLength &&
      !isLoading &&
      !filteredData.length,
    [inputValue, minSearchLength, isLoading, filteredData]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsListVisible(!!value && value.length >= minSearchLength);
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
    <section className={styles.autocomplete} onBlur={handleBlur}>
      {error && <p className={styles.error}>{error.message}</p>}
      <input
        type="text"
        id={id}
        className={`${styles.input} ${inputClass}`}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputChange}
        placeholder={placeholder}
        autoComplete="off"
      />
      {isListVisible && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`${styles.listBox} ${listClass}`}
        >
          {isLoading && (
            <li className={`${styles.infoItem} ${styles.loading}`}>
              <i>{loadingText}</i>
            </li>
          )}
          {showNoDataText && (
            <li className={`${styles.infoItem} ${styles.noData}`}>
              <i>{noDataText}</i>
            </li>
          )}
          {filteredData?.map((item) => (
            <li
              key={item}
              className={`${styles.listItem} ${listItemClass}`}
              onMouseDown={() => handleItemClick(item)}
            >
              <SearchMatchHighlight text={item} searchTerm={inputValue} />
            </li>
          ))}
        </div>
      )}
    </section>
  );
};

export default Autocomplete;
