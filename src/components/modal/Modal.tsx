import { IconButton } from '@/components/button/IconButton'
import { Icon } from '@/components/icon/Icon'

import Style from './Modal.module.css'

export const Modal = ({
  children,
  title,
  hasCloseButton,
  isOpen,
  // onClose,
}) => {
  return (
    <div className={Style['modal-container']}>
      <div className={Style['modal']}>
        <div className={Style['header']}>
          {title && <h1 className={Style['title']}>{title}</h1>}
          {hasCloseButton && (
            <IconButton
              onClick={() => isOpen(false)}
              icon={<Icon name="exit" height="1.6rem" width="1.6rem" />}
            />
          )}
        </div>
        {children}
      </div>
    </div>
  )
}