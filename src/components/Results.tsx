import { useContext } from "react";
import type { TCountry } from "../types";
import { CountriesContext } from "../contexts/CountriesContext";
import { Link } from "react-router";

export default function Results() {
  const { countries } = useContext(CountriesContext);

  return (
    <table className="w-full">
      <thead className="text-left border-b-2 border-[rgba(108,114,127,0.2)]">
        <tr>
          <th className="pb-5">Flag</th>
          <th className="pb-5">Name</th>
          <th className="pb-5">Population</th>
          <th className="pb-5">
            Area (km<sup>2</sup>)
          </th>
          <th className="pb-5">Region</th>
        </tr>
      </thead>
      <tbody className="">
        {countries.map((country: TCountry) => {
          return (
            <CountryRow
              key={country.name.common}
              name={country.name.common}
              imgSrc={country.flags.png}
              region={country.region}
              area={country.area}
              population={country.population}
              code={country.cioc}
            />
          );
        })}
      </tbody>
    </table>
  );
}

type TCountryRowProps = {
  imgSrc: string;
  name: string;
  population: string;
  area: string;
  region: string;
  code: string;
};

function CountryRow({
  imgSrc,
  name,
  population,
  area,
  region,
  code,
}: TCountryRowProps) {
  return (
    <tr>
      <td className="pt-5  pr-4">
        <img className="w-15" src={imgSrc} alt="country-flag" />
      </td>
      <td className="pt-5 cursor-pointer">
        <Link to={`/${code}`}>{name}</Link>
      </td>
      <td className="pt-5">{population}</td>
      <td className="pt-5">{area}</td>
      <td className="pt-5">{region}</td>
    </tr>
  );
}
