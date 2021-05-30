import PropTypes from 'prop-types';
import checkMarkImg from '../../images/done.png'
import styles from './styles.module.css'

export const OrderDetails = ({ orderNumber, info, text }) => {
   return (
      <section className={styles.root} >
         <p className="text text_type_digits-large pb-5">
            {orderNumber}
         </p>
         <p className="text text_type_main-medium pt-3 pb-5">
            идентификатор заказа
         </p>
         <img src={checkMarkImg} alt="img" className={styles.image} />
         <p className="text text_type_main-default pt-5 pb-2">
            {info}
         </p>
         <p className={`${styles.button_block} text text_type_main-default`}>
            {text}
         </p>
      </section >
   );
}
OrderDetails.prototype = PropTypes.shape({
   orderNumber: PropTypes.string.isRequired,
   info: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
})