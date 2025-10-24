import { useContext } from "react";
import { CountriesContext } from "../contexts/CountriesContext";

export default function SortByBasicFilters() {
  const { setSortBy } = useContext(CountriesContext);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(e.target.value);
  }

  return (
    <div>
      <label htmlFor="sortby" className="text-sm">
        Sort by
      </label>
      <br />
      <select
        className="w-full lg:w-fit mt-2 pr-30 pl-2 py-2 rounded-xl border-2 border-[rgba(108,114,127,0.2)] bg-[#282B30]"
        name="sortby"
        id="sortby"
        onChange={(e) => handleChange(e)}
      >
        <option value="">Choose an option</option>
        <option value="population">Population</option>
        <option value="name">Name</option>
        <option value="area">Area</option>
        <option value="region">Region</option>
      </select>
    </div>
  );
}
