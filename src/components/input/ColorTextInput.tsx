import { forwardRef, Ref } from 'react'

import { Label } from '@/components/label/Label'

import Style from './ColorTextInput.module.scss'

interface TextInputProps {
  value: string,
  name: string,
  label?: string,
  defaultValue?: string,
  placeholder?: string,
  change: (e: React.ChangeEvent<HTMLInputElement>) => void,
  blur: () => void,
  ref?: Ref<HTMLInputElement>,
}

export const ColorTextInput: React.FC<TextInputProps> = forwardRef(function MyInput(props, ref) {
  const { value, change, blur, name, label, placeholder, defaultValue } = props

  return (
    <div className={Style['container']}>
      {label && <Label text={label} forInput={name} />}

      <div className={Style['input-container']}>
        <input className={Style['color-input']} type="color" value={value || ''} onChange={change} />
        <input
          type="text"
          name={name}
          value={value || ''}
          defaultValue={defaultValue}
          className={Style['text-input']}
          placeholder={placeholder || ''}
          onChange={change}
          onBlur={blur}
          ref={ref}
        />
      </div>
    </div>
  );
});
