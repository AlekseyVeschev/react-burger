import { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { TYPES_DND } from '../../utils/constants'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient } from '../../types/data'
import styles from './ingredient-constructor.module.css'

type TIng = {
   id: TIngredient["_id"],
   idx: number,
   price: TIngredient["price"]
}
type TIngredientConstructor = {
   ing: TIngredient,
   idx: number,
   removeIngredient: (ing: TIng) => void,
   moveIngredient: (item: number, idx: number) => void
}

export const IngredientConstructor: FC<TIngredientConstructor> = ({ ing, idx, removeIngredient, moveIngredient }) => {

   const [, dragRef] = useDrag({
      type: TYPES_DND.items,
      item: { idx },
      end: (item, monitor) => {
         const didDrop = monitor.didDrop()
         if (!didDrop) {
            moveIngredient(item.idx, idx)
         }
      },
   }, [idx, moveIngredient])

   const [, dropRef] = useDrop({
      accept: TYPES_DND.items,
      canDrop: () => false,
      hover: (item: TIng) => {
         const dragIndex = item.idx
         const hoverIndex = idx
         if (dragIndex === hoverIndex) {
            return
         }
         item.idx = hoverIndex
         moveIngredient(dragIndex, hoverIndex)
      }
   }, [idx, moveIngredient])

   return (
      <li
         className={`${styles.element} mb-2 mt-2`}
         ref={node => dragRef(dropRef(node))}
      >
         <div className=" mr-2" >
            <DragIcon type="primary" />
         </div>
         <ConstructorElement
            text={ing.name}
            price={ing.price}
            thumbnail={ing.image}
            handleClose={() => removeIngredient({
               id: ing._id,
               idx: idx,
               price: ing.price
            })}
         />
      </li>
   )
}