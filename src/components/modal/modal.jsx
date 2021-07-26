import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'

export const Modal = ({ title, onClose, ...props }) => {
   return createPortal(
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
            {props.children}
         </div>
      </>,
      document.getElementById('react-modals')
   )
}
Modal.propTypes = {
   title: PropTypes.string,
   onClickCloseButton: PropTypes.func
}