import { useCallback } from 'react'
import { useSelector } from '../utils/hooks'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { OrdersFeed } from '../pages/orders-feed'
import { Modal } from '../components/modal/modal'
import { FeedPage } from '../pages/feed-page'


export const FeedLayout = () => {

  const { currentNumber } = useSelector(state => state.feed)
  const location = useLocation()
  const history = useHistory()
  const isShowModal = history.action === 'PUSH'

  const onClickCloseButton = useCallback(() => {
    history.go(-1)
  }, [history])

  return (
    <Switch location={location}>
      <Route path="/feed" exact={true}>
        <OrdersFeed />
      </Route>

      <Route path="/feed/:id" exact={true}>
        {isShowModal ?
          (
            <>
              <OrdersFeed />
              <Modal
                title={currentNumber}
                onClose={onClickCloseButton}
              >
                <FeedPage title={currentNumber} />
              </Modal>
            </>
          ) : (
            <FeedPage />
          )
        }

      </Route>
    </Switch>
  )
}