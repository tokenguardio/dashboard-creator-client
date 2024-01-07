import { Routes, Route } from 'react-router-dom'
import { DashboardTitleProvider } from '@/contexts/DashboardTitleContext'
import { AddNewElementPage } from '@/pages/AddNewElementPage'
import { SavedDashboardsPage } from '@/pages/SavedDashboardsPage'
import { NotFoundPage } from '@/pages/404'
import { Layout } from '@/components/layout/Layout'
import { useMobile } from '@/hooks/useMobile'
import Style from './App.module.css'

export default function App() {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <p className={Style.notAvailable}>App is only available on desktop</p>
    )
  }

  return (
    <DashboardTitleProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/add-new-element" element={<AddNewElementPage />} />
          <Route path="/saved-dashboards" element={<SavedDashboardsPage />} />
        </Route>  
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DashboardTitleProvider>
  )
}