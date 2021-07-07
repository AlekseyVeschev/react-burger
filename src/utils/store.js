import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { constructorReducer } from '../components/burger-constructor/services/reducers/burger-constructor'
import { ingredientsReducer } from '../components/burger-ingredients/services/reducers/burger-ingredients'
import { authReducer } from '../pages/services/reducers/auth'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: constructorReducer,
  auth: authReducer
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

export const store = createStore(rootReducer, enhancer)
