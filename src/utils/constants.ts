export const BASE_URL = "https://norma.nomoreparties.space/api"

export const INGREDIENTS_TYPES = {
   bun: 'bun',
   sauce: 'sauce',
   main: 'main',
}
export const SORTED_INGREDIENTS_TYPES = [
   INGREDIENTS_TYPES.bun,
   INGREDIENTS_TYPES.sauce,
   INGREDIENTS_TYPES.main
]
export const INGREDIENTS_TYPES_NAME = {
   [INGREDIENTS_TYPES.bun]: "Булки",
   [INGREDIENTS_TYPES.sauce]: "Соусы",
   [INGREDIENTS_TYPES.main]: "Начинки",
}
export const TYPES_DND = {
   ingredients: "ingredients",
   items: "items",
}
export const ORDER_DETAILS = {
   info: "Ваш заказ начали готовить",
   text: " Дождитесь готовности на орбитальной станции"
}
export const STATUS_TYPES = {
   created: 'created',
   pending: 'pending',
   done: 'done',
}
export const STATUS_TYPES_NAME = {
   [STATUS_TYPES.created]: "Создан",
   [STATUS_TYPES.pending]: "Готовится",
   [STATUS_TYPES.done]: "Выполнен",
}

export const MS_IN_DAY = 60 * 60 * 24 * 1000;
export const DAYS_MAP = ['сегодня', 'вчера']
export const DAY_DECLENSION = ['день', 'дня', 'дней']
