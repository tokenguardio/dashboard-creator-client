import { Routes, Route } from 'react-router-dom'
import { DashboardTitleProvider } from '@/contexts/DashboardTitleContext'
import { AddNewElementPage } from '@/pages/AddNewElementPage'
import { NotFound } from '@/pages/404'

export default function App() {

  return (
    <DashboardTitleProvider>
      <Routes>
        <Route path="/" element={<AddNewElementPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardTitleProvider>
  )
}

