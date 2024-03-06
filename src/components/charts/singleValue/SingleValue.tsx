import { Loader } from '@/components/loader/_Loader'
import { AnimationValue } from './AnimationValue'

import Style from './SingleValue.module.css'

export const SingleValue = ({
  data,
  title,
  loading,
  prefix,
}) => {

  return (
    <div className={Style['single-value-container']}>
      {loading ? <Loader /> : (
        <div className={Style['single-value']}>
          <AnimationValue value={data?.currentValue} prefix={prefix} />
        </div>
      )}
      {title && <p className={Style['single-value-title']}>{title}</p>}
    </div>
  )
}
