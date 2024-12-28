import React from 'react'
import styles from './AutoSignInCheckbox.module.scss'
import Checkbox from '../checkbox/Checkbox'
import Tooltip from '../tooltip/Tooltip'

const AutoSignInCheckbox = ({
    label = 'Auto Sign In',
    checked,
    disabled,
    orientation='top',
    message='Please use this on your personal device to protect your privacy.',
    onChange,
    ...restProps
}) => {
  return (
    <div className={styles.wrapper}>
        <Checkbox
            label={label}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            {...restProps}
        />
        {checked && (
            <Tooltip 
                left={0}
                top={23}
                orientation={orientation}
                message={message}
            />
        )}

    </div>
  )
}

export default AutoSignInCheckbox