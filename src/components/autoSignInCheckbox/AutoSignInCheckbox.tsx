import React, { ChangeEvent } from 'react'
import styles from './AutoSignInCheckbox.module.scss'
import Checkbox from '../checkbox/Checkbox'
import Tooltip from '../tooltip/Tooltip'

interface IAutoSignInCheckboxProps {
    label?: string;
    checked: boolean;
    disabled: boolean;
    orientation?: 'top' | 'bottom' | 'left' | 'right';
    message?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    [x: string]: any;
}

const AutoSignInCheckbox = ({
    label = 'Auto SignIn',
    checked,
    disabled,
    orientation='top',
    message='Please use this on your personal device to protect your privacy.',
    onChange,
    ...restProps
}: IAutoSignInCheckboxProps) => {
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