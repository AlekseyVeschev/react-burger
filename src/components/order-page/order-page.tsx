import { useMemo, FC } from 'react'
import { STATUS_TYPES_NAME } from '../../utils/constants'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient, TOrder } from '../../types/data'
import { IngredientCard } from '../ingredient-card/ingredient-card'
import { getIngredientsSum } from '../../utils/get-ingredients-sum'
import { getIngredientsCount } from '../../utils/get-ingredients-count'
import styles from './order-page.module.css'

type TOrderPage = {
  id: TOrder["_id"],
  title: string,
  ingredientsAll: Array<TIngredient>,
  orders: Array<TOrder>,
}

export const OrderPage: FC<TOrderPage> = ({ title, ingredientsAll, orders, id }) => {
  const { name, number, status, updatedAt, ingredients } = useMemo(
    () => orders?.find(order => order._id === id) || {} as TOrder
    , [orders, id])

  const sumOrder = useMemo(
    () => getIngredientsSum(ingredientsAll, ingredients),
    [ingredientsAll, ingredients]
  )
  const selectedIng = useMemo(
    () => getIngredientsCount(ingredientsAll, ingredients),
    [ingredientsAll, ingredients]
  )
  return (
    <div className={styles.root}>
      {!title &&
        <div className={styles.header}>
          <p className="text text_type_digits-default pb-5">
            {number}
          </p>
        </div >}
      <p className="text text_type_main-medium mt-5">
        {name}
      </p>
      <div className={styles.status}>
        <p className="text text_type_main-default mt-3">
          {STATUS_TYPES_NAME[status]}
        </p>
      </div>
      <p className={`${styles.title} text text_type_main-medium mb-5 pb-1 `}>
        Состав:
      </p>
      <ul className={styles.list_items}>
        {selectedIng?.map((ing, i) =>
          <li
            key={`${ing._id}${i}`}
            className={`${styles.item} m-4 pl-1`}
          >
            <section className={styles.section}>
              <IngredientCard
                src={ing.image}
              />
              <p className="text text_type_main-default ml-4">
                {ing.name}
              </p>
            </section>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">
                {ing.count} X {ing.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        )}
      </ul>
      <div className={`${styles.bottom_block} pt-5 mt-5`} >
        <p className="text text_type_main-default text_color_inactive">
          {updatedAt}
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">
            {sumOrder}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}