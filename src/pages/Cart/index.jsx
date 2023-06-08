import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

//mui
import Button from '@mui/material/Button';

import styles from './Cart.module.scss';
import CartItem from '../../components/CartItem';
import currencyFormater from '../../common/formatCurrency';

const cn = classNames.bind(styles);

function Cart() {
   const [listProduct, setListProduct] = useState(true);

   return (
      <div className={cn('cart-page')}>
         <div className={cn('inner')}>
            <h3>Giỏi hàng</h3>

            {!listProduct ? (
               <>
                  <div className={cn('header-list')}>
                     <h4 className={cn('product-info')}>Sản phẩm</h4>
                     <h4 className={cn('product-price')}>Đơn giá</h4>
                     <h4 className={cn('product-amount')}>Số lượng</h4>
                     <h4 className={cn('product-total-price')}>Thành tiền</h4>
                     <h4 className={cn('action')}>Thao tác</h4>
                  </div>
                  <div className={cn('product-list')}>
                     <CartItem />
                     <CartItem />
                     <CartItem />
                  </div>

                  <div className={cn('actions')}>
                     <div className={cn('total')}>
                        <h4 className={cn('amount')}>
                           <b>99</b> sản phẩm
                        </h4>

                        <div className={cn('total-price')}>
                           <h4 style={{ color: '#333', fontSize: '24px' }}>Tổng thanh toán:</h4>
                           <h4>{currencyFormater.format(2548421)}</h4>
                        </div>
                     </div>
                  </div>

                  <div className={cn('btn-flex')}>
                     <div className={cn('pay-btn')}>
                        <Button variant="contained">Tiến hành thanh toán</Button>
                     </div>
                  </div>
               </>
            ) : (
               <>
                  <div className={cn('no-product')}>
                     <h3 className={cn('message')}>Bạn chưa có sản phẩm nào trong giỏ hàng!</h3>

                     <div className={cn('go-shop')}>
                        <Button variant="text" sx={{ fontSize: 20 }}>
                           Tiến hành mua hàng
                        </Button>
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default Cart;
