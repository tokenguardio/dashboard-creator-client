import { Routes, Route } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BlockChartProvider } from '@/contexts/BlockChartContext'
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
    <DashboardContentProvider>
      <BlockChartProvider>
        <BlockButtonProvider>
          <BlockTextProvider>
            <Routes>
              <Route element={<Layout />}>
                {/* <Route path="/create-dashboard" element={<DashboardBuilderPage />} /> */}
                {['/create-dashboard', '/edit-dashboard/:id'].map(path => <Route key={path} path={path} element={<DashboardBuilderPage />} />)}
                {['/saved-dashboards', '/'].map(path => <Route key={path} path={path} element={<SavedDashboardsPage />} />)}
              </Route>  
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/dashboard/:id" element={<DashboardPage />} />
            </Routes>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              limit={4}
              hideProgressBar={true}
              newestOnTop={true}
              closeOnClick
              theme="light"
              transition={Flip}
            />
          </BlockTextProvider>
        </BlockButtonProvider>
      </BlockChartProvider>
    </DashboardContentProvider>
  )
}