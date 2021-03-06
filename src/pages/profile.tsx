import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from '../utils/hooks'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { updateUserRequest } from '../services/actions/auth'
import { Loading } from '../components/loading/loading'
import styles from './profile.module.css'


export const Profile = () => {
  const dispatch = useDispatch()
  const { email, name, error, isLoading } = useSelector(state => state.auth)

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  })

  useEffect(() => {
    setForm(state => ({
      ...state,
      email,
      name,
    }))
  }, [email, name])

  const isVisibleButtons = useMemo(() =>
    form.name !== name ||
    form.email !== email ||
    form.password !== ''
    , [form, name, email])

  const onChange = useCallback(e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }, [form])

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    dispatch(updateUserRequest(form))
  }, [dispatch, form])

  const buttonUndo = useCallback(() => {
    setForm({
      email: email || '',
      password: '',
      name: name || '',
    })
  }, [setForm, email, name])

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ml-5`}
    >
      {error &&
        <p className={`${styles.error} text text_type_main-medium`} >
          {error.message}
        </p>
      }
      {isLoading && <Loading />}
      <div className={`${styles.field} mb-5 pt-1`} >
        <Input
          name={'name'}
          icon={"EditIcon"}
          placeholder={'Имя'}
          onChange={onChange}
          value={form.name}
        />
      </div>
      <div className={`${styles.field} mb-5 pt-1`} >
        <Input
          name={'email'}
          icon={"EditIcon"}
          placeholder={'Логин'}
          onChange={onChange}
          value={form.email}
        />
      </div>
      <div className={`${styles.field} mb-5 pt-1`} >
        <Input
          name={'password'}
          icon={"EditIcon"}
          placeholder={'Пароль'}
          onChange={onChange}
          value={form.password}
        />
      </div>
      {isVisibleButtons && (
        <div className={`${styles.buttonBlock} mb-5 pt-1`}>
          <Button
            type="secondary"
            size="medium"
            onClick={buttonUndo}
          >
            Отмена
          </Button>
          <Button
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}