import { useCallback } from 'react'
import { useDrag } from 'react-dnd'
import { TYPES_DND } from '../../utils/constants'
import PropTypes from 'prop-types'
import { Counter, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'

export const Ingredient = ({ ing, onClick, addIngredientMobile }) => {

   const { _id, name, price, image, count } = ing

   const [{ opacity }, dragRef] = useDrag({
      type: TYPES_DND.ingredients,
      item: ing,
      collect: monitor => ({
         opacity: monitor.isDragging() ? 0.5 : 1
      })
   })

   const handlelClick = useCallback((e) => {
      e.stopPropagation()
      onClick(_id)
   }, [onClick, _id])

   const handlelClickAdd = useCallback((e) => {
      e.stopPropagation()
      addIngredientMobile(_id)
   }, [addIngredientMobile, _id])

   return (
      <li
         style={{ opacity }}
         ref={dragRef}
         className={`${styles.root}`}
         onClick={handlelClick}
      >
         <img src={image} alt="img" className={styles.image} />
         <div className={`${styles.currency} p-2`}>
            <div className='pr-2' >
               {price}
            </div>
            <CurrencyIcon type="primary" />
         </div>
         <div className='name p-5 pt-1'>
            {name}
         </div>
         <Button type="secondary" size="small">
            <p
               className={`${styles.button_add} text text_type_main-small`}
               onClick={handlelClickAdd}
            >
               Добавить
            </p>
         </Button>
         {count && <Counter count={count} size="default" />}
      </li>
   )
}

Ingredient.propTypes = PropTypes.shape({
   name: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   img: PropTypes.string.isRequired,
   count: PropTypes.number.isRequired,
   type: PropTypes.number.isRequired,
   onClick: PropTypes.func.isRequired,
   addIngredientMobile: PropTypes.func
}).isRequired