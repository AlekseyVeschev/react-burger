import PropTypes from 'prop-types'
import styles from './ingredient-card.module.css'

export const IngredientCard = ({ src, zIndex, count }) => {

  return (
    <li
      className={styles.card_wrapper}
      style={{ zIndex: zIndex }}
    >
      {count &&
        <div
          className={styles.count}
          style={{ zIndex: zIndex + 1 }}
        >
          <p className="text text_type_digits-default">
            {`+${count}`}
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
IngredientCard.propTypes = {
  src: PropTypes.string,
  zIndex: PropTypes.number,
  length: PropTypes.number
}