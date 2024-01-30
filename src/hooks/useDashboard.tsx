import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { DashboardSchema, TDashboard } from '@/types/dashboard'
import { fetchDashboard } from '@/utils/fetches/dashboard'

export const useDashboard = (id) => {
  const [dashboard, setDashboard] = useState<TDashboard | undefined>()
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingDashboard(true)
        const data = await fetchDashboard()
        const validatedDashboards = DashboardSchema.safeParse(data?.output)
        if (!validatedDashboards.success) {
          throw Error(validatedDashboards.error)
        }
        setDashboard(validatedDashboards.data)
        setIsLoadingDashboard(false)
      } catch (err) {
        setIsLoadingDashboard(false)
        toast.error('Upss.. There was a problem to fetch dashboards')
      }
    }
      
    fetchData()
  }, [])

  return {
    dashboard,
    isLoadingDashboard,
    setDashboard,
    setIsLoadingDashboard
  }
}