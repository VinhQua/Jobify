import { useState } from "react";
import { formatPrice } from "../utils/formatPrice";
const FormRange = ({ label, name, value }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(value || maxPrice);

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label ">
        <div className="flex items-center justify-between">
          <span className="label-text capitalize">{label || name}</span>
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
      {/* <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max : {formatPrice(maxPrice)}</span>
      </div> */}
    </div>
  );
};
export default FormRange;
