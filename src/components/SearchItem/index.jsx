import classNames from 'classnames/bind';

import styles from './SearchItem.module.scss';
import { Link } from 'react-router-dom';

const cn = classNames.bind(styles);

function SearchItem() {
   return (
      <div className={cn('item-search')}>
         <Link to={'/login'}>
            <div className={cn('item-box')}>
               <img
                  src="https://cdn0.fahasa.com/media/catalog/product/b/l/blue_block_bia_postcard_tap_7.jpg"
                  alt="item-img"
               />

               <h4>BlueLock - Tập 7 - Tặng Kèm Card PVC</h4>
            </div>
         </Link>
      </div>
   );
}

export default SearchItem;
