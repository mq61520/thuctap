import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import ProductItem from '../../components/ProductItem';

const cn = classNames.bind(styles);

function Home() {
   return (
      <div className={cn('home-')}>
         <div className={cn('home')}>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
         </div>
      </div>
   );
}

export default Home;
