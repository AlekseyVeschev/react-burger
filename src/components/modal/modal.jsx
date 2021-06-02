import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

export const Modal = ({ title, onClickCloseButton, ...props }) => {
   return (
      <div className={`${styles.root} p-5`} >
         <header className={styles.header}>
            <p className="text text_type_main-large">
               {title}
            </p>
            <button
               className={styles.closeButton}
               onClick={onClickCloseButton}
            >
               <CloseIcon type="primary" />
            </button>
         </header>
         {props.children}
      </div>
   );
}
Modal.protoType = PropTypes.shape({
   title: PropTypes.string,
   onClickCloseButton: PropTypes.func.isRequired,
})