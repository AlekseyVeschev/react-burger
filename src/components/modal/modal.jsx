import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import styles from './modal.module.css'

export const Modal = ({ title, onClose, ...props }) => {

   useEffect(() => {
      const handleESCclose = (e) => {
         if (e.code === "Escape") {
            onClose()
         }
      }
      document.addEventListener("keydown", handleESCclose)
      return () => {
         document.removeEventListener("keydown", handleESCclose)
      }
   }, [onClose])

   return createPortal(
      <>
         <div
            className={`${styles.wrapper} p-5`}
            onClick={onClose}
         />
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
   onClose: PropTypes.func
}