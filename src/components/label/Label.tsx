import Style from './Label.module.css'

interface LabelProps {
  text: string;
  forInput: string;
}

export const Label: React.FC<LabelProps> = ({ text, forInput }) => {
  return (
    <label className={Style['label']} htmlFor={forInput}>
      {text}
    </label>
  )
}