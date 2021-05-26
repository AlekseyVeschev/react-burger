import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

export const Ingredient = ({ name, price, img, count }) => {
   return (
      <li className={`${styles.root}`}>
         <img src={img} alt="" className={styles.image} />
         <div className={`${styles.currency} p-2`}>
            <div className='pr-2' >
               {price}
            </div>
            <CurrencyIcon type="primary" />
         </div>
         <div className='name p-5 pt-1'>
            {name}
         </div>
         {count !== 0 && <Counter count={count} size="default" />}
      </li>
   )
}

Ingredient.price = PropTypes.shape({
   name: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   image: PropTypes.string.isRequired,
   count: PropTypes.number.isRequired,
})