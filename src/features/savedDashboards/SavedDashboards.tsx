import React from 'react'

import { TopSection } from './components/TopSection'
import { DashboardsGrid } from './components/DashboardsGrid'
import Style from './SavedDashboards.module.css'

export const SavedDashboards = () =>  (
  <main className={Style['saved-dashboards']}>
    <TopSection />
    <DashboardsGrid />
  </main>
)