import React from "react";

const TextInput = ({
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
        <span className="label-text capitalize">{labelText}</span>
      </label>
      <textarea
        cols={20}
        rows={20}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`form-textarea`}
      />
    </div>
  );
};

export default TextInput;
