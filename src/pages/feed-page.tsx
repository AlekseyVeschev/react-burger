import { FC } from 'react'
import { useSelector } from '../utils/hooks'
import { useParams } from 'react-router-dom'
import { OrderPage } from '../components/order-page/order-page'

type TFeedPage = {
  title: string;
}

export const FeedPage: FC<TFeedPage> = ({ title }) => {

  const { id } = useParams<{ id: string }>()

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