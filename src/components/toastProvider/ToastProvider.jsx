'use client'
import React from 'react'
import  {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastProvider = () => {
  return (
    <ToastContainer 
      autoClose={2000}          // 2초 후 자동으로 닫힘
    />
  )
}

export default ToastProvider