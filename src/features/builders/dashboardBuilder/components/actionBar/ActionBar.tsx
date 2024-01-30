import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { Button } from '@/components/button/Button'

import Style from './ActionBar.module.css'
import { useNavigate } from 'react-router-dom'

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
      const response = await axios.post(`${process.env.API_BASE_URL}/api/dashboard/`, {
        title: dashboardTitle,
        elements: dashboardElements,
        layout: dashboardLayout,
        theme: dashboardTheme
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