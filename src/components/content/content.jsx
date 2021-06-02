import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-construrtor/burger-constructor';
import styles from './styles.module.css'

export const Content = ({ ingredients }) => {
  return (
    <div className={`${styles.root} pl-1 pr-1 pt-5`}>
      <p className="text text_type_main-large pt-5 pb-5">
        Соберите бургер
      </p>
      <div className={styles.wrapper}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </div>
    </div>
  );
}
