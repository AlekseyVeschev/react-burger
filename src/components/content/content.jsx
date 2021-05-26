import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-construrtor/burger-constructor';
import styles from './styles.module.css'
import { DATA } from '../../utils/data';


export const Content = () => {
  return (
    <div className={`${styles.root} pl-1 pr-1`}>
      <h1>Соберите бургер</h1>
      <div className={styles.wrapper}>
        <BurgerIngredients ingredients={DATA} />
        <BurgerConstructor ingredients={DATA} />
      </div>
    </div>
  );
}

