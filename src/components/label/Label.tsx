import Style from './Label.module.css'

export const Label = ({ text, forInput }) => {
  return (
    <label className={Style['label']} htmlFor={forInput}>
      {text}
    </label>
  )
}