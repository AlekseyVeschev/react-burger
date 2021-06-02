import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'


export const Ingredient = ({ id, name, price, img, count, onClick }) => {

   const handlelClick = useCallback(() => {
      onClick(id)
   }, [onClick, id])

   return (
      <li
         className={`${styles.root}`}
         onClick={handlelClick}
      >
         <img src={img} alt="img" className={styles.image} />
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

Ingredient.propTypes = PropTypes.shape({
   id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   image: PropTypes.string.isRequired,
   count: PropTypes.number.isRequired,
   onClick: PropTypes.func.isRequired
}).isRequired