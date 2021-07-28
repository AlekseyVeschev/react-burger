import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { restorePasswordRequest } from '../services/actions/auth'
import { Loading } from '../components/loading/loading'
import styles from './login.module.css'


export const RestorePassword = () => {

  const dispatch = useDispatch()
  const { error, isResponsedEmail, isLoading } = useSelector(state => state.auth)

  const [email, setEmail] = useState('')

  const onChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    dispatch(restorePasswordRequest(email))
    setEmail('')
  }, [email, dispatch])

  if (isResponsedEmail) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    )
  }
  return (
    <div className={styles.root}>
      {isLoading && <Loading />}
      {error &&
        <p className={`${styles.error} text text_type_main-medium`} >
          {error}
        </p>
      }
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} pb-5  mb-5  mt-4`}
      >
        <p className={`${styles.title} text text_type_main-medium mb-5`}>
          Восстановление пароля
        </p>
        <div className={`${styles.field} mb-5 pt-1`} >
          <Input
            name={'email'}
            placeholder={'Укажите e-mail'}
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="pt-1 pb-5 mb-5">
          <Button
            type="primary"
            size="medium"
          >
            Восстановить
          </Button>
        </div>
      </form>
      <div className={styles.text}>
        <p className="text text_type_main-default mr-2">
          Вспомнили пароль?
        </p>
        <Link
          className={styles.link}
          to='/login'
        >
          Войти
        </Link>
      </div>
    </div>
  )
}