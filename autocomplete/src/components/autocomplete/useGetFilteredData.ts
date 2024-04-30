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
    try {
      const data = await getFilteredData(criteria, sourceUrl);
      setFilteredData(data);
    } catch (error) {
      throw new Error("Error fetching data from the source URL.");
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
