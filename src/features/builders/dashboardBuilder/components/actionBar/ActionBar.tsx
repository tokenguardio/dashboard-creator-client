import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { Button } from '@/components/button/Button'
import { prepareElementsFormatToSend } from '@/features/builders/dashboardBuilder/utils/helpers'
import { prepareLayoutFormatToSend } from '@/features/builders/dashboardBuilder/utils/helpers'

import Style from './ActionBar.module.css'

const themeTest = {
  "name": "Tokenguard",
  "primaryColor": "#ffff00",
  "secondaryColor": "#ffff00",
  "additionalColor": "#ffff00",
  "bgColor": "#ffffff",
  "itemGridRadius": "#ffffff",
  "itemGridBgColor": "#ffffff",
  "font": "Arial",
  "textColor": "#000000",
  "itemGridStroke": "#ffffff",
  "chartGradient": true,
  "bottomTimeline": true
}

export const ActionBar = () => {
  const {
    dashboardElements,
    dashboardLayout,
    dashboardTheme,
    dashboardTitle,
    setDashboardElements,
    setDashboardLayout,
    setDashboardTitle,
    setDashboardTheme
  } = useContext(DashboardContentContext)
  // const dashboardContent = useContext(DashboardContentContext)
  const navigate = useNavigate()

  const saveDashboard = async () => {
    try {
      const response = await axios.put(`${process.env.API_BASE_URL}/api/dashboard/65e4fe72805ad321211755fa`, {
        title: dashboardTitle,
        elements: prepareElementsFormatToSend(dashboardElements),
        layout: prepareLayoutFormatToSend(dashboardLayout),
        theme: themeTest
      })
      console.log('response', response.data)
      setDashboardElements([])
      setDashboardLayout([])
      setDashboardTheme({})
      setDashboardTitle('Default Dashboard')
      toast.success('success saved')
      navigate('/')
    } catch (err) {
      toast.error('save failed')
    }
  }


  return (
    <div className={Style['action-bar']}>
      <Button onClick={saveDashboard}>Save Dashboard</Button>
    </div>
  )
}