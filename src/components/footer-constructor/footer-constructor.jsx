import PropTypes from 'prop-types'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './footer-constructor.module.css'


export const FooterConstructor = ({ sum, handleClick, title }) => {

   return (
      <section className={`${styles.section} pr-1`}>
         <p className="text text_type_digits-medium">
            {sum}
         </p>
         <div className="m-5">
            <CurrencyIcon type="primary" />
         </div>
         <div className="m-5 mr-1">
            <Button
               type="primary"
               onClick={handleClick}
            >
               {title}
            </Button>
         </div>
      </section>
   )
}
FooterConstructor.propTypes = {
   sum: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   handleClick: PropTypes.func
}