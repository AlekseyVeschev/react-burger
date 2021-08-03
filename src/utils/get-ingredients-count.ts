import { TIngredient } from './../types/data';
import { INGREDIENTS_TYPES } from './constants'

type TIngredientCountsById = {
   [key: string]: number
}

export const getIngredientsCount = (ingredientsAll: Array<TIngredient> = [], selectedIds: Array<TIngredient["_id"]> = []) => {
   const ingredientCountsById: TIngredientCountsById = {}
   selectedIds?.forEach((id) => {
      ingredientCountsById[id] = (ingredientCountsById[id] || 0) + 1
   })

   const selectedIng: Array<TIngredient> = []
   Object.keys(ingredientCountsById).forEach(id => {
      ingredientsAll.forEach((ing => {
         if (ing._id === id && ing.type !== INGREDIENTS_TYPES.bun) {
            selectedIng.push({ ...ing, count: ingredientCountsById[id] })
         } else if (ing._id === id && ing.type === INGREDIENTS_TYPES.bun) {
            selectedIng.unshift({ ...ing, count: 2 })
         }
      }))
   })
   return selectedIng
}