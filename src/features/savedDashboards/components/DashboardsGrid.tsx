import { useEffect } from 'react'
import axios from 'axios'

import Style from './DashboardsGrid.module.css'
import { Slide } from './Slide'
import { SlideButton } from './SlideButton'

export const DashboardsGrid = () => {

  useEffect(() => {
    try {                                                     
      const response = axios.get(`${process.env.API_BASE_URL}/api/dashboard/all`)
      console.log('response', response)
    } catch (err) {
      console.log('err')
    }
  }, [])
    console.log('test env1', import.meta.env.VITE_API_BASE_URL)
    console.log('test env2', process.env.API_BASE_URL)

  const dashboards = [
    {
      name: 'Test43',
      id: 43,
      preview: ''
    },
    {
      name: 'Test42',
      id: 42,
      preview: ''
    },
    {
      name: 'Test41',
      id: 41,
      preview: ''
    },
  ]

  const options = [
    {
      name: 'edit',
      action: (id) => console.log(`'test edit' ${id}`),
    },
    {
      name: 'delete',
      action: (id) => console.log(`'test delete' ${id}`),
    }
  ]

  return (
    <section className={Style['container']}>
      {dashboards.map(dashboard => {
        return (
          <Slide
            key={dashboard.id}
            title={dashboard.name}
            id={dashboard.id}
            image={dashboard.preview}
            options={options}
          />
        )
      })}
      <SlideButton />
    </section>
  )
}