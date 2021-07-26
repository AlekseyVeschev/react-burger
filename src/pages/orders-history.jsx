import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './profile.module.css'


export const OrdersHistory = ({ setTitle }) => {
  const title = "В этом разделе вы можете просмотреть свою историю заказов"

  const { error } = useSelector(state => state.auth)


  useEffect(() => {
    setTitle(title)
  }, [setTitle])

  return (
    <div>
      {error &&
        <p className={`${styles.error} text text_type_main-medium`} >
          {error}
        </p>
      }
      OrdersHistory
    </div>
  )
}

OrdersHistory.propTypes = {
  setTitle: PropTypes.func
}