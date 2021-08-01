import { useEffect, FC } from 'react'
import styles from './modal-overlay.module.css'

type TModalOverlay = {
   onClose: () => void
}

export const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => {
   useEffect(() => {
      const handleESCclose = (e: any) => {
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