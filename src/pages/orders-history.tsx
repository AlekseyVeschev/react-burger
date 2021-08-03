import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from '../utils/hooks'
import { OrderCard } from '../components/order-card/order-card'
import { setCurrentNumber } from '../services/actions/feed'
import styles from './orders-history.module.css'


export const OrdersHistory = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { error } = useSelector(state => state.auth)
  const { orders } = useSelector(state => state.history)

  const handlelClick = useCallback((id, number) => {
    dispatch(setCurrentNumber(number))
    history.push(`/profile/orders/${id}`)
  }, [history, dispatch])

  return (
    <div className={`${styles.wrapper} mt-5 ml-5`}>
      {!!error &&
        <p className="text text_type_main-medium">
          {error.message}
        </p>
      }
      <ul className={`${styles.cards} p-1`}>
        {orders?.map(order =>
          <OrderCard
            key={order._id}
            order={order}
            onClick={handlelClick}
            status={order.status}
          />
        )}
      </ul>
    </div>
  )
}