import { Loader } from '@/components/Loader/Loader'
import { AnimationValue } from './AnimationValue'

import Style from './SingleValue.module.css'

export const SingleValue = ({
  data,
  title,
  loading,
  prefix,
  theme
}) => {

  return (
    <div
      className={Style['single-value-container']}
      style={{
        borderColor: theme?.itemGridStroke,
        borderRadius: theme?.itemGridRadius,
        backgroundColor: theme?.itemGridBgColor
      }}
    >
      {loading ? <Loader /> : (
        <div className={Style['single-value']}>
          <AnimationValue value={data?.currentValue} prefix={prefix} theme={theme} />
        </div>
      )}
      {title && <p className={Style['single-value-title']} style={{ color: theme?.textColor, fontFamily: theme?.font }}>{title}</p>}
    </div>
  )
}
