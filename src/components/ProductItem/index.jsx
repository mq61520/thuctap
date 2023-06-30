import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

import styles from './ProductItem.module.scss';
import currencyFormater from '../../common/formatCurrency';

const cn = classNames.bind(styles);

function ProductItem({ ma_sp, img, ten, gia, km, ep }) {
   return (
      <div className={cn('product-item')}>
         <Link to={'/product-detail/' + ma_sp}>
            <div className={cn('box')}>
               <div className={cn('product-img')}>
                  <img className={cn('image')} src={'http://localhost:4000/' + img} alt="Image" />
               </div>

               <h4 className={cn('product-name')}>{ten}</h4>

               <div className={cn('product-price')}>
                  <h4 className={cn('current-price')}>{currencyFormater.format(gia - (gia * km) / 100)}</h4>
                  {km > 0 ? <h4 className={cn('old-price')}>{currencyFormater.format(gia)}</h4> : <></>}
               </div>

               {/* <div className={cn('product-rating')}>
                  <Rating name="read-only" sx={{ fontSize: 20 }} value={3} readOnly />

                  <span>(100)</span>
               </div> */}

               {/* <span className={cn('product-episode')}>Tập 100</span> */}

               {km > 0 ? (
                  <h4 className={cn('sale-flag')}>
                     <span>{km}%</span>
                     <span>giảm</span>
                  </h4>
               ) : (
                  <></>
               )}
            </div>
         </Link>
      </div>
   );
}

export default ProductItem;
