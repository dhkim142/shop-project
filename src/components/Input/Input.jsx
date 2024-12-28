import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './Input.module.scss'
import Icon from '../icon/Icon'

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
}) => {

  const [inputValue, setInputValue] = useState(value ? value : '')                     //input 값 상태 저장

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)                 //비밀번호 보이기/숨기기 상태 저장              

  const checkType = () => {
    if(email) {
      return 'email'
    }

    if(password) {
      return isPasswordVisible ? 'text' : 'password'
    }

    return 'text';
  }

  const handleChange = (e) => {                           //input 값 변경 시 호출 함수  
    setInputValue(e.target.value);
    onChange(e)
  }

  const iconType = isPasswordVisible ? 'show' : 'hide'
  const iconLabel = `Password ${isPasswordVisible ? 'show' : 'hide'}`

  return (
    <div className={classNames(styles.formControl, className)}>
      <label
        htmlFor={id}                        //label과 input 연결
        className={classNames(styles.label, labelVisible || styles.labelHidden)}        //labelVisible이 없을 경우 label 숨김
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
            onClick={() => setIsPasswordVisible(prev => !prev)}  //비밀번호 보이기/숨기기
            disabled={disabled}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        ) : null}
        
      </div>
      {errorProp && (         //errorProp이 있을 경우 error 메시지 출력           
        <span role='alert' className={styles.error}>
          {errorProp.message}
        </span>
      )}
    </div>
  )
}

export default Input