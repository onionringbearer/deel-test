import { useCallback, useEffect, useState } from "react";
import { getFilteredData } from "../../api/api";

type FilteredDataValues = {
  isLoading: boolean;
  filteredData: string[];
};

const useGetFilteredData = (
  criteria: string,
  data: string[],
  sourceUrl: string,
  minSearchLength = 0
): FilteredDataValues => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const filterLocalData = useCallback(
    (value: string) => {
      const filtered =
        value.length > 0
          ? data.filter((item) =>
              item.toLowerCase().includes(value.toLowerCase())
            )
          : [];
      setFilteredData(filtered);
    },
    [data]
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFilteredData(criteria, sourceUrl);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [sourceUrl, criteria]);

  useEffect(() => {
    if (criteria.length < minSearchLength) {
      setFilteredData([]);
      return;
    }
    if (sourceUrl) {
      fetchData();
    } else {
      filterLocalData(criteria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria]);

  return { isLoading, filteredData };
};

export default useGetFilteredData;
