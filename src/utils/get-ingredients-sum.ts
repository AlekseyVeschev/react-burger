import { INGREDIENTS_TYPES } from './constants'
import { TIngredient } from './../types/data';

export const getIngredientsSum = (ingredientsAll: Array<TIngredient> = [], selectedIds: Array<TIngredient['_id']> = []) => {
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