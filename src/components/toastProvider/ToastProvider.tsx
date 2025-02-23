'use client'
import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastProvider = () => {
  return (
    <ToastContainer 
      autoClose={2000}          // Automatically close after 2 seconds
    />
  )
}

export default ToastProvider