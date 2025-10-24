import { useContext } from "react";
import { CountriesContext } from "../contexts/CountriesContext";

export default function SortByRegion() {
  return (
    <div>
      <p className="mb-2 text-sm">Region</p>
      <div className="flex flex-wrap">
        <RegionTypeInput value={"Americas"} label={"Americas"} />
        <RegionTypeInput value={"Antartica"} label={"Antartica"} />
        <RegionTypeInput value={"Africa"} label={"Africa"} />
        <RegionTypeInput value={"Asia"} label={"Asia"} />
        <RegionTypeInput value={"Europe"} label={"Europe"} />
        <RegionTypeInput value={"Oceania"} label={"Oceania"} />
      </div>
    </div>
  );
}

function RegionTypeInput({ value, label }: { value: string; label: string }) {
  const { setSelectedRegion } = useContext(CountriesContext);

  function handleRegionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newRegion = e.target.value;
    setSelectedRegion((prev) => {
      return prev.includes(newRegion)
        ? prev.filter((region) => region !== newRegion)
        : [...prev, newRegion];
    });
  }

  return (
    <div className="pr-2 my-4 rounded-xl mr-2 ">
      <input
        className="peer appearance-none"
        type="checkbox"
        id={value}
        name="region"
        value={value}
        onChange={(e) => handleRegionChange(e)}
      />
      <label
        className="peer-checked:bg-[#282B30] px-3 py-2 rounded-xl peer-focus:border-2 cursor-pointer"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
}
