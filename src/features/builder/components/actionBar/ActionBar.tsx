import Style from './ActionBar.module.css'
import { Button } from '@/components/button/Button'

export const ActionBar = () => (
  <div className={Style['action-bar']}>
    <Button onClick={() => console.log('add save fn')}>Save Dashboard</Button>
  </div>
)