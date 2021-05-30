import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-construrtor/burger-constructor';
import styles from './styles.module.css'

export const Content = ({ ingredients }) => {
  return (
    <div className={`${styles.root} pl-1 pr-1`}>
      <h1>Соберите бургер</h1>
      <div className={styles.wrapper}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </div>
    </div>
  );
}

