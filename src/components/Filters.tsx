import SortByBasicFilters from "./SortByBasicFilters";
import SortByRegion from "./SortByRegion";
import SortByStatus from "./SortByStatus";

export default function Filters() {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <SortByBasicFilters />
      <SortByRegion />
      <SortByStatus />
    </div>
  );
}
