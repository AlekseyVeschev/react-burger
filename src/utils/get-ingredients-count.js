import { INGREDIENTS_TYPES } from './constants'

export const getIngredientsCount = (ingredientsAll = [], selectedIds = []) => {
   const ingredientCountsById = {}
   selectedIds?.forEach((id) => {
      ingredientCountsById[id] = (ingredientCountsById[id] || 0) + 1
   })

   const selectedIng = []
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