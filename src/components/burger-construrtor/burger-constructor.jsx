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

   const ingredients = useContext(IngredientsContext)
   const [orderNumber, setOrderNumber] = useContext(OrderContext)

   const selectionIngredients = useMemo(
      () => ingredients.filter(ing => ing.type !== "bun"),
      [ingredients]
   )
   const ingredientTypeBun = useMemo(
      () => ingredients.find(ing => ing.type === "bun"),
      [ingredients]
   )
   const sumBun = useMemo(() =>
      ingredientTypeBun && ingredientTypeBun.price * 2,
      [ingredientTypeBun]
   )
   const sumBurger = useMemo(() =>
      selectionIngredients.reduce((sum, ing) => sum + ing.price, sumBun),
      [selectionIngredients, sumBun]
   )
   const IdIngredients = useMemo(
      () => ingredients.map(ing => ing._id),
      [ingredients]
   )
   const closeConstructorModal = useCallback(() => {
      setIsModalOpen(false)
   }, [])

   const handleOnClick = useCallback(() => {
      Api.createOrder(IdIngredients)
         .then(setError(""))
         .then(data => setOrderNumber(data.order.number))
         .then(setIsModalOpen(true))
         .catch(error => setError(error.message))
   }, [IdIngredients, setOrderNumber])

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
            {selectionIngredients && selectionIngredients.map(ing =>
               <li
                  key={ing._id}
                  className={styles.element}
               >
                  <div className="ml-4 mr-3">
                     <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                     text={ing.name}
                     price={ing.price}
                     thumbnail={ing.image}
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
               {sumBurger}
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