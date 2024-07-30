import { useState, useEffect } from "react";

const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem("searchQuery", searchQuery);
    };
  }, [searchQuery]);

  return [searchQuery, setSearchQuery] as const;
};

export default useSearchQuery;
