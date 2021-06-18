import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import styles from './styles.module.css'

export const Content = () => {
  return (
    <div className={`${styles.root} pl-1 pr-1 pt-5`}>
      <p className="text text_type_main-large pt-5 pb-5">
        Соберите бургер
      </p>
      <div className={styles.wrapper}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider >
      </div>
    </div>
  )
}