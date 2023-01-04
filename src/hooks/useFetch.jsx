// import { useState, useEffect } from "react"

import { useEffect, useRef, useState } from 'react'

export const useFetch = (url, _options) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // useRef to wrap an object/array argument
  // which is a useEffect dependency
  const options = useRef(_options).current

  useEffect(() => {
    console.log(options)
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
  }, [url, options])

  return { data: data, loading, error }
}
