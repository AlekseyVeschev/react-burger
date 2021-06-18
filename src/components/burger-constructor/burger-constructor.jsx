import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import { TYPES_DND } from '../../utils/constants'
import { getOrder, removeConstructorIngredient, removeOrder, setSelectedIngredient, sortIngredients } from './actions'
import { decreaseCount, increaseCount } from '../burger-ingredients/actions'
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderDetails } from '../order-details/order-details'
import { ModalOverlay } from '../modal-overlay/modal-overlay'
import { IngredientConstructor } from '../Ingredient-constructor/Ingredient-constructor'
import styles from './styles.module.css'



export const BurgerConstructor = () => {

   const dispatch = useDispatch()
   const { selectedBun, selectedIngredients, bunsSum,
      ingredientsSum, error, orderNumber, loading
   } = useSelector(state => state.selectedIngredients)

   const selectedIds = useMemo(() => {
      const result = selectedIngredients.map(ing => ing._id)
      return selectedBun
         ? [...result, selectedBun?._id]
         : result
   }, [selectedIngredients, selectedBun])

   const setIngredient = useCallback((ing) => {
      dispatch(setSelectedIngredient(ing))
      dispatch(increaseCount({ id: ing._id, type: ing.type }))
   }, [dispatch])

   const removeIngredient = useCallback(({ id, idx, price }) => {
      dispatch(removeConstructorIngredient({ idx, price }))
      dispatch(decreaseCount(id))
   }, [dispatch])

   const moveIngredient = useCallback((dragIndex, hoverIndex) => {
      dispatch(sortIngredients({ dragIndex, hoverIndex }))
   }, [dispatch])

   const closeConstructorModal = useCallback(() => {
      dispatch(removeOrder())
   }, [dispatch])

   const handleClick = useCallback(() => {
      if (selectedBun) {
         dispatch(getOrder(selectedIds))
      }
   }, [dispatch, selectedBun, selectedIds])

   const [{ isHover }, dropRef] = useDrop({
      accept: TYPES_DND.ingredients,
      drop(ing) {
         setIngredient(ing)
      },
      collect: monitor => ({
         isHover: monitor.isOver(),
      }),
   })
   const [, drop] = useDrop(() => ({ accept: TYPES_DND.items }))
   return (
      <main ref={dropRef} className={`${isHover ? styles.active : styles.root}`}>
         {error
            ? `Ошибка: ${error.message}`
            : (loading
               ? "Загружаю..."
               : (orderNumber && (
                  <ModalOverlay onClose={closeConstructorModal}>
                     <OrderDetails
                        orderNumber={orderNumber}
                        info=" Ваш заказ начали готовить"
                        text=" Дождитесь готовности на орбитальной станции"
                     />
                  </ModalOverlay>
               ))
            )}
         {!!selectedBun && (
            <div className={`${styles.locked_block} mr-2`} >
               <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${selectedBun.name} (верх)`}
                  price={selectedBun.price}
                  thumbnail={selectedBun.image}
               />
            </div>
         )}
         <ul ref={drop} className={`${styles.wrapper_elements} mt-2 mb-2 pr-2`}>
            {selectedIngredients && selectedIngredients.map((ing, idx) =>
               <IngredientConstructor
                  key={`${ing._id}-${idx}`}
                  ing={ing}
                  idx={idx}
                  removeIngredient={removeIngredient}
                  moveIngredient={moveIngredient}
               />
            )}
         </ul>
         {!!selectedBun && (
            <div className={`${styles.locked_block} mr-2`}>
               <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${selectedBun.name} (низ)`}
                  price={selectedBun.price}
                  thumbnail={selectedBun.image}
               />
            </div>
         )}
         <section className={`${styles.section} pr-1`}>
            <p className="text text_type_digits-medium">
               {`${ingredientsSum + bunsSum}`}
            </p>
            <div className="m-5">
               <CurrencyIcon type="primary" />
            </div>
            <div className="m-5 mr-1">
               <Button
                  type="primary"
                  size="large"
                  onClick={handleClick}
               >
                  Оформить заказ
               </Button>
            </div>
         </section>
      </main>
   )
}