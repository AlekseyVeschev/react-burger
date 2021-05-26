import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '../ingredient/ingredient';
import { ingredientPropTypes } from '../burger-construrtor/burger-constructor';
import styles from './styles.module.css'

const INGREDIENTS_TYPES = {
   bun: 'bun',
   sauce: 'sauce',
   main: 'main',
}
const SORTED_INGREDIENTS_TYPES = [
   INGREDIENTS_TYPES.bun,
   INGREDIENTS_TYPES.sauce,
   INGREDIENTS_TYPES.main
]
const INGREDIENTS_TYPES_NAME = {
   [INGREDIENTS_TYPES.bun]: "Булки",
   [INGREDIENTS_TYPES.sauce]: "Соусы",
   [INGREDIENTS_TYPES.main]: "Начинки",
}

export const BurgerIngredients = ({ ingredients }) => {

   const [current, setCurrent] = React.useState(INGREDIENTS_TYPES.bun)

   const filterIngredients = (type) => ingredients.filter((ing) => ing.type === type)

   const groupedIngredients = {
      [INGREDIENTS_TYPES.bun]: filterIngredients(INGREDIENTS_TYPES.bun),
      [INGREDIENTS_TYPES.sauce]: filterIngredients(INGREDIENTS_TYPES.sauce),
      [INGREDIENTS_TYPES.main]: filterIngredients(INGREDIENTS_TYPES.main)
   }

   return (
      <main className={styles.root}>
         <nav className={styles.navbar}>
            <Tab
               value={INGREDIENTS_TYPES.bun}
               active={current === INGREDIENTS_TYPES.bun}
               onClick={setCurrent}
            >
               Булки
            </Tab>
            <Tab
               value={INGREDIENTS_TYPES.sauce}
               active={current === INGREDIENTS_TYPES.sauce}
               onClick={setCurrent}
            >
               Соусы
            </Tab>
            <Tab
               value={INGREDIENTS_TYPES.main}
               active={current === INGREDIENTS_TYPES.main}
               onClick={setCurrent}
            >
               Начинки
            </Tab>
         </nav>
         <div className={`${styles.wrapper_section} mt-5`}>
            {SORTED_INGREDIENTS_TYPES.map((type) =>
               <section key={type} >
                  <h2>{INGREDIENTS_TYPES_NAME[type]}</h2>
                  <ul className={styles.content}>
                     {groupedIngredients[type].map(ing =>
                        <Ingredient
                           key={ing._id}
                           name={ing.name}
                           img={ing.image}
                           price={ing.price}
                           count={ing.__v}
                        />
                     )}
                  </ul>
               </section>
            )}
         </div>
      </main>
   )
}

BurgerIngredients.propTypes = {
   ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};