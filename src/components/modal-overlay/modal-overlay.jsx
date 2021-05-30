import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Modal } from '../modal/modal';
import styles from './styles.module.css'

export const ModalOverlay = ({ title, onClose, ...props }) => {

   useEffect(() => {
      document.addEventListener("keydown", e => {
         if (e.code === "Escape") {
            onClose()
         }
         return () => {
            document.removeEventListener("keydown", onClose())
         }
      })
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
ModalOverlay.prototype = PropTypes.shape({
   title: PropTypes.string,
   onClose: PropTypes.func.isRequired,
})