import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

export const Ingredient = ({ price, name, img, count }: any) => {
   return (
      <section className={`${styles.root}`}>
         <img src={img} alt="" className={styles.image} />
         <div className={`${styles.currency} p-2`}>
            <div className='pr-2' >
               {price}
            </div>
            <CurrencyIcon type="primary" />
         </div>
         <div className='name p-5 pt-1'>
            {name}
         </div>
         {count !== 0 && <Counter count={count} size="default" />}
      </section>
   )
}