import React from "react";

interface SearchMatchHighlightProps {
  text: string;
  searchTerm: string;
}

const SearchMatchHighlight = ({
  text,
  searchTerm,
}: SearchMatchHighlightProps): JSX.Element => {
  const highlightText = (text: string, searchTerm: string) => {
    const regex = new RegExp(searchTerm, "gi");
    return text.replace(regex, (match) => `<b>${match}</b>`);
  };

  return (
    <span
      dangerouslySetInnerHTML={{ __html: highlightText(text, searchTerm) }}
    />
  );
};

export default SearchMatchHighlight;
