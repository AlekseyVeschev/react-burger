import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { ingredientPropTypes } from "../../types/ingredient-props"
import { Ingredient } from '../ingredient/ingredient'
import styles from './ingredients-group.module.css'


export const IngredientsGroup = ({ id, title, ingredients, observer, onClickIngredient }) => {

   const [refElement, setRef] = useState(null)

   useEffect(() => {
      if (refElement && observer) {
         observer.observe(refElement)
      }

      return () => {
         if (refElement && observer) {
            observer.unobserve(refElement)
         }
      }
   }, [refElement, observer])

   return (
      <section ref={setRef} id={id}>
         <h2>{title}</h2>
         <ul className={styles.content} >
            {ingredients?.map(ing =>
               <Ingredient
                  key={ing._id}
                  ing={ing}
                  onClick={onClickIngredient}
               />
            )}
         </ul>
      </section>

   )
}

IngredientsGroup.propTypes = {
   id: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   ingredients: PropTypes.arrayOf(ingredientPropTypes),
   observer: PropTypes.object,
   onClickIngredient: PropTypes.func,
}