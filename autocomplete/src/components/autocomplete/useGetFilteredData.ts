import { useCallback, useEffect, useState } from "react";

type FilteredDataValues = {
  isLoading: boolean;
  filteredData: string[];
};

const useGetFilteredData = (
  criteria: string,
  data: string[],
  sourceUrl: string
): FilteredDataValues => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const filterLocalData = useCallback(
    async (value: string) => {
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
    try {
      const response = await fetch(sourceUrl);
      const data = await response.json();
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [sourceUrl]);

  useEffect(() => {
    if (sourceUrl) {
      fetchData();
    } else {
      filterLocalData(criteria);
    }
  }, [criteria, data, sourceUrl, filterLocalData, fetchData]);

  return { isLoading, filteredData };
};

export default useGetFilteredData;
