import Style from './TextInput.module.scss'

export const TextInput = ({
  value,
  change,
  blur,
  ref,
}) => {

  return (
    <input
      type="text"
      value={value || ''}
      className={Style['input']}
      onChange={(change)}
      onBlur={blur}
      ref={ref}
    />
  )
}
