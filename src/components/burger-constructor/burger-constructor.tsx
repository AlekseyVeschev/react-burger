import { useCallback, useMemo, FC } from 'react'
import { useDispatch, useSelector } from '../../utils/hooks'
import { useDrop } from 'react-dnd'
import { useHistory } from 'react-router-dom'
import { ORDER_DETAILS, TYPES_DND } from '../../utils/constants'
import { removeConstructorIngredient, clearConstructor, setSelectedIngredient, sortIngredients } from '../../services/actions/burger-constructor'
import { clearCounts, decreaseCount, increaseCount } from '../../services/actions/burger-ingredients'
import { createOrder, removeOrder } from '../../services/actions/burger-constructor'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderDetails } from '../order-details/order-details'
import { Modal } from '../modal/modal'
import { IngredientConstructor } from '../ingredient-constructor/ingredient-constructor'
import { FooterConstructor } from '../footer-constructor/footer-constructor'
import { Loading } from '../loading/loading'
import styles from './burger-constructor.module.css'


export const BurgerConstructor: FC = () => {

   const history = useHistory()
   const dispatch = useDispatch()
   const { selectedBun, selectedIngredients, bunsSum,
      ingredientsSum
   } = useSelector(state => state.selectedIngredients)
   const { isAuth } = useSelector(state => state.auth)
   const { orderNumber, error, isLoading } = useSelector(state => state.selectedIngredients)

   const selectedIds = useMemo(() => {
      const result = selectedIngredients?.map(ing => ing._id)
      return selectedBun
         ? [...result, selectedBun._id]
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
      dispatch(clearConstructor())
      dispatch(clearCounts())
   }, [dispatch])

   const handleClick = useCallback(() => {
      if (!isAuth) {
         history.push("/login")
      } else if (selectedBun) {
         dispatch(createOrder(selectedIds))
      }
   }, [dispatch, selectedBun, selectedIds, isAuth, history])

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
      <main
         ref={dropRef}
         className={`${isHover ? styles.active : styles.root} ml-5 pl-4`}
      >
         {!!error
            ? `Ошибка: ${error.message}`
            : (isLoading
               ? <Loading />
               : (orderNumber && (
                  <Modal onClose={closeConstructorModal}>
                     <OrderDetails
                        orderNumber={orderNumber}
                        info={ORDER_DETAILS.info}
                        text={ORDER_DETAILS.text}
                     />
                  </Modal>
               ))
            )}
         {!!selectedBun && (
            <div className={styles.locked_block} >
               <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${selectedBun.name} (верх)`}
                  price={selectedBun.price}
                  thumbnail={selectedBun.image}
               />
            </div>
         )}
         <ul ref={drop} className={`${styles.wrapper_elements} mt-3 mb-3`}>
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
            <div className={`${styles.locked_block}`}>
               <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${selectedBun.name} (низ)`}
                  price={selectedBun.price}
                  thumbnail={selectedBun.image}
               />
            </div>
         )}
         <FooterConstructor
            handleClick={handleClick}
            sum={Number(`${ingredientsSum + bunsSum}`)}
            title="Оформить заказ"
         />
      </main>
   )
}