import { Routes, Route } from 'react-router-dom'

import { BlockChartProvider } from '@/contexts/BlockChartContext'
import { DashboardTitleProvider } from '@/contexts/DashboardTitleContext'
import { DashboardContentProvider } from '@/contexts/DashboardContentContext'
import { BlockButtonProvider } from '@/contexts/BlockButtonContext'
import { BlockTextProvider } from '@/contexts/BlockTextContext'
import { DashboardPage } from '@/pages/DashboardPage'
import { DashboardBuilderPage } from '@/pages/DashboardBuilderPage'
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
        <BlockChartProvider>
          <BlockButtonProvider>
            <BlockTextProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/create-dashboard" element={<DashboardBuilderPage />} />
                  {['/saved-dashboards', '/'].map(path => <Route path={path} element={<SavedDashboardsPage />} />)}
                </Route>  
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/dashboard/:id" element={<DashboardPage />} />
              </Routes>
            </BlockTextProvider>
          </BlockButtonProvider>
        </BlockChartProvider>
      </DashboardContentProvider>
    </DashboardTitleProvider>
  )
}