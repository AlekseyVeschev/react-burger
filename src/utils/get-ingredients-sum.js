import { INGREDIENTS_TYPES } from './constants'

export const getIngredientsSum = (ingredientsAll = [], selectedIds = []) => {
   let result = 0
   selectedIds?.forEach(id => {
      ingredientsAll?.forEach(ing => {
         if (ing._id === id && ing.type === INGREDIENTS_TYPES.bun) {
            result = result + ing.price * 2
         }
         if (ing._id === id && ing.type !== INGREDIENTS_TYPES.bun) {
            result = result + ing.price
         }
      })
   })
   return result
}