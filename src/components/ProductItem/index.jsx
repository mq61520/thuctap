import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

import styles from './ProductItem.module.scss';
import currencyFormater from '../../common/formatCurrency';

const cn = classNames.bind(styles);

function ProductItem() {
   return (
      <div className={cn('product-item')}>
         <Link to={'/login'}>
            <div className={cn('box')}>
               <div className={cn('product-img')}>
                  <img
                     src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                     alt="Image"
                  />
               </div>

               <h4 className={cn('product-name')}>BlueLock - Tập 7 - Tặng kèm PVC Card</h4>

               <div className={cn('product-price')}>
                  <h4 className={cn('current-price')}>{currencyFormater.format(6500000)}</h4>
                  <h4 className={cn('old-price')}>{currencyFormater.format(6500000)}</h4>
               </div>

               <div className={cn('product-rating')}>
                  <Rating name="read-only" sx={{ fontSize: 20 }} value={3} readOnly />

                  <span>(100)</span>
               </div>

               <span className={cn('product-episode')}>Tập 100</span>

               <h4 className={cn('sale-flag')}>
                  <span>100%</span>
                  <span>giảm</span>
               </h4>
            </div>
         </Link>
      </div>
   );
}

export default ProductItem;
