import { Routes, Route } from 'react-router-dom'

import { DashboardTitleProvider } from '@/contexts/DashboardTitleContext'
import { DashboardContentProvider } from '@/contexts/DashboardContentContext'
import { BlockButtonProvider } from '@/contexts/BlockButtonContext'
import { BlockTextProvider } from '@/contexts/BlockTextContext'
import { DashboardPage } from '@/pages/DashboardPage'
import { BuilderPage } from '@/pages/BuilderPage'
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
      <DashboardContentProvider>
        <BlockButtonProvider>
          <BlockTextProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/create-dashboard" element={<BuilderPage />} />
                {['/saved-dashboards', '/'].map(path => <Route path={path} element={<SavedDashboardsPage />} />)}
              </Route>  
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/dashboard/:id" element={<DashboardPage />} />
            </Routes>
          </BlockTextProvider>
        </BlockButtonProvider>
      </DashboardContentProvider>
    </DashboardTitleProvider>
  )
}