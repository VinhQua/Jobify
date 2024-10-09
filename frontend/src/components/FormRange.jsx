import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatPrice";
import { useDispatch } from "react-redux";
import { handleFiltersInput } from "../features/allJobs/allJobsSlice";
const FormRange = ({ label, name, value }) => {
  const step = 1000;
  const maxPrice = 1000000;
  const [selectedPrice, setSelectedPrice] = useState(value || maxPrice);
  const dispatch = useDispatch();
  useEffect(() => {
    let timeId;
    timeId = setTimeout(() => {
      dispatch(handleFiltersInput({ name: "salary", value: selectedPrice }));
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  });
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label ">
        <div className="flex items-center justify-between">
          <span className="capitalize label-text">{label || name}</span>
          <span>{formatPrice(selectedPrice)}</span>
        </div>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`form-input`}
        step={step}
      />
      {/* <div className="flex justify-between w-full px-2 mt-2 text-xs">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max : {formatPrice(maxPrice)}</span>
      </div> */}
    </div>
  );
};
export default FormRange;
