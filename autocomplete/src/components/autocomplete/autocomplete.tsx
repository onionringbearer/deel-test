import { useState } from "react";
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
};

const Autocomplete = ({
  id,
  data = [],
  sourceUrl = "",
  placeholder = "Type to search...",
  minSearchLength,
}: AutocompleteProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const { filteredData } = useGetFilteredData(inputValue, data, sourceUrl);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <section>
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        autoComplete="off"
      />
      <aside>
        {filteredData.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </aside>
    </section>
  );
};

export default Autocomplete;
