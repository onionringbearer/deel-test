import { useCallback, useEffect, useState } from "react";
import { getFilteredData } from "../../api/api";

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
    try {
      const data = await getFilteredData(criteria, sourceUrl);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [sourceUrl, criteria]);

  useEffect(() => {
    if (sourceUrl) {
      fetchData();
    } else {
      filterLocalData(criteria);
    }
  }, [criteria]);

  return { isLoading, filteredData };
};

export default useGetFilteredData;
