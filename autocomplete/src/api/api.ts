import axios from "axios";

export const getFilteredData = async (
  criteria: string,
  sourceUrl: string
): Promise<string[]> => {
  const response = await axios.get<string[]>(`${sourceUrl}?q=${criteria}`);
  return response.data;
};
