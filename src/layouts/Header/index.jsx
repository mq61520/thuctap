import { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import CloseIcon from '@mui/icons-material/Close';
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
// import Box from '@mui/material/Box';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Popper from '../../components/Popper';
import SearchItem from '../../components/SearchItem';

const cn = classNames.bind(styles);

function Header() {
   document.title = 'Trang chủ';

   const [searchBox, setSearchBox] = useState(false);

   const user = true;

   return (
      <header>
         <div className={cn('nav')}>
            <Link to={'/'}>
               <div className={cn('logo')}>
                  <AutoStoriesOutlinedIcon sx={{ fontSize: 65 }} />
                  <span>book</span>
               </div>
            </Link>

            <Tippy
               visible={searchBox}
               interactive
               placement="bottom-end"
               render={(attrs) => (
                  <div className={cn('content')} tabIndex="-1" {...attrs}>
                     <Popper>
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />

                        {/* <div className={cn('search-history')}>
                           <div className={cn('history-item')}>
                              <span>BlueLock - Tập 7</span>
                              <CloseIcon sx={{ fontSize: 16 }}></CloseIcon>
                           </div>

                           <div className={cn('history-item')}>
                              <span>BlueLock - Tập 7</span>
                              <CloseIcon sx={{ fontSize: 16 }}></CloseIcon>
                           </div>
                           <div className={cn('history-item')}>
                              <span>BlueLock - Tập 7</span>
                              <CloseIcon sx={{ fontSize: 16 }}></CloseIcon>
                           </div>
                        </div> */}
                     </Popper>
                  </div>
               )}
            >
               <div className={cn('search-box')}>
                  <input
                     onFocus={(e) => {
                        setSearchBox(!searchBox);
                     }}
                     // onBlur={(e) => {
                     //    setSearchBox(false);
                     // }}
                  />

                  <div className={cn('search-btn')}>
                     <IconButton sx={{ padding: 1 }}>
                        <SearchOutlinedIcon sx={{ fontSize: 30 }} />
                     </IconButton>
                  </div>
               </div>
            </Tippy>

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

                     <Tippy
                        // visible={true}
                        interactive
                        // placement="bottom-end"
                        render={(attrs) => (
                           <div className={cn('content')} tabIndex="-1" {...attrs}>
                              <Popper>
                                 <div className={cn('account-function-btns')}>
                                    <div className={cn('order-btn')}>
                                       <Link to={'/login'}>
                                          <Button
                                             variant="text"
                                             sx={{ fontSize: 20, fontWeight: 400 }}
                                             startIcon={<GradingRoundedIcon />}
                                             style={{
                                                borderRadius: 50,
                                                backgroundColor: '#21b6ae',
                                                fontSize: '18px',
                                             }}
                                          >
                                             Đơn mua
                                          </Button>
                                       </Link>
                                    </div>

                                    <div className={cn('profile-btn')}>
                                       <Link to={'/login'}>
                                          <Button
                                             variant="text"
                                             sx={{ fontSize: 20, fontWeight: 400 }}
                                             startIcon={<PermIdentityOutlinedIcon />}
                                          >
                                             Trang cá nhân
                                          </Button>
                                       </Link>
                                    </div>

                                    <div className={cn('logout-btn')}>
                                       <Link to={'/login'}>
                                          <Button
                                             variant="text"
                                             sx={{ fontSize: 20, fontWeight: 400 }}
                                             startIcon={<LogoutRoundedIcon />}
                                          >
                                             Đăng xuất
                                          </Button>
                                       </Link>
                                    </div>
                                 </div>
                              </Popper>
                           </div>
                        )}
                     >
                        <div className={cn('user-name')}>
                           <h4>Nguyễn Minh Quân</h4>
                        </div>
                     </Tippy>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
}

export default Header;
