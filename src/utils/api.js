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
   },
   createOrder: async (idIngredients) => {
      try {
         const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients: idIngredients }),
         })
         const data = await response.json()
         if (response.ok) {
            return data
         }
         throw data.error
      } catch (error) {
         throw error
      }
   }
}
