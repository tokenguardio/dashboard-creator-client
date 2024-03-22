import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { Button } from '@/components/button/Button'
import { prepareElementsFormatToSend } from '@/features/builders/dashboardBuilder/utils/helpers'
import { prepareLayoutFormatToSend } from '@/features/builders/dashboardBuilder/utils/helpers'

import Style from './ActionBar.module.css'

export const ActionBar = () => {
  const {
    dashboardElements,
    dashboardLayout,
    dashboardTheme,
    dashboardTitle,
    dashboardId,
    setDashboardElements,
    setDashboardLayout,
    setDashboardTitle,
    setDashboardTheme
  } = useContext(DashboardContentContext)
  const navigate = useNavigate()

  const saveDashboard = async () => {
    try {
      const response = await axios.post(`${process.env.VITE_API_BASE_URL}/api/dashboard`, {
        title: dashboardTitle,
        elements: prepareElementsFormatToSend(dashboardElements),
        layout: prepareLayoutFormatToSend(dashboardLayout),
        theme: dashboardTheme
      })
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

  const updateDashboard = async () => {
    try {
      const response = await axios.put(`${process.env.VITE_API_BASE_URL}/api/dashboard/${dashboardId}`, {
        title: dashboardTitle,
        elements: prepareElementsFormatToSend(dashboardElements),
        layout: prepareLayoutFormatToSend(dashboardLayout),
        theme: dashboardTheme
      })
      setDashboardElements([])
      setDashboardLayout([])
      setDashboardTheme({})
      setDashboardTitle('Default Dashboard')
      toast.success('Success saved')
      navigate('/')
    } catch (err) {
      toast.error('Save failed')
    }
  }


  return (
    <div className={Style['action-bar']}>
      <Button onClick={dashboardId ? updateDashboard : saveDashboard}>Save Dashboard</Button>
    </div>
  )
}
