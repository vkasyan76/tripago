// import { useState, useEffect } from "react"

import { useEffect, useState } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(url)
      const json = await res.json()

      setLoading(false)

      setData(json)
    }
    fetchData()
  }, [url])

  return { data: data, loading }
}
