import { useEffect, useState } from "react";
import useGetFilteredData from "./useGetFilteredData";

type AutocompleteConfig = {
  minSearchLength: number;
};

type AutocompleteProps = Partial<AutocompleteConfig> & {
  id: string;
  data?: string[];
  sourceUrl?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
};

const Autocomplete = ({
  id,
  data = [],
  sourceUrl = "",
  placeholder = "Type to search...",
  minSearchLength,
  onChange,
  onSelect,
}: AutocompleteProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  const { filteredData, resetFilteredData } = useGetFilteredData(
    inputValue,
    data,
    sourceUrl,
    minSearchLength
  );

  useEffect(() => {}, [filteredData]);

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
    resetFilteredData();
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
      <div role="listbox">
        {isListVisible &&
          filteredData.map((item) => (
            <option key={item} onMouseDown={() => handleItemClick(item)}>
              {item}
            </option>
          ))}
      </div>
    </section>
  );
};

export default Autocomplete;
