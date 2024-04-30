import { useMemo, useState } from "react";
import useGetFilteredData from "./useGetFilteredData";
import SearchMatchHighlight from "../search-match-highlight/search-match-highlight";

import styles from "./autocomplete.module.css";

type AutocompleteConfig = {
  /** Minimum length of the input value to trigger the search. Defaults to 0.*/
  minSearchLength: number;
  /** Class name to be applied to the input element. */
  inputClass: string;
  /** Class name to be applied to the list element. */
  listClass: string;
  /** Class name to be applied to the list item elements. */
  listItemClass: string;
};

type AutocompleteProps = Partial<AutocompleteConfig> & {
  /** `id` to be assigned to the text input. Useful for integration tests. */
  id: string;
  /** Array of string to be displayed as suggestions to the input provided. */
  data: string[];
  /** URL to be used to fetch the suggestions to be displayed based on the input provided. */
  sourceUrl: string;
  /** Placeholder text to be displayed in the input. */
  placeholder: string;
  /** Text to be displayed when no matches are found based on the input provided. */
  noDataText: string;
  /** Text to be displayed when the data is being fetched. */
  loadingText: string;
  /** Text to be displayed when an error occurs fetching the data. */
  errorText: string;
  /** Callback function to be executed when the input value changes. */
  onChange: (value: string) => void;
  /** Callback function to be executed when an item is selected from the list. */
  onSelect: (value: string) => void;
};

/**
 * Autocomplete component that display a list of items based on user input.
 *
 * The data could be provided as a `data` array or fetched from a `sourceUrl`.
 * The latter should be preferred for larger datasets.
 *
 * If both `data: string[]` and `sourceUrl: string` are provided, `sourceUrl` will be used.
 *
 * Custom styles can be applied to the input, list, and list items by passing
 * a class name to `inputClass`, `listClass`, and `listItemClass` props.
 *
 * For a complete list of options, see `AutocompleteProps`.
 *
 */
const Autocomplete = ({
  id,
  data = [],
  sourceUrl = "",
  placeholder = "Type to search...",
  noDataText = "No matches found.",
  loadingText = "Loading...",
  errorText,
  minSearchLength = 0,
  inputClass = "",
  listClass = "",
  listItemClass = "",
  onChange,
  onSelect,
}: Partial<AutocompleteProps>): JSX.Element => {
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
      {error && <p className={styles.error}>{errorText || error.message}</p>}
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
