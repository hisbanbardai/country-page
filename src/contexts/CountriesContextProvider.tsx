import { useEffect, useState } from "react";
import type { TCountry } from "../types";
import { CountriesContext } from "./CountriesContext";

export default function CountriesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [countries, setCountries] = useState<TCountry[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<string | null>(null);

  async function fetchCountries() {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,independent,cioc,subregion"
    );

    const data = await response.json();
    setCountries(data);
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    if (selectedStatus) {
      if (selectedStatus === "independent" && !country.independent) {
        return false;
      } else if (selectedStatus === "member-of-un" && country.independent) {
        return false;
      }
    }

    if (selectedRegion.length) {
      if (!selectedRegion.includes(country.region)) {
        return false;
      }
    }

    if (
      !country.name.common.toLowerCase().includes(searchText) &&
      !country.region.toLowerCase().includes(searchText) &&
      !country.subregion.toLowerCase().includes(searchText)
    ) {
      return false;
    }

    return true;
  });

  const sortedCountries = filteredCountries
    .slice()
    .sort((a: TCountry, b: TCountry) => {
      if (sortBy === "population") {
        const countryA_Population = +a.population;
        const countryB_Population = +b.population;

        return countryA_Population - countryB_Population;
      }

      if (sortBy === "area") {
        const countryA_Area = +a.area;
        const countryB_Area = +b.area;

        return countryA_Area - countryB_Area;
      }

      if (sortBy === "name") {
        return a.name.common.localeCompare(b.name.common);
      }

      if (sortBy === "region") {
        return a.region.localeCompare(b.region);
      }

      return 0;
    });

  return (
    <CountriesContext.Provider
      value={{
        countries: sortedCountries,
        selectedStatus,
        setSelectedStatus,
        selectedRegion,
        setSelectedRegion,
        setSearchText,
        setSortBy,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}
