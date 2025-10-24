import { createContext } from "react";
import type { TCountry } from "../types";

type CountriesContextType = {
  countries: TCountry[];
  selectedStatus: string | null;
  selectedRegion: string[];
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | null>>;
  setSortBy: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export const CountriesContext = createContext<CountriesContextType>({
  countries: [],
  selectedStatus: null,
  selectedRegion: [],
  setSelectedStatus: function () {},
  setSortBy: function () {},
  setSelectedRegion: function () {},
  setSearchText: function () {},
});
