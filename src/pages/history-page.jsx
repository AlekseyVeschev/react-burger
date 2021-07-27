import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { OrderPage } from '../components/order-page/order-page'

export const HistoryPage = ({ title }) => {

  const { id } = useParams()

  const { ingredients: ingredientsAll } = useSelector(state => state.ingredients)
  const { orders } = useSelector(state => state.history)

  return (
    <OrderPage
      id={id}
      title={title}
      ingredientsAll={ingredientsAll}
      orders={orders}
    />
  )
}
HistoryPage.propTypes = {
  title: PropTypes.string
}