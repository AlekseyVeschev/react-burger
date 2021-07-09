import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { loginRequest } from '../services/actions/auth'
import styles from './login.module.css'


export const Login = () => {

  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)

  const [form, setForm] = useState({ email: '', password: '' })

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    dispatch(loginRequest(form))
    setForm({ email: '', password: '' })
  }, [form, dispatch])

  return (
    <div className={styles.root}>
      {error &&
        <p className={`${styles.error} text text_type_main-medium`} >
          {error}
        </p>
      }
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} pb-5  mb-5`}
      >
        <p className="text text_type_main-medium mb-5">
          Вход
        </p>
        <div className={`${styles.field} mb-5 pt-1`} >
          <EmailInput
            name={'email'}
            onChange={onChange}
            value={form.email}
          />
        </div>
        <div className={`${styles.field} mb-5 pt-1`} >
          <PasswordInput
            name={'password'}
            onChange={onChange}
            value={form.password}
          />
        </div>
        <div className="pt-1 pb-5 mb-5">
          <Button
            type={"submit" && "primary"}
            size="medium"
          >
            Войти
          </Button>
        </div>
      </form>
      <div className={styles.text}>
        <p className="text text_type_main-default mr-2">
          Вы - новый пользователь?
        </p>
        <Link
          className={styles.link}
          to='/register'
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.text}>
        <p className="text text_type_main-default mr-2">
          Забыли пароль?
        </p>
        <Link
          className={styles.link}
          to='/forgot-password'
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  )
}