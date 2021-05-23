import { Button, ConstructorElement, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'
import PropTypes from 'prop-types';

export const BurgerConstructor = ({ ingredients }: { ingredients: any[] }) => {

   const selectedIngredient = ingredients.filter(ing => ing.__v > 0)

   const sum = selectedIngredient.reduce((acc, ing) => (ing.price * ing.__v) + acc, 0)

   return (
      <main className={styles.root}>
         {selectedIngredient.map((ing, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === selectedIngredient.length - 1;

            return (
               <div
                  key={ing._id}
                  className={styles.element}
               >
                  {!isFirst && !isLast &&
                     <div className="mr-3">
                        <DragIcon type="primary" />
                     </div>
                  }
                  <ConstructorElement
                     type={isFirst ? "top" : isLast ? "bottom" : undefined}
                     isLocked={isFirst || isLast}
                     text={ing.name}
                     price={ing.price}
                     thumbnail={ing.image}
                  />
               </div>
            )
         })}
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

// eslint-disable-next-line react/no-typos
BurgerConstructor.PropTypes = {
   ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};