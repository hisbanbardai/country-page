import { useContext } from "react";
import Filters from "./Filters";
import Results from "./Results";
import SearchBar from "./SearchBar";
import { CountriesContext } from "../contexts/CountriesContext";

export default function Container() {
  const { countries } = useContext(CountriesContext);

  return (
    <div className="grid grid-cols-[1fr] grid-rows-[125px_450px_1fr] md:grid-rows-[150px_400px_1fr] lg:grid-cols-[325px_1fr] lg:grid-rows-[80px_1fr] h-full">
      <header className="lg:col-start-1 lg:col-end-3 row-start-1 row-end-2 flex lg:justify-between lg:items-center flex-col lg:flex-row col-start-1 col-end-2">
        <h1 className="md:my-8 text-xl lg:my-0 lg:text-md my-6">
          Found {countries.length} countries
        </h1>
        <SearchBar />
      </header>

      <div className="col-start-1 col-end-2 row-start-2 row-end-3 mt-8">
        <Filters />
      </div>

      <div className="lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4 md:mt-8">
        <Results />
      </div>
    </div>
  );
}
