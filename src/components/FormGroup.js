import React from 'react';

export default ({
  label,
  value,
  name,
  error,
  onChange,
  placeholder = '',
  type = 'text',
  onFocus,
  errorMessage
}) => (
  <div className="form-group">
    <div className="label-group">
      <label className={error ? 'error' : null}>{label}</label>
      {error && <span>{errorMessage}</span>}
    </div>

    <input
      type={type}
      name={name}
      className={`form-control ${error ? 'error' : null}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  </div>
);
