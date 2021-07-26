import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { OrderCard } from '../components/order-card/order-card'
import styles from './orders-tape.module.css'

export const OrdersTape = () => {

  const { ingredients } = useSelector(state => state.ingredients)

  const history = useHistory()

  const handlelClick = useCallback((id = "1") => {
    history.push(`/feed/${id}`)
  }, [history])

  return (
    <div className={`${styles.root} pt-5`}>
      <p className="text text_type_main-large pl-1 pt-5">
        Лента заказов
      </p>
      <div className={styles.wrapper}>
        <ul className={`${styles.cards} p-1`}>
          {ingredients?.map((ing, i) =>
            <OrderCard
              key={i}
              image={ing.image}
              onClick={handlelClick}
            />
          )}
        </ul>
        <div className={styles.statistic}>
          <div className={styles.block_status}>
            <ul className={styles.numbers_status}>
              <p className="text text_type_main-medium pb-5">
                Готовы:
              </p>
              <li className={`${styles.number_ready} pt-1 pb-1`}>
                <p className="text text_type_digits-default ">034533</p>
              </li>
              <li className={styles.number_ready}>
                <p className="text text_type_digits-default">034533</p>
              </li>
            </ul>
            <ul className={styles.numbers_status}>
              <p className="text text_type_main-medium pb-5">
                В работе:
              </p>
              <li className={`${styles.number} pt-1 pb-1`}>
                <p className="text text_type_digits-default">034533</p>
              </li>
              <li className={`${styles.number} pt-1 pb-1`}>
                <p className="text text_type_digits-default">034533</p>
              </li>
            </ul>
          </div>
          <div className={styles.all_statistic}>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">28 752</p>
          </div>
          <div className={styles.all_statistic}>
            <p className="text text_type_main-medium">
              Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large">138</p>
          </div>
        </div>
      </div>
    </div>
  )
}