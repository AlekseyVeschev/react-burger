import { FC } from 'react'
import { useSelector } from '../utils/hooks'
import { useParams } from 'react-router-dom'
import { OrderPage } from '../components/order-page/order-page'

type THistoryPage = {
  title: string
}

export const HistoryPage: FC<THistoryPage> = ({ title }) => {

  const { id } = useParams<{ id: string }>()

  const { ingredients: ingredientsAll } = useSelector(state => state.ingredients)
  const { orders } = useSelector(state => state.history)
  console.log('HistoryPage')

  return (
    <OrderPage
      id={id}
      title={title}
      ingredientsAll={ingredientsAll}
      orders={orders}
    />
  )
}