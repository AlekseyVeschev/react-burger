import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { responcedEmail, setNewPassword } from '../services/actions/auth'
import { Loading } from '../components/loading/loading'
import styles from './login.module.css'

export const SaveNewPassword = () => {

  const dispatch = useDispatch()
  const { error, isResponcedEmail, isLoading } = useSelector(state => state.auth)

  const [form, setForm] = useState({ password: '', token: '' })

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    return () => {
      dispatch(responcedEmail(false))
    }
  }, [dispatch])

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    dispatch(setNewPassword(form))
    setForm({ password: '', token: '' })
  }, [form, dispatch])

  if (!isResponcedEmail) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password'
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
        className={`${styles.form} pb-5  mb-5 mt-4`}
      >
        <p className={`${styles.title} text text_type_main-medium mb-5`}>
          Восстановление пароля
        </p>
        <div className={`${styles.field} mb-5 pt-1`} >
          <Input
            name={'password'}
            type={'password'}
            placeholder={'Введите новый пароль'}
            icon={"ShowIcon"}
            onChange={onChange}
            value={form.password}
          />
        </div>
        <div className={`${styles.field} mb-5 pt-1`} >
          <Input
            name={'token'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            value={form.token}
          />
        </div>
        <div className="pt-1 pb-5 mb-5">
          <Button
            type="primary"
            size="medium"
          >
            Сохранить
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
