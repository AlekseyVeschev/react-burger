import { useDrag, useDrop } from 'react-dnd'
import { TYPES_DND } from '../../utils/constants'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import styles from './ingredient-constructor.module.css'


export const IngredientConstructor = ({ ing, idx, removeIngredient, moveIngredient }) => {

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
      hover: (item) => {
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
      <li className={styles.element} ref={node => dragRef(dropRef(node))} >
         <div className="ml-4 mr-3" >
            <DragIcon type="primary" />
         </div>
         <ConstructorElement
            text={ing.name}
            price={ing.price}
            thumbnail={ing.image}
            handleClose={() => removeIngredient({ id: ing._id, idx: idx, price: ing.price })}
         />
      </li>
   )
}

IngredientConstructor.propTypes = PropTypes.shape({
   idx: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   img: PropTypes.string.isRequired,
   count: PropTypes.number.isRequired,
   type: PropTypes.number.isRequired,
   removeIngredient: PropTypes.func.isRequired,
   moveIngredient: PropTypes.func.isRequired
}).isRequired