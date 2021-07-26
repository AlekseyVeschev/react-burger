import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-card.module.css'

export const OrderCard = ({ onClick }) => {

  const handlelClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <li
      className={`${styles.card} p-3 mb-2`}
      onClick={handlelClick}
    >
      <div className={`${styles.info} m-3`}>
        <p className="text text_type_digits-default">#034533</p>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </p>
      </div>
      <p className="text text_type_main-medium p-3">
        Death Star Starship Main бургер
      </p>
      <div className={`${styles.bottom_block} m-3`} >
        <img
          className={styles.image}
          src="https://code.s3.yandex.net/react/code/sauce-02-mobile.png"
          alt="img"
        />
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-3">
            370
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  )
}
OrderCard.propTypes = {
  handlelClick: PropTypes.func
}