import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CategoryItem.module.scss';

const cn = classNames.bind(styles);

function CategoryItem() {
   return (
      <div className={cn('category-item')}>
         <Link to={'/login'}>
            <div className={cn('category-img')}>
               <img
                  src="https://cdn0.fahasa.com/media/catalog/product/a/n/anime-comics-one-piece-stampede_bia_tap-2.jpg"
                  alt="Image"
               />
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
               <h4 className={cn('category-name')}>Kinh dị trinh thám</h4>
            </div>
         </Link>
      </div>
   );
}

export default CategoryItem;
