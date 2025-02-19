import React, { ChangeEvent, useState } from 'react'
import classNames from 'classnames'
import styles from './Input.module.scss'
import Icon from '../icon/Icon'

interface IInputProps {
  in: string;
  label: string;
  name?: string;
  labelVisible?: boolean;
  icon?: 'letter' | 'block' | 'show' | 'hide';
  email?: boolean;
  password?: boolean;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  value?: string;
  error?: {message: string};
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
}

const Input = ({
  id,
  label,
  name='',
  labelVisible,
  icon,
  email,
  password,
  placeholder='',
  readOnly,
  disabled,
  value,
  error: errorProp,
  className = '',
  onChange,
  ...restProps
}: IInputProps) => {

  const [inputValue, setInputValue] = useState(value ? value : '')                     //save the input value

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)                 //save the information about password 'show', 'hide'              

  const checkType = () => {
    if(email) {
      return 'email'
    }

    if(password) {
      return isPasswordVisible ? 'text' : 'password'
    }

    return 'text';
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {                           //call the function when the value change
    setInputValue(e.target.value);
    onChange(e)
  }

  const iconType = isPasswordVisible ? 'show' : 'hide'
  const iconLabel = `Password ${isPasswordVisible ? 'show' : 'hide'}`

  return (
    <div className={classNames(styles.formControl, className)}>
      <label
        htmlFor={id}                        //connect input with label
        className={classNames(styles.label, labelVisible || styles.labelHidden)}        //the label hide when there is no lavelVisible
      >
        {label}
      </label>
      <div className={classNames(styles.inputWrapper, errorProp && styles.inputWrapperError)}>

        {icon ? <Icon type={icon} /> : null}

        <input 
          id={id}
          type={checkType()}
          name={name}
          className={classNames(styles.input)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />

        {password ? (
          <button
            type='button'
            className={styles.button}
            onClick={() => setIsPasswordVisible(prev => !prev)}  //password 'show' or 'hide'
            disabled={disabled}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        ) : null}
        
      </div>
      {errorProp && (         //Displays the error message when there is errorProp          
        <span role='alert' className={styles.error}>
          {errorProp.message}
        </span>
      )}
    </div>
  )
}

export default Input