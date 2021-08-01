import { useCallback, useMemo, FC } from 'react'
import { useSelector } from '../../utils/hooks'
import { INGREDIENTS_TYPES, STATUS_TYPES_NAME } from '../../utils/constants'
import { TOrder } from '../../types/data'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientCard } from '../ingredient-card/ingredient-card'
import { getIngredientsSum } from '../../utils/get-ingredients-sum'
import styles from './order-card.module.css'

type TOrderCardProps = {
  order: TOrder,
  onClick: (_id: string, number: number) => void,
  status?: string
}

export const OrderCard: FC<TOrderCardProps> = ({ order, onClick, status }) => {

  const { ingredients } = useSelector(state => state.ingredients)

  const { number, name, createdAt, _id } = useMemo(() => order, [order])
  const ingredientsIds = useMemo(() => [...order.ingredients], [order])

  const sumOrder = useMemo(
    () => getIngredientsSum(ingredients, ingredientsIds),
    [ingredients, ingredientsIds]
  )

  const images = useMemo(() => {
    let result: Array<string> = []
    ingredientsIds?.forEach(id => {
      ingredients?.forEach(ing => {
        if (ing._id === id && ing.type === INGREDIENTS_TYPES.bun) {
          result.unshift(ing.image)
        }
        if (ing._id === id && ing.type !== INGREDIENTS_TYPES.bun) {
          if (!result.includes(ing.image)) {
            result.push(ing.image)
          }
        }
      })
    })
    return result
  }, [ingredientsIds, ingredients])

  const handlelClick = useCallback(() => {
    onClick(_id, number)
  }, [onClick, _id, number])

  return (
    <li
      className={`${styles.card} p-3 mb-2`}
      onClick={handlelClick}
    >
      <div className={`${styles.info} m-3`}>
        <p className="text text_type_digits-default">{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {createdAt}
        </p>
      </div>
      <div className="p-3">
        <p className="text text_type_main-medium">
          {name}
        </p>
        {!!status &&
          <p className="text text_type_main-default mt-2">
            {STATUS_TYPES_NAME[status]}
          </p>}
      </div>
      <div className={styles.bottom_block}>

        <ul className={`${styles.section} m-3`} >
          {images?.map((img, i) =>
            (i < 4) &&
            <IngredientCard
              key={`${img}-${i}`}
              src={img}
              zIndex={Number(images.length) - i}
            />
          )}
          {(images.length > 4) &&
            <IngredientCard
              src="https://code.s3.yandex.net/react/code/cheese.png"
              zIndex={0}
              count={images.length - 4}
            />
          }
        </ul>
        <div className={`${styles.price} mr-4`}>
          <p className="text text_type_digits-default mr-3">
            {sumOrder}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  )
}