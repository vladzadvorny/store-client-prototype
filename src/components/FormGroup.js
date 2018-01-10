import React from 'react';

export default ({
  label,
  value,
  name,
  onChange,
  placeholder = '',
  type = 'text'
}) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);
