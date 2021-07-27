import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { OrderPage } from '../components/order-page/order-page'

export const FeedPage = ({ title }) => {

  const { id } = useParams()

  const { ingredients: ingredientsAll } = useSelector(state => state.ingredients)
  const { orders } = useSelector(state => state.feed)

  return (
    <OrderPage
      id={id}
      title={title}
      ingredientsAll={ingredientsAll}
      orders={orders}
    />
  )
}
FeedPage.propTypes = {
  title: PropTypes.string
}