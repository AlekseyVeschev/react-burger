import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients, removeCurrentIngredient, setCurrentIngredient } from './actions'
import { INGREDIENTS_TYPES, INGREDIENTS_TYPES_NAME, SORTED_INGREDIENTS_TYPES } from '../../utils/constants'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../modal-overlay/modal-overlay'
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { IngredientsGroup } from '../ingredients-group/ingredients-group'
import styles from './styles.module.css'


export const BurgerIngredients = () => {
   const dispatch = useDispatch()
   const { ingredients, currentIngredient, loading, error } = useSelector(state => state.ingredients)

   const [currentTab, setCurrentTab] = useState(INGREDIENTS_TYPES.bun)

   const filterIngredients = useCallback((type) =>
      ingredients.filter((ing) => ing.type === type)
      , [ingredients])

   const groupedIngredients = useMemo(() => ({
      [INGREDIENTS_TYPES.bun]: filterIngredients(INGREDIENTS_TYPES.bun),
      [INGREDIENTS_TYPES.sauce]: filterIngredients(INGREDIENTS_TYPES.sauce),
      [INGREDIENTS_TYPES.main]: filterIngredients(INGREDIENTS_TYPES.main)
   }), [filterIngredients])

   useEffect(() => {
      dispatch(getIngredients())
   }, [dispatch])

   const openIngredientModal = useCallback((ing) => {
      dispatch(setCurrentIngredient(ing))
   }, [dispatch])

   const closeIngredientModal = useCallback(() => {
      dispatch(removeCurrentIngredient())
   }, [dispatch])

   const scrollToTab = useCallback((currentTab) => {
      const tab = document.getElementById(currentTab)
      if (tab) tab.scrollIntoView({ behavior: "smooth" })
   }, [])

   const ref = useRef(null)
   const refElement = ref.current

   const observer = useMemo(() => {
      return new IntersectionObserver(
         ([entry]) => {
            if (!entry.isIntersecting) {
               const nextTab = entry.target?.nextSibling?.id
               if (nextTab) {
                  setCurrentTab(nextTab)
               }
            } else {
               setCurrentTab(entry.target.id)
            }
         },
         { root: refElement, threshold: .5 }
      )
   }, [refElement])

   useEffect(() => {
      return () => {
         observer.disconnect()
      }
   }, [observer])

   return (
      <main className={styles.root}>
         <nav className={styles.navbar} >
            <Tab
               id={INGREDIENTS_TYPES.bun}
               value={INGREDIENTS_TYPES.bun}
               active={currentTab === INGREDIENTS_TYPES.bun}
               onClick={scrollToTab}
            >
               Булки
            </Tab>
            <Tab
               id={INGREDIENTS_TYPES.sauce}
               value={INGREDIENTS_TYPES.sauce}
               active={currentTab === INGREDIENTS_TYPES.sauce}
               onClick={scrollToTab}
            >
               Соусы
            </Tab>
            <Tab
               id={INGREDIENTS_TYPES.main}
               value={INGREDIENTS_TYPES.main}
               active={currentTab === INGREDIENTS_TYPES.main}
               onClick={scrollToTab}
            >
               Начинки
            </Tab>
         </nav>
         {error ? (
            `Ошибка: ${error.message}`
         ) : (
            <div ref={ref} className={`${styles.wrapper_section} mt-5`}>
               {loading ? (
                  "Загружаю..."
               ) : (SORTED_INGREDIENTS_TYPES.map((type) => (
                  <IngredientsGroup
                     key={type}
                     id={type}
                     title={INGREDIENTS_TYPES_NAME[type]}
                     ingredients={groupedIngredients[type]}
                     observer={observer}
                     onClickIngredient={openIngredientModal}
                  />
               )))}
            </div>
         )}
         {currentIngredient && (
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
      </main >
   )
}