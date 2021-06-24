import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { Modal } from '../modal/modal'
import styles from './modal-overlay.module.css'

export const ModalOverlay = ({ title, onClose, ...props }) => {

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
            className={`${styles.root} p-5`}
            onClick={onClose}
         />
         <Modal
            title={title}
            onClickCloseButton={onClose}
         >
            {props.children}
         </Modal>
      </>,
      document.getElementById('react-modals')
   )
}
ModalOverlay.propTypes = {
   title: PropTypes.string,
   onClose: PropTypes.func
}