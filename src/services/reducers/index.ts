import { combineReducers } from "redux"
import { ingredientsReducer } from "./burger-ingredients"
import { constructorReducer } from "./burger-constructor"
import { authReducer } from "./auth"
import { feedReducer } from "./feed"
import { historyReducer } from "./history"

export const rootReducer = combineReducers({
   ingredients: ingredientsReducer,
   selectedIngredients: constructorReducer,
   auth: authReducer,
   feed: feedReducer,
   history: historyReducer,
})
