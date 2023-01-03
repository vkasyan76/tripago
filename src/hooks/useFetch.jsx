// import { useState, useEffect } from "react"

import { useEffect, useState } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(url, { signal: controller.signal })
        // console.log(res)
        if (!res.ok) {
          throw new Error(res.statusText)
        }

        const json = await res.json()
        setLoading(false)
        setData(json)

        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('the fetch was aborted')
        } else {
          setLoading(false)
          setError('Could not fetch the data')
          // console.log(err.message)
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url])

  return { data: data, loading, error }
}
