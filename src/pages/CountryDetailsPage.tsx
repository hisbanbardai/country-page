import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

type TCountryDetails = {
  flags: Record<string, string>;
  name: {
    common: string;
    official: string;
  };
  population: string;
  area: string;
  capital: string[];
  subregion: string;
  languages: Record<string, string>;
  currencies: Record<string, Record<string, string>>;
  continents: string[];
  borders: string[];
};

type TNeighbouringCountry = {
  name: string;
  flag: string;
  code: string;
};

async function fetchCountryDetails(code: string) {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

  if (!response.ok) {
    throw new Error("HTTP Error! Status:" + response.status);
  }

  const data = await response.json();
  return data[0];
}

export default function CountryDetailsPage() {
  const { code } = useParams();

  const [countryDetails, setCountryDetails] = useState<TCountryDetails | null>(
    null
  );
  const [isLoadingCountry, setIsLoadingCountry] = useState(true);
  const [countryError, setCountryError] = useState<string | null>(null);

  const [neighbouringCountries, setNeighbouringCountries] = useState<
    TNeighbouringCountry[]
  >([]);
  const [isLoadingNeighbours, setIsLoadingNeighbours] = useState(false);
  const [neighboursError, setNeighboursError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!code) return;
      try {
        const data = await fetchCountryDetails(code);
        setCountryDetails(data);
      } catch (error: unknown) {
        console.error(error);
        setCountryError("Unable to fetch country details");
      } finally {
        setIsLoadingCountry(false);
      }
    }

    fetchData();
  }, [code]);

  useEffect(() => {
    setNeighbouringCountries([]);
    setIsLoadingNeighbours(true);

    async function fetchNeighbouringCountries() {
      if (!countryDetails || !countryDetails.borders) return;

      try {
        const borderPromises = countryDetails.borders.map((border) =>
          fetchCountryDetails(border)
        );

        const data = await Promise.all(borderPromises);

        setNeighbouringCountries(
          data.map(({ name, flags, cioc }) => ({
            name: name.common,
            flag: flags.png,
            code: cioc,
          }))
        );
      } catch (error: unknown) {
        console.error(error);
        setNeighboursError("Unable to fetch neighbouring countries");
      } finally {
        setIsLoadingNeighbours(false);
      }
    }

    fetchNeighbouringCountries();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [countryDetails]);

  if (isLoadingCountry) {
    return (
      <div className="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-gray-700 mt-10"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (countryError) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">{countryError}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!countryDetails) {
    return (
      <div>
        <p className="text-red-500 mb-4">No data</p>
      </div>
    );
  }

  const {
    flags,
    name: { common: name, official },
    population,
    area,
    capital = [],
    subregion,
    languages = {},
    currencies = {},
    continents,
  } = countryDetails;

  const currencyArr = Object.keys(currencies).map(
    (currency) => currencies[currency]["name"]
  );

  return (
    <>
      <main className="bg-[#1B1D1F] w-[600px] md:w-[800px] h-full -mt-10 md:-mt-20 mx-auto relative text-[#D2D5DA] border-2 border-[rgba(108,114,127,0.2)] shadow-md rounded-xl mb-20 pl-8 pr-8 no-scrollbar pb-20">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-15">
          <img
            className="rounded-lg w-60 md:w-75"
            src={flags.png}
            alt="Flag image of the country"
          />
        </div>

        <h1 className="text-center text-4xl font-semibold mt-36 md:mt-44">
          {name}
        </h1>
        <p className="text-center mt-2 text-xl">{official}</p>

        <div className="mt-8 flex justify-center gap-10 mb-10">
          <div className="bg-[#282B30] px-6 rounded-xl py-2 flex gap-4 items-center">
            Population
            <span className="text-[rgb(0,0,0,0.3)] h-12 w-0 border"></span>
            <span className="text-lg">{population}</span>
          </div>
          <div className="bg-[#282B30] px-6 rounded-xl py-2 flex gap-4 items-center">
            Area (km&sup2;)
            <span className="text-[rgb(0,0,0,0.3)] h-12 w-0 border"></span>
            <span className="text-lg">{area}</span>
          </div>
        </div>

        <div className="flex justify-between border-t-1 border-[rgba(108,114,127,0.2)] py-8">
          <p>Capital</p>
          <p>{capital.join(", ")}</p>
        </div>

        <div className="flex justify-between border-t-1 border-[rgba(108,114,127,0.2)] py-8">
          <p>Subregion</p>
          <p>{subregion}</p>
        </div>

        <div className="flex justify-between border-t-1 border-[rgba(108,114,127,0.2)] py-8">
          <p>Currencies</p>
          <p>{currencyArr.join(", ")}</p>
        </div>

        <div className="flex justify-between border-t-1 border-[rgba(108,114,127,0.2)] py-8">
          <p>Language</p>
          <p>{Object.values(languages).join(", ")}</p>
        </div>

        <div className="flex justify-between border-t-1 border-[rgba(108,114,127,0.2)] py-8 border-b-1">
          <p>Continents</p>
          <p>{continents.join(", ")}</p>
        </div>

        <div className="pt-8">
          <p className="mb-8">Neighbouring Countries</p>
          <div className="flex gap-6 flex-wrap">
            {isLoadingNeighbours ? (
              <div role="status" className="max-w-sm animate-pulse flex gap-6">
                <div>
                  <div className="h-18 bg-gray-200 rounded dark:bg-gray-700 w-[100px] mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[100px] mb-2.5"></div>
                  <span className="sr-only">Loading...</span>
                </div>
                <div>
                  <div className="h-18 bg-gray-200 rounded dark:bg-gray-700 w-[100px] mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[100px] mb-2.5"></div>
                </div>

                <span className="sr-only">Loading...</span>
                <div>
                  <div className="h-18 bg-gray-200 rounded dark:bg-gray-700 w-[100px] mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[100px] mb-2.5"></div>
                </div>

                <span className="sr-only">Loading...</span>
              </div>
            ) : neighboursError ? (
              <div className="text-center mt-10">
                <p className="text-red-500 mb-4">{neighboursError}</p>
              </div>
            ) : (
              neighbouringCountries.map((country) => (
                <div className="" key={country.name}>
                  <Link to={`/${country.code}`}>
                    <img
                      className="w-30 h-20 rounded-xl mb-2"
                      src={country.flag}
                      alt="Flag image of the country"
                    />
                    <p>{country.name}</p>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
