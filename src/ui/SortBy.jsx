import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy} // value ini berguna ketika option telah dipilih namun ketika di refresh dengan url yang sama maka pilihan optionnya masih tetap sama
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
