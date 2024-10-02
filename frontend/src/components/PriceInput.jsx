import React from "react";
import CurrencyInput from "react-currency-input-field";
const PriceInput = ({
  labelText,
  name,
  value,
  size,
  handleChange,
  disabled,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        <span className="label-text capitalize">{labelText || name}</span>
      </label>
      <CurrencyInput
        disabled={disabled}
        className={`form-input`}
        id={name}
        name={name}
        intlConfig={{ locale: "en-US", currency: "USD" }}
        value={value}
        decimalsLimit={0}
        onValueChange={(value, name, values) =>
          handleChange({ target: { name, value } })
        }
      />
    </div>
  );
};

export default PriceInput;
