import { useEffect, useState, FC } from "react"
import { TIngredient } from '../../types/data'
import { Ingredient } from '../ingredient/ingredient'
import styles from './ingredients-group.module.css'

type TIngredientsGroup = {
   id: TIngredient["_id"],
   title: string,
   ingredients: Array<TIngredient>,
   observer: IntersectionObserver,
   onClickIngredient: (_id: string) => void,
   addIngredientMobile: (_id: string) => void,
}

export const IngredientsGroup: FC<TIngredientsGroup> = ({
   id, title, ingredients,
   observer, onClickIngredient, addIngredientMobile
}) => {

   const [refElement, setRef] = useState<HTMLElement | null>(null)

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
                  addIngredientMobile={addIngredientMobile}
               />
            )}
         </ul>
      </section>

   )
}