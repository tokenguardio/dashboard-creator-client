import { Button } from '@/components/button/Button'

import Style from './ActionBar.module.css'

export const ActionBar = () => (
  <div className={Style['action-bar']}>
    <Button onClick={() => console.log('add save fn')}>Save Dashboard</Button>
  </div>
)