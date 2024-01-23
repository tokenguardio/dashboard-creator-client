import { useNavigate } from 'react-router-dom'
import Style from './TopSection.module.css'
import { Title } from '@/components/title/Title'
import { Subtitle } from '@/components/subtitle/Subtitle'
import { Button } from '@/components/button/Button'


export const TopSection = () => {
  const navigate = useNavigate()

  return (
    <header className={Style['container']}>
      <div className={Style['headline']}>
        <Title text="My Dashboards" />
        <Subtitle text="A list of Dashboards that you have created" />
      </div>
      <Button onClick={() => navigate('/add-new-element')}>Create dashboard</Button>
      {/* <ButtonIcon /> */}
    </header>
  )
}