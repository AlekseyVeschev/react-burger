import { Button, ConstructorElement, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'
import PropTypes from 'prop-types';

export const BurgerConstructor = ({ ingredients }) => {

   const selectedIngredient = ingredients.filter(ing => ing.__v > 0)
   const firstIngredient = ingredients[0]
   const lastIngredient = ingredients[ingredients.length - 1]

   const sum = selectedIngredient.reduce((acc, ing) => (ing.price * ing.__v) + acc, 0)

   return (
      <main>
         <div className={styles.locked_block}>
            <ConstructorElement
               type="top"
               isLocked={true}
               text={firstIngredient.name}
               price={firstIngredient.price}
               thumbnail={firstIngredient.image}
            />
         </div>
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
         <div className={styles.locked_block}>
            <ConstructorElement
               type="bottom"
               isLocked={true}
               text={lastIngredient.name}
               price={lastIngredient.price}
               thumbnail={lastIngredient.image}
            />
         </div>
         <section className={styles.section}>
            <p className="text text_type_digits-medium">
               {sum}
            </p>
            <div className="m-5">
               <CurrencyIcon type="primary" />
            </div>
            <div className="m-5 mr-1">
               <Button type="primary" size="large">
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