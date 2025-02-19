import React, { ChangeEvent } from 'react'

interface ICheckboxProps {
  disabled?: boolean;
  checked?: boolean;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
}

const Checkbox = ({
    disabled = false,
    checked = false, 
    label,
    onChange,
    ...restProps
}: ICheckboxProps) => {
  return (
    <label style={{ fontSize: '1.4rem' }}>
        <input 
            type="checkbox"
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            {...restProps}
          />{" "}
        {label}
    </label>
  )
}

export default Checkbox