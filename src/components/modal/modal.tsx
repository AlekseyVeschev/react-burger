import { FC } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'

type TModal = {
   title?: string,
   onClose: () => void,
}

export const Modal: FC<TModal> = ({ title, onClose, children }) => {

   const portalDiv = document.getElementById('react-modals');

   return portalDiv && createPortal(
      <>
         <ModalOverlay onClose={onClose} />

         <div className={`${styles.root} p-5`} >
            <header className={styles.header}>
               <p className="text text_type_main-large">
                  {title}
               </p>
               <button
                  className={styles.closeButton}
                  onClick={onClose}
               >
                  <CloseIcon type="primary" />
               </button>
            </header>
            {children}
         </div>
      </>,
      portalDiv
   )
}