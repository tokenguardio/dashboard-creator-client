import { forwardRef, Ref } from 'react'
import Style from './TextInput.module.scss'

interface TextInputProps {
  value: string,
  change: (e: React.ChangeEvent<HTMLInputElement>) => void,
  blur: () => void,
  ref?: Ref<HTMLInputElement>,
}

export const TextInput: React.FC<TextInputProps> = forwardRef(function MyInput(props, ref) {
  const { value, change, blur } = props;
  return (
    <input
      type="text"
      value={value || ''}
      className={Style['input']}
      onChange={change}
      onBlur={blur}
      ref={ref}
    />
  );
});
