import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const cn = classNames.bind(styles);

function Header() {
   document.title = 'Trang chủ';

   const user = false;

   return (
      <header>
         <div className={cn('nav')}>
            <div className={cn('logo')}>phone</div>

            <div className={cn('search-box')}>
               <input />

               <div className={cn('search-btn')}>
                  <IconButton sx={{ padding: 1 }}>
                     <SearchOutlinedIcon sx={{ fontSize: 30 }} />
                  </IconButton>
               </div>
            </div>

            <div className={cn('right-features')}>
               {!user ? (
                  <div className={cn('actions')}>
                     <div className={cn('register-btn')}>
                        <Link to={'/register'}>
                           <Button variant="text" sx={{ fontSize: 20 }}>
                              Đăng ký
                           </Button>
                        </Link>
                     </div>

                     <div className={cn('register-btn')}>
                        <Link to={'/login'}>
                           <Button variant="text" sx={{ fontSize: 20 }}>
                              Đăng nhập
                           </Button>
                        </Link>
                     </div>
                  </div>
               ) : (
                  <div className={cn('account')}>
                     <div className={cn('cart-btn')}>
                        <Link to={'/cart'}>
                           <IconButton sx={{ padding: 1.2 }}>
                              <AddShoppingCartIcon sx={{ fontSize: 40 }} />
                           </IconButton>
                        </Link>
                     </div>

                     <div className={cn('user-name')}>
                        <h4>Nguyễn Minh Quân</h4>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
}

export default Header;
