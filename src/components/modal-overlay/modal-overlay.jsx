import { useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

export const ModalOverlay = ({ onClose }) => {

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

   return (
      <div
         className={`${styles.wrapper} p-5`}
         onClick={onClose}
      />
   )
}
ModalOverlay.propTypes = {
   onClose: PropTypes.func
}