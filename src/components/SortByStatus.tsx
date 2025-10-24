import { useContext } from "react";
import { CountriesContext } from "../contexts/CountriesContext";

export default function SortByStatus() {
  const { selectedStatus, setSelectedStatus } = useContext(CountriesContext);

  function handleStatusChange(value: string) {
    setSelectedStatus(selectedStatus === value ? null : value);
  }

  return (
    <div>
      <p className="text-sm mb-3">Status</p>

      <ul className="w-full">
        <li className="w-full">
          <div className="flex items-center relative">
            <input
              id="member-of-un"
              type="checkbox"
              checked={selectedStatus === "member-of-un"}
              onChange={() => handleStatusChange("member-of-un")}
              className="w-6 h-6 rounded-sm border-2 border-gray-300 appearance-none peer checked:bg-blue-500"
            />
            <label
              className="opacity-0 peer-checked:opacity-100 absolute top-3 left-1 pointer-events-none text-white"
              htmlFor="member-of-un"
            >
              &#10003;
            </label>
            <label
              htmlFor="member-of-un"
              className="w-full py-3 ms-2 cursor-pointer"
            >
              Member of the United Nations
            </label>
          </div>
        </li>
        <li className="w-full">
          <div className="flex items-center relative">
            <input
              id="independent"
              type="checkbox"
              checked={selectedStatus === "independent"}
              onChange={() => handleStatusChange("independent")}
              className="w-6 h-6 rounded-sm border-2 border-gray-300 appearance-none peer checked:bg-blue-500"
            />
            <label
              className="opacity-0 peer-checked:opacity-100 absolute top-3 left-1 pointer-events-none text-white"
              htmlFor="independent"
            >
              &#10003;
            </label>
            <label
              htmlFor="independent"
              className="w-full py-3 ms-2 cursor-pointer"
            >
              Independent
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
}
