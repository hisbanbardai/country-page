import { useContext } from "react";
import searchIcon from "../assets/Search.svg";
import { CountriesContext } from "../contexts/CountriesContext";

export default function SearchBar() {
  const { setSearchText } = useContext(CountriesContext);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("searchInput");

    if (typeof value === "string") {
      setSearchText(value.toLowerCase());
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex gap-x-4 bg-[#282B30] lg:w-[375px] w-full pl-3 pt-3 pb-3 pr-3 rounded-xl"
    >
      <img src={searchIcon} alt="search-icon" />
      <input
        className="w-full"
        name="searchInput"
        type="text"
        placeholder="Search by Name, Region, Subregion"
      />
    </form>
  );
}
