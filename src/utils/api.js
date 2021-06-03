import { BASE_URL } from "./constants"

export const Api = {
   getIngredients: async () => {
      try {
         const response = await fetch(`${BASE_URL}/ingredients`)
         const data = await response.json()
         if (response.ok) {
            return data.data
         }
         throw data.error
      } catch (error) {
         throw error
      }
   }
}
