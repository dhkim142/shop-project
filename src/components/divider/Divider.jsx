import React from 'react'
import styles from './Divider.module.scss'

const Divider = ({
  space= 20,
  color= '#ccc',
  ...restProps
}) => {

  const style = {
    marginTop: space,
    marginBottom: space,
    background: color
  }
  return (
    <div
      className={styles.line}
      style={style}
      {...restProps}
    /> 
  )
}

export default Divider