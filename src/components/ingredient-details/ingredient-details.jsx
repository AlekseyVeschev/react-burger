import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './ingredient-details.module.css'

export const IngredientDetails = ({ title }) => {

   const { id } = useParams()
   const { ingredients } = useSelector(state => state.ingredients)


   const { image_large, name, calories, proteins, fat, carbohydrates } = useMemo(
      () => ingredients?.find(ing => ing._id === id) || {},
      [ingredients, id]
   )

   return (
      <section className={styles.root}>
         {!!title && (
            <header className={`${styles.header} p-3`}>
               <p className="text text_type_main-large">
                  {title}
               </p>
            </header>
         )}
         <img src={image_large} alt={name} className={styles.image} />
         <div className="pt-4">
            <p className="text text_type_main-medium pb-3">
               {name}
            </p>
            <div className={`${styles.info} pt-5 pb-5`}>
               <div>
                  <p className="text text_type_main-default ">
                     Калории,ккал
                  </p>
                  <p className="text text_type_digits-default">
                     {calories}
                  </p>
               </div>
               <div>
                  <p className="text text_type_main-default">
                     Белки, г
                  </p>
                  <p className="text text_type_digits-default">
                     {proteins}
                  </p>
               </div>
               <div>
                  <p className="text text_type_main-default">
                     Жиры, г
                  </p>
                  <p className="text text_type_digits-default">
                     {fat}
                  </p>
               </div>
               <div>
                  <p className="text text_type_main-default">
                     Углеводы, г
                  </p>
                  <p className="text text_type_digits-default">
                     {carbohydrates}
                  </p>
               </div>
            </div>
         </div>
      </section >
   )
}
IngredientDetails.propTypes = {
   title: PropTypes.string
}