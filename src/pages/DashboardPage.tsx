/***
 *
 *   Dashboard Page
 *
 **********/

import { useParams } from 'react-router-dom'

import { Loader } from '@/components/Loader/Loader'
import { Dashboard } from '@/features/dashboard/Dashboard'
import { useDashboard } from '@/hooks/useDashboard'

// export const DashboardPage = () => <Dashboard />
export const DashboardPage = () => {
  const { id } = useParams()
  const { dashboard, isLoadingDashboard } = useDashboard(id)

  if (isLoadingDashboard) {
    return (
      <div style={{ position: 'relative'}}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      {!isLoadingDashboard &&
        dashboard && (
        <Dashboard dashboardData={dashboard} />
      )}
    </>
  )
}