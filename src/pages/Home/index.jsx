import classNames from 'classnames/bind';

import styles from './Home.module.scss';

const cn = classNames.bind(styles);

function Home() {
   return (
      <div className={cn('home')}>
         <div className={cn('home')}>home</div>
      </div>
   );
}

export default Home;
