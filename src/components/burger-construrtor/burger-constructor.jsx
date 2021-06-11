import { useCallback, useState, useContext, useMemo } from 'react'
import { Api } from '../../utils/api';
import { IngredientsContext, OrderContext } from '../app/app';
import { Button, ConstructorElement, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderDetails } from '../order-details/order-details';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './styles.module.css'


export const BurgerConstructor = () => {

   const [isModalOpen, setIsModalOpen] = useState(false)
   const [error, setError] = useState("")

   const { state, dispatch } = useContext(IngredientsContext)
   const { ingredients, bunId, selectedIngredientsIds, bunsSum, ingredientsSum } = state
   const [orderNumber, setOrderNumber] = useContext(OrderContext)

   const ingredientTypeBun = useMemo(
      () => ingredients.find(ing => ing._id === bunId),
      [ingredients, bunId]
   )
   const selectionIngredients = useMemo(
      () => {
         const result = [];
         selectedIngredientsIds.forEach(id =>
            ingredients.forEach(ing => {
               if (ing._id === id) {
                  result.push(ing)
               }
            })
         )
         return result
      },
      [selectedIngredientsIds, ingredients]
   )
   const handleClose = useCallback(({ idx, price }) => {
      dispatch({ type: "removeIngredient", payload: { idx, price } })
   }, [dispatch])

   const closeConstructorModal = useCallback(() => {
      setIsModalOpen(false)
   }, [])

   const handleOnClick = useCallback(
      () => {
         if (ingredientTypeBun) {
            Api.createOrder([...selectedIngredientsIds, bunId])
               .then((data) => {
                  setError("");
                  setOrderNumber(data.order.number)
                  setIsModalOpen(true)
               })
               .catch(error => setError(error.message))
         }
      },
      [setOrderNumber, selectedIngredientsIds, ingredientTypeBun, bunId]
   )

   return (
      <main>
         {!error
            ? (isModalOpen && (
               <ModalOverlay onClose={closeConstructorModal}>
                  <OrderDetails
                     orderNumber={orderNumber}
                     info=" Ваш заказ начали готовить"
                     text=" Дождитесь готовности на орбитальной станции"
                  />
               </ModalOverlay>
            ))
            : `Ошибка: ${error}`
         }

         {!!ingredientTypeBun && (
            <div className={`${styles.locked_block} mr-5`}>
               <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${ingredientTypeBun.name} (верх)`}
                  price={ingredientTypeBun.price}
                  thumbnail={ingredientTypeBun.image}
               />
            </div>
         )}
         <ul className={`${styles.wrapper_elements} mt-2 mb-2 pr-2`}>
            {selectionIngredients && selectionIngredients.map((ing, idx) =>
               <li
                  key={`${ing._id}-${idx}`}
                  className={styles.element}
               >
                  <div className="ml-4 mr-3">
                     <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                     text={ing.name}
                     price={ing.price}
                     thumbnail={ing.image}
                     handleClose={() => handleClose({ idx: idx, price: ing.price })}
                  />
               </li>
            )}
         </ul>
         {!!ingredientTypeBun && (
            <div className={`${styles.locked_block} mr-5`}>
               <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${ingredientTypeBun.name} (низ)`}
                  price={ingredientTypeBun.price}
                  thumbnail={ingredientTypeBun.image}
               />
            </div>
         )}
         <section className={styles.section}>
            <p className="text text_type_digits-medium">
               {ingredientsSum + bunsSum}
            </p>
            <div className="m-5">
               <CurrencyIcon type="primary" />
            </div>
            <div className="m-5 mr-1">
               <Button
                  type="primary"
                  size="large"
                  onClick={handleOnClick}
               >
                  Оформить заказ
               </Button>
            </div>
         </section>
      </main>
   )
}