import { NavLink } from 'react-router-dom'

import { Card } from '@/components/card/Card'
import { Icon } from '@/components/icon/Icon'
import { Dropdown } from '@/components/dropdown/Dropdown'

import Style from './Slide.module.css'
import imagePreview from '../assets/images/chart-prev.svg'

interface SlideProps {
  id: string,
  title: string,
  options: Array<() => void>
}

export const Slide: React.FC<SlideProps> = ({
  id,
  title,
  options,
}) => (
  <section className={Style['slide']}>
    <Card key={id}>
      <NavLink to={`/dashboard/${id}`}>
        <img className={Style['image']} src={imagePreview} alt="image preview" />
      </NavLink>
      <div className={Style['info-container']}>
        <NavLink to={`/dashboard/${id}`}>
          <p className={Style['name']}>{title}</p>
        </NavLink>
        <Dropdown options={options} id={id}>
          <Icon name="more" width={16} height={16} />
        </Dropdown>
      </div>
    </Card>
  </section>
)
