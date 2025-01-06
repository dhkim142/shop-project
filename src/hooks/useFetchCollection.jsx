'use client'
import { db } from '@/firebase/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useFetchCollection = (collectionName) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getCollection = useCallback(() => {
    setIsLoading(true)
    try {
      const docRef = collection(db, collectionName)                   //firestore에서 데이터를 가져옴
      const q = query(docRef, orderBy("createdAt", "desc"))           //가져온 데이터를 내림차순으로 정렬

      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log('allData', allData)
        setData(allData)
        setIsLoading(false)
      })

    } 
    catch(error) {
      setIsLoading(false)
      toast.error(error.message)
    }


  }, [collectionName])

  useEffect(() => {
    getCollection();
  }, [getCollection])

  return {data, isLoading};
}

export default useFetchCollection