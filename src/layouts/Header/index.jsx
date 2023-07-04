import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
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
import { changeAmount } from '../../app/slices/cartSlice';
import { addList, setList } from '../../app/slices/productSlice';

const cn = classNames.bind(styles);

function Header() {
   document.title = 'Trang chủ';

   const [searchBox, setSearchBox] = useState(false);
   const current_user = localStorage.getItem('user_id');
   const buttonStyle = { fontSize: '18px', color: '#333' };

   const cart = useSelector((state) => state.cart);
   const product = useSelector((state) => state.product);
   const dispatch = useDispatch();

   const handleGetCartAmount = async () => {
      const uid = localStorage.getItem('user_id');
      if (localStorage.getItem('is_logged') == 1) {
         try {
            const amount_cart_response = await axios.get('http://localhost:4000/cart/amount/' + uid);

            //   console.log('amount:' + amount_cart_response.data);
            if (amount_cart_response.data == 'NoProduct') {
               const action = changeAmount(0);
               dispatch(action);
            } else {
               const action = changeAmount(amount_cart_response.data[0].amount);
               dispatch(action);
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   const [brands, setBrands] = useState([]);
   const handleGetBrand = async () => {
      try {
         const brand_list = await axios.get('http://localhost:4000/brands');

         if (brand_list.data.length > 0) {
            setBrands(brand_list.data);
            console.log(brand_list.data);
         } else {
            console.log('Lỗi');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleToAllProductOfBrand = async (brand) => {
      const setListEmpty = setList();
      dispatch(setListEmpty);

      try {
         const brand_list = await axios.get('http://localhost:4000/product/brand/' + brand);

         if (brand_list.data.length > 0) {
            console.log(brand_list.data);

            const setList_action = addList(brand_list.data);
            dispatch(setList_action);
         } else {
            console.log('Lỗi');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleGetCartAmount();
      handleGetBrand();
   }, []);

   return (
      <header>
         <div className={cn('nav')}>
            <Link to={'/'}>
               <div className={cn('logo')}>
                  <AutoStoriesOutlinedIcon sx={{ fontSize: 65 }} />
                  <span>book</span>
               </div>
            </Link>

            <div className={cn('nav-list')}>
               <Link to={'/'}>
                  <div className={cn('nav-item')}>Trang chủ</div>
               </Link>

               <Tippy
                  interactive
                  render={(attrs) => (
                     <div className={cn('content')} tabIndex="-1" {...attrs}>
                        <Popper>
                           <div className={cn('list-brand')}>
                              {brands.length > 0 ? (
                                 brands.map((brand) => {
                                    return (
                                       <Link to={'/products/brand/' + brand.dm_ten} key={brand.dm_id}>
                                          <Button
                                             variant="text"
                                             sx={{ fontSize: 20, fontWeight: 400 }}
                                             style={buttonStyle}
                                          >
                                             {brand.dm_ten}
                                          </Button>
                                       </Link>
                                    );
                                 })
                              ) : (
                                 <></>
                              )}
                           </div>
                        </Popper>
                     </div>
                  )}
               >
                  <Link to={'/products/brand/all'}>
                     <div className={cn('nav-item')}>Danh mục</div>
                  </Link>
               </Tippy>

               <Link to={'/products'}>
                  <div className={cn('nav-item')}>Sản phẩm</div>
               </Link>
            </div>

            {/* <Tippy
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
                        </div> 
                     </Popper>
                  </div>
               )}
            >
               <div className={cn('search-box')}>
                  <input
                     placeholder="Nhập tên sách, tên tác giả,..."
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
            </Tippy> */}

            <div className={cn('right-features')}>
               {current_user.length > 0 ? (
                  <div className={cn('account')}>
                     <div className={cn('cart-btn')}>
                        <Link to={'/cart'}>
                           <IconButton sx={{ padding: 1 }}>
                              <ShoppingBagOutlinedIcon sx={{ fontSize: 45, color: 'var(--mainColor4)' }} />
                           </IconButton>

                           <span>{cart.amount}</span>
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
                                       <Link to={'/orders'}>
                                          <Button
                                             variant="text"
                                             sx={{ fontSize: 20, fontWeight: 400 }}
                                             startIcon={<GradingRoundedIcon />}
                                             style={buttonStyle}
                                          >
                                             Đơn mua
                                          </Button>
                                       </Link>
                                    </div>

                                    {/* <div className={cn('profile-btn')}>
                                       <Link to={'/login'}>
                                          <Button
                                             variant="text"
                                             sx={{ fontSize: 20, fontWeight: 400 }}
                                             startIcon={<PermIdentityOutlinedIcon />}
                                             style={buttonStyle}
                                          >
                                             Trang cá nhân
                                          </Button>
                                       </Link>
                                    </div> */}

                                    <div className={cn('logout-btn')}>
                                       <Link to={'/login'}>
                                          <Button
                                             variant="text"
                                             sx={{ fontSize: 20, fontWeight: 400 }}
                                             startIcon={<LogoutRoundedIcon />}
                                             style={buttonStyle}
                                             onClick={() => {
                                                localStorage.setItem('user_name', '');
                                                localStorage.setItem('user_id', '');
                                                localStorage.setItem('is_logged', 0);
                                                window.open('http://127.0.0.1:5173', '_self');
                                             }}
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
                           <h4>{localStorage.getItem('user_name')}</h4>
                        </div>
                     </Tippy>
                  </div>
               ) : (
                  <div className={cn('actions')}>
                     <div className={cn('register-btn')}>
                        <Link to={'/register'}>
                           <Button variant="text" sx={{ fontSize: 18, fontWeight: '400', color: 'var(--mainColor4)' }}>
                              Đăng ký
                           </Button>
                        </Link>
                     </div>

                     <div className={cn('register-btn')}>
                        <Link to={'/login'}>
                           <Button variant="text" sx={{ fontSize: 18, fontWeight: '400', color: 'var(--mainColor4)' }}>
                              Đăng nhập
                           </Button>
                        </Link>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
}

export default Header;
