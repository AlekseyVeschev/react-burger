import { useCallback, useMemo, useState, useContext } from 'react'
import PropTypes from 'prop-types';
import { INGREDIENTS_TYPES, INGREDIENTS_TYPES_NAME, SORTED_INGREDIENTS_TYPES } from '../../utils/constants';
import { ingredientPropTypes } from '../../types/ingredient-props';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Ingredient } from '../ingredient/ingredient';
import styles from './styles.module.css'
import { IngredientsContext } from '../app/app';


export const BurgerIngredients = ({ ingredients }) => {

   const { dispatch } = useContext(IngredientsContext);

   const [currentTab, setCurrentTab] = useState(INGREDIENTS_TYPES.bun)
   const [currentId, setCurrentId] = useState("")
   const [isModalOpen, setIsModalOpen] = useState(false)

   const filterIngredients = useCallback((type) =>
      ingredients.filter((ing) => ing.type === type)
      , [ingredients])

   const groupedIngredients = useMemo(() => ({
      [INGREDIENTS_TYPES.bun]: filterIngredients(INGREDIENTS_TYPES.bun),
      [INGREDIENTS_TYPES.sauce]: filterIngredients(INGREDIENTS_TYPES.sauce),
      [INGREDIENTS_TYPES.main]: filterIngredients(INGREDIENTS_TYPES.main)
   }), [filterIngredients])

   const currentIngredient = useMemo(
      () => ingredients.find((ing) => ing._id === currentId),
      [ingredients, currentId]
   )

   const openIngredientModal = useCallback(({ id, price, type }) => {
      dispatch({
         type: "setSelectedIngredient",
         payload: { id: id, price: price, type: type }
      })
      setCurrentId(id)
      setIsModalOpen(true)
   }, [dispatch])

   const closeIngredientModal = useCallback(() => {
      setIsModalOpen(false)
   }, [])

   const setTab = useCallback((currentTab) => {
      setCurrentTab(currentTab)

      const tab = document.getElementById(currentTab)
      if (tab) tab.scrollIntoView({ behavior: "smooth" })
   }, [])

   return (
      <main className={styles.root}>
         <nav className={styles.navbar}>
            <Tab
               id={INGREDIENTS_TYPES.bun}
               value={INGREDIENTS_TYPES.bun}
               active={currentTab === INGREDIENTS_TYPES.bun}
               onClick={setTab}
            >
               Булки
            </Tab>
            <Tab
               id={INGREDIENTS_TYPES.sauce}
               value={INGREDIENTS_TYPES.sauce}
               active={currentTab === INGREDIENTS_TYPES.sauce}
               onClick={setTab}
            >
               Соусы
            </Tab>
            <Tab
               id={INGREDIENTS_TYPES.main}
               value={INGREDIENTS_TYPES.main}
               active={currentTab === INGREDIENTS_TYPES.main}
               onClick={setTab}
            >
               Начинки
            </Tab>
         </nav>
         <div className={`${styles.wrapper_section} mt-5`}>
            {isModalOpen && (
               <ModalOverlay
                  title="Детали ингредиента"
                  onClose={closeIngredientModal}
               >
                  <IngredientDetails
                     img={currentIngredient.image_large}
                     name={currentIngredient.name}
                     calories={currentIngredient.calories}
                     proteins={currentIngredient.proteins}
                     fat={currentIngredient.fat}
                     carbohydrates={currentIngredient.carbohydrates}
                  />
               </ModalOverlay>
            )}

            {SORTED_INGREDIENTS_TYPES.map((type) =>
               <section
                  key={type}
                  id={type}
               >
                  <h2>{INGREDIENTS_TYPES_NAME[type]}</h2>
                  <ul className={styles.content}>
                     {groupedIngredients[type]?.map(ing =>
                        <Ingredient
                           key={ing._id}
                           id={ing._id}
                           type={ing.type}
                           name={ing.name}
                           img={ing.image}
                           price={ing.price}
                           count={ing.__v}
                           onClick={openIngredientModal}
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
   ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};
