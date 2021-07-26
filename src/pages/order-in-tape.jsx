import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-in-tape.module.css'

export const OrderInTape = () => {

  const items = [1, 1, 1, 1, 1, 1]

  return (
    <li className={styles.root}>
      <div className={styles.number}>
        <p className="text text_type_digits-default pb-5">#034533</p>
      </div >
      <p className="text text_type_main-medium mt-5">
        Death Star Starship Main бургер
      </p>
      <div className={styles.status}>
        <p className="text text_type_main-default mt-3">
          Выполнен
        </p>
      </div>
      <p className={`${styles.title} 
      text text_type_main-medium mb-5 pb-1 `}>
        Состав:
      </p>
      <ul className={styles.list_items}>
        {items.map((item, i) =>
          <li className={`${styles.item} pb-4 pr-5`} key={i}>
            <div>
              <img src="https://code.s3.yandex.net/react/code/sauce-01.png" alt="img" className={styles.image} />
            </div>
            <p className="text text_type_main-default">
              Филе Люминесцентного тетраодонтимформа
            </p>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">
                2 x 20
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        )}

      </ul>
      <div className={`${styles.bottom_block} pt-5 mt-5`} >
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">
            510
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  )
}