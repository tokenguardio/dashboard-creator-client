import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { fetchDatabases } from './../utils/fetches/databases'

export const useDatabases = () => {
  const [databases, setDatabases] = useState<Array<string>>([])
  const [isLoadingDatabases, setIsLoadingDatabases] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingDatabases(true)
        const data = await fetchDatabases()
        setDatabases(data?.data)
        setIsLoadingDatabases(false)
      } catch (err) {
        setIsLoadingDatabases(false)
        toast.error('Upss.. There was a problem to fetch dashboards')
      }
    }
      
    fetchData()
  }, [])

  return {
    databases,
    isLoadingDatabases,
    setDatabases,
    setIsLoadingDatabases
  }
}