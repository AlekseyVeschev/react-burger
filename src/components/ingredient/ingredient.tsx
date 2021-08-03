import { useCallback, FC } from 'react'
import { useDrag } from 'react-dnd'
import { TYPES_DND } from '../../utils/constants'
import { Counter, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient } from '../../types/data'
import styles from './ingredient.module.css'

type TIngredientProps = {
   ing: TIngredient,
   onClick: (id: TIngredient["_id"]) => void,
   addIngredientMobile: (id: TIngredient["_id"]) => void
}

export const Ingredient: FC<TIngredientProps> = ({ ing, onClick, addIngredientMobile }) => {

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