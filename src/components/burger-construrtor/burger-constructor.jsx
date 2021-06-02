import { useCallback, useState, useMemo } from 'react'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../types/ingredient-props';
import { ORDER } from '../../utils/constants';
import { Button, ConstructorElement, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderDetails } from '../order-details/order-details';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './styles.module.css'

export const BurgerConstructor = ({ ingredients }) => {

   const [isModalOpen, setIsModalOpen] = useState(false)

   const ingredientTypeBun = useMemo(
      () => ingredients.find(ing => ing.type === "bun"),
      [ingredients]
   )

   const openConstructorModal = useCallback(() => {
      setIsModalOpen(true)
   }, [])
   const closeConstructorModal = useCallback(() => {
      setIsModalOpen(false)
   }, [])

   return (
      <main>
         {isModalOpen && (
            <ModalOverlay onClose={closeConstructorModal}>
               <OrderDetails
                  orderNumber={ORDER.orederNumber}
                  info={ORDER.info}
                  text={ORDER.text}
               />
            </ModalOverlay>
         )}

         {!!ingredientTypeBun && (
            <div className={`${styles.locked_block} mr-5`}>
               <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={ingredientTypeBun.name}
                  price={ingredientTypeBun.price}
                  thumbnail={ingredientTypeBun.image}
               />
            </div>
         )}
         <ul className={`${styles.wrapper_elements} mt-2 mb-2 pr-2`}>
            {ingredients.map(ing =>
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
                  text={ingredientTypeBun.name}
                  price={ingredientTypeBun.price}
                  thumbnail={ingredientTypeBun.image}
               />
            </div>
         )}
         <section className={styles.section}>
            <p className="text text_type_digits-medium">
               {ORDER.summa}
            </p>
            <div className="m-5">
               <CurrencyIcon type="primary" />
            </div>
            <div className="m-5 mr-1">
               <Button
                  type="primary"
                  size="large"
                  onClick={openConstructorModal}
               >
                  Оформить заказ
               </Button>
            </div>
         </section>
      </main>
   )
}

BurgerConstructor.propTypes = {
   ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};