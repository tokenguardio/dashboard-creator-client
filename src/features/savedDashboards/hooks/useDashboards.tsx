import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { DashboardSchema, TDashboard } from '@/types/dashboard'

import { fetchDashboards } from '../utils/fetches/dashboards'

export const useDashboards = () => {
  const [dashboards, setDashboards] = useState<Array<TDashboard>>([])
  const [isLoadingDashboards, setIsLoadingDashboards] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingDashboards(true)
        const data = await fetchDashboards()
        const validatedDashboards = DashboardSchema.array().safeParse(data?.output)
        if (!validatedDashboards.success) {
          throw Error(validatedDashboards.error)
        }
        setDashboards(validatedDashboards.data)
        setIsLoadingDashboards(false)
      } catch (err) {
        setIsLoadingDashboards(false)
        toast.error('Upss.. There was a problem to fetch dashboards')
      }
    }
      
    fetchData()
  }, [])

  return {
    dashboards,
    isLoadingDashboards,
    setDashboards,
    setIsLoadingDashboards
  }
}