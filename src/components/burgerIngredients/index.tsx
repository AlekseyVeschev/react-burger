import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '../ingredient';
import { ingredientPropTypes } from '../burgerConstrurtor';
import styles from './styles.module.css'

const INGREDIENTS = {
   bun: 'bun',
   sauce: 'sauce',
   main: 'main',
}

const INGREDIENTS_NAME = {
   [INGREDIENTS.bun]: "Булки",
   [INGREDIENTS.sauce]: "Соусы",
   [INGREDIENTS.main]: "Начинки",
}

export const BurgerIngredients = ({ ingredients }: { ingredients: any[] }) => {

   const [current, setCurrent] = React.useState(INGREDIENTS.bun)

   const filterIngredients = ingredients.filter((ing) => ing.type === current)

   return (
      <main className={styles.root}>
         <nav className={styles.navbar}>
            <Tab
               value={INGREDIENTS.bun}
               active={current === INGREDIENTS.bun}
               onClick={setCurrent}
            >
               Булки
            </Tab>
            <Tab
               value={INGREDIENTS.sauce}
               active={current === INGREDIENTS.sauce}
               onClick={setCurrent}
            >
               Соусы
            </Tab>
            <Tab
               value={INGREDIENTS.main}
               active={current === INGREDIENTS.main}
               onClick={setCurrent}
            >
               Начинки
            </Tab>
         </nav>
         <section className={styles.sections}>
            <h2>{INGREDIENTS_NAME[current]}</h2>
            <div className={styles.content}>
               {filterIngredients.map(ing =>
                  <Ingredient
                     key={ing._id}
                     name={ing.name}
                     img={ing.image}
                     price={ing.price}
                     count={ing.__v}
                  />
               )}
            </div>
         </section>
      </main>
   )
}

// eslint-disable-next-line react/no-typos
BurgerIngredients.PropTypes = {
   ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};