import { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from '../utils/hooks'
import { useHistory } from 'react-router-dom'
import { STATUS_TYPES } from '../utils/constants'
import { Loading } from '../components/loading/loading'
import { OrderCard } from '../components/order-card/order-card'
import { setCurrentNumber } from '../services/actions/feed'
import styles from './orders-feed.module.css'

export const OrdersFeed = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const { isLoading, totalToday, total, orders, error } = useSelector(state => state.feed)

  const readyOrders = useMemo(() =>
    orders?.filter(order => order.status === STATUS_TYPES.done)
    , [orders])

  const prepareOrders = useMemo(() =>
    orders?.filter(order => order.status !== STATUS_TYPES.done)
    , [orders])

  const handlelClick = useCallback((id, number) => {
    dispatch(setCurrentNumber(number))
    history.push(`/feed/${id}`)
  }, [history, dispatch])

  return (
    <div className={`${styles.root} pt-5`}>
      {isLoading && <Loading />}
      <p className="text text_type_main-large pl-1 pt-5">
        Лента заказов
      </p>
      <div className={styles.wrapper}>
        <ul className={`${styles.cards} p-1`}>
          {error && <p className={`${styles.error} text text_type_main-medium`} >
            {error.message}
          </p>}
          {orders?.map(order =>
            <OrderCard
              key={order._id}
              order={order}
              onClick={handlelClick}
            />
          )}
        </ul>
        <div className={styles.statistic}>
          <div className={styles.top_block}>
            <div className={styles.status}>
              <p className="text text_type_main-medium pb-2">
                Готовы:
              </p>
              <div className={styles.block_ready}>
                <ul className={styles.numbers_status}>
                  {readyOrders?.map((order, i) =>
                    (i < 10) && (
                      <li
                        key={`${order.number}-${i}`}
                        className={`${styles.number_ready} pt-1 pb-1`}
                      >
                        <p className="text text_type_digits-default ">
                          {order.number}
                        </p>
                      </li>
                    )
                  )}
                </ul>
                <ul className={styles.numbers_status}>
                  {readyOrders?.map((order, i) =>
                    (i >= 10 && i < 20) && (
                      <li
                        key={`${order.number}-${i}`}
                        className={`${styles.number_ready} pt-1 pb-1`}
                      >
                        <p className="text text_type_digits-default ">
                          {order.number}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className={styles.status}>
              <p className="text text_type_main-medium pb-2">
                В работе:
              </p>
              <div className={styles.block_ready}>
                <ul className={styles.numbers_status}>
                  {prepareOrders?.map((order, i) =>
                    (i < 10) && (
                      <li
                        key={`${order.number}-${i}`}
                        className={`${styles.number} pt-1 pb-1`}
                      >
                        <p className="text text_type_digits-default ">
                          {order.number}
                        </p>
                      </li>
                    )
                  )}
                </ul>
                <ul className={styles.numbers_status}>
                  {prepareOrders?.map((order, i) =>
                    (i >= 10 && i < 20) && (
                      <li
                        key={`${order.number}-${i}`}
                        className={`${styles.number} pt-1 pb-1`}
                      >
                        <p className="text text_type_digits-default ">
                          {order.number}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.all_statistic}>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">
              {total}
            </p>
          </div>
          <div className={styles.all_statistic}>
            <p className="text text_type_main-medium">
              Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large">
              {totalToday}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}