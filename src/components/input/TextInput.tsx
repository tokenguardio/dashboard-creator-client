import React from 'react'
import { forwardRef, Ref } from 'react'

import { Label } from '@/components/label/Label'

import Style from './TextInput.module.scss'

interface TextInputProps {
  value: string,
  name: string,
  label?: string,
  defaultValue?: string,
  placeholder?: string,
  change: (e: React.ChangeEvent<HTMLInputElement>) => void,
  blur?: () => void,
  ref?: Ref<HTMLInputElement>,
}

export const TextInput: React.FC<TextInputProps> = forwardRef(function MyInput(props, ref) {
  const { value, change, blur, name, label, placeholder, defaultValue } = props

  return (
    <div className={Style['input-container']}>
      {label && <Label text={label} forInput={name} />}

      <input
        type="text"
        name={name}
        value={value || ''}
        defaultValue={defaultValue}
        className={Style['input']}
        placeholder={placeholder || ''}
        onChange={change}
        onBlur={blur}
        ref={ref}
      />
    </div>
  );
});
