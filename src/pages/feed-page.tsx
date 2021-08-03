import { FC } from 'react'
import { useSelector } from '../utils/hooks'
import { useParams } from 'react-router-dom'
import { OrderPage } from '../components/order-page/order-page'
import { Loading } from '../components/loading/loading'

type TFeedPage = {
  title: string;
}

export const FeedPage: FC<TFeedPage> = ({ title }) => {

  const { id } = useParams<{ id: string }>()

  const { ingredients: ingredientsAll } = useSelector(state => state.ingredients)
  const { orders, isLoading } = useSelector(state => state.feed)

  return (
    <>
      {isLoading && <Loading />}
      <OrderPage
        id={id}
        title={title}
        ingredientsAll={ingredientsAll}
        orders={orders}
      />
    </>
  )
}