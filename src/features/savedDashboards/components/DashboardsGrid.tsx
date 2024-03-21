import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Style from './DashboardsGrid.module.css'
import { Slide } from './Slide'
import { SlideButton } from './SlideButton'
import { useDashboards } from '../hooks/useDashboards'

export const DashboardsGrid = () => {
  const { dashboards, isLoadingDashboards, setDashboards } = useDashboards()
  const navigate = useNavigate()

  const removeDashboard = async (id) => {
    try {                                                     
      const response = await axios.delete(`${process.env.API_BASE_URL}/api/dashboard/${id}`)
      toast.success('Dashboard successfully removed')
    } catch (err) {
      toast.error('The removal of the dashboard failed')
    }
  }
  const options = [
    {
      label: 'Edit',
      action: (id: string) => navigate(`/edit-dashboard/${id}`),
    },
    {
      label: 'Delete',
      action: (id: string) => {
        removeDashboard(id)
        setDashboards(dashboards.filter(dashboard => dashboard._id !== id))
      }
    }
  ]

  return (
    <section className={Style['grid-container']}>
      {dashboards.length > 0 ? (
        dashboards.map(dashboard => {
          return (
            <Slide
              key={dashboard._id}
              title={dashboard.title}
              id={dashboard._id}
              image={dashboard.preview}
              options={options}
            />
          )
        })
      ) : null}
      <SlideButton />
    </section>
  )
}
