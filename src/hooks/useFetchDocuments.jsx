'use client'
import { db } from '@/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'

const useFetchDocuments = (collectionName, arg) => {

  const [documents, setDocuments] = useState([]);

  const getDocuments = useCallback(async() => {
    const q = query(collection(db, collectionName), where(arg[0], arg[1], arg[2]));
    const querySnapshot = await getDocs(q)                                          //모든 데이터를 q로 가져올때까지 기다린 후 querySnapshot에 넣음
    let documentsArray = [];

    querySnapshot.forEach(doc => {
      documentsArray.push(doc.data());
    })

    setDocuments(documentsArray);
  }, [collectionName, arg[0], arg[1], arg[2]])

  useEffect(() => {
    getDocuments()
  }, [getDocuments])
  return { documents }
}

export default useFetchDocuments