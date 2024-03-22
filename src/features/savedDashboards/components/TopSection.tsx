import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Title } from '@/components/title/Title'
import { Subtitle } from '@/components/subtitle/Subtitle'
import { Button } from '@/components/button/Button'

import Style from './TopSection.module.css'

export const TopSection = () => {
  const navigate = useNavigate()

  return (
    <header className={Style['container']}>
      <div className={Style['headline']}>
        <Title text="My Dashboards" />
        <Subtitle text="A list of Dashboards that you have created" />
      </div>
      <Button onClick={() => navigate('/create-dashboard')}>Create dashboard</Button>
    </header>
  )
}