import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from '../../utils/hooks'
import { useHistory } from 'react-router-dom'
import { INGREDIENTS_TYPES, INGREDIENTS_TYPES_NAME, SORTED_INGREDIENTS_TYPES } from '../../utils/constants'
import { Tab, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsGroup } from '../ingredients-group/ingredients-group'
import { Loading } from '../loading/loading'
import styles from './burger-ingredients.module.css'


export const BurgerIngredients = () => {

   const history = useHistory()
   const { ingredients, isLoading, error } = useSelector(state => state.ingredients)

   const [currentTab, setCurrentTab] = useState(INGREDIENTS_TYPES.bun)

   const filterIngredients = useCallback((type) =>
      ingredients.filter((ing) => ing.type === type)
      , [ingredients])

   const groupedIngredients = useMemo(() => ({
      [INGREDIENTS_TYPES.bun]: filterIngredients(INGREDIENTS_TYPES.bun),
      [INGREDIENTS_TYPES.sauce]: filterIngredients(INGREDIENTS_TYPES.sauce),
      [INGREDIENTS_TYPES.main]: filterIngredients(INGREDIENTS_TYPES.main)
   }), [filterIngredients])

   const openIngredientModal = useCallback((_id) => {
      history.push({
         pathname: `/ingredients/${_id}`
      })
   }, [history])

   const addIngredient = useCallback((_id) => {
      console.log("id", _id)
   }, [])

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
               const nextSibling = entry?.target?.nextSibling as HTMLDivElement
               const nextTab = nextSibling?.id
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
      <main className={`${styles.root} mr-5`}>
         <nav className={styles.navbar} >
            {SORTED_INGREDIENTS_TYPES.map((type) => (
               <Tab
                  // @ts-ignore
                  id={type}
                  key={type}
                  value={type}
                  active={currentTab === type}
                  onClick={scrollToTab}
               >
                  {INGREDIENTS_TYPES_NAME[type]}
               </Tab>
            ))}
         </nav>
         {error ? (
            `Ошибка: ${error.message}`
         ) : (
            <div ref={ref} className={`${styles.wrapper_section} mt-5`}>
               {isLoading ? (
                  <Loading />
               ) : (SORTED_INGREDIENTS_TYPES.map((type) => (
                  <IngredientsGroup
                     key={type}
                     id={type}
                     title={INGREDIENTS_TYPES_NAME[type]}
                     ingredients={groupedIngredients[type]}
                     observer={observer}
                     onClickIngredient={openIngredientModal}
                     addIngredientMobile={addIngredient}
                  />
               )))}
            </div>
         )}
         <footer className={`${styles.footer} pt-4 pb-4 pr-1`}>
            <p className="text text_type_digits-default mr-2">
               420
            </p>
            <CurrencyIcon type="primary" />
            <Button
               type="primary"
               size="small"
            >
               Смотреть заказ
            </Button>
         </footer>
      </main >
   )
}