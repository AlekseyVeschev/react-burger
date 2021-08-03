import { FC } from 'react'
import styles from './ingredient-card.module.css'

type TIngredientCard = {
  src: string,
  zIndex?: number,
  count?: number
}

export const IngredientCard: FC<TIngredientCard> = ({ src, zIndex, count }) => {
  return (
    <li
      className={styles.card_wrapper}
      style={{ zIndex: zIndex }}
    >
      {count &&
        <div
          className={styles.count}
          style={{ zIndex: Number(zIndex) + 1 }}
        >
          <p className="text text_type_digits-default">
            {Number(`${count}`)}
          </p>
        </div>}
      <img
        className={styles.image}
        src={src}
        alt="img"
      />
    </li>
  )
}