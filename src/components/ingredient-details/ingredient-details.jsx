import PropTypes from 'prop-types';
import styles from './styles.module.css'

export const IngredientDetails = ({ img, name, calories, proteins, fat, carbohydrates }) => {
   return (
      <section className={styles.root}>
         <img src={img} alt="img" className={styles.image} />
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
   );
}

IngredientDetails.propTypes = {
   img: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   calories: PropTypes.number.isRequired,
   proteins: PropTypes.number.isRequired,
   fat: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired
}