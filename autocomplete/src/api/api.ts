import axios from "axios";

export const getFilteredData = async (criteria: string, sourceUrl: string) => {
  const response = await axios.get(`${sourceUrl}?q=${criteria}`);
  return response.data;
};
