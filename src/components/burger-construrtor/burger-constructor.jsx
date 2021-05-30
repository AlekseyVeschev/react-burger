import { useCallback, useState, useMemo } from 'react'
import PropTypes from 'prop-types';
import { ORDER } from '../../utils/constants';
import { Button, ConstructorElement, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderDetails } from '../order-details/order-details';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './styles.module.css'

export const BurgerConstructor = ({ ingredients }) => {

   const [isModalOpen, setIsModalOpen] = useState(false)

   const selectedIngredient = useMemo(
      () => ingredients.filter(ing => ing.__v > 0),
      [ingredients]
   )

   const ingredientTypeBun = useMemo(
      () => ingredients.find(ing => ing.type === "bun"),
      [ingredients]
   )

   const sum = useMemo(() =>
      selectedIngredient.reduce((acc, ing) => (ing.price * ing.__v) + acc, 0),
      [selectedIngredient])

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
                  orderNumber={ORDER.number}
                  info={ORDER.info}
                  text={ORDER.text}
               />
            </ModalOverlay>
         )}

         {!!ingredientTypeBun && (
            <div className={styles.locked_block}>
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
            {selectedIngredient.map(ing =>
               <li
                  key={ing._id}
                  className={styles.element}
               >
                  <div className="mr-3">
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
            <div className={styles.locked_block}>
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
               {sum}
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

export const ingredientPropTypes = PropTypes.shape({
   _id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   proteins: PropTypes.number.isRequired,
   fat: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired,
   calories: PropTypes.number.isRequired,
   price: PropTypes.number.isRequired,
   image: PropTypes.string.isRequired,
   image_mobile: PropTypes.string.isRequired,
   image_large: PropTypes.string.isRequired,
   __v: PropTypes.number.isRequired,
})

BurgerConstructor.propTypes = {
   ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};