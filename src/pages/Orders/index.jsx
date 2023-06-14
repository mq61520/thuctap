import { useState } from 'react';
import classNames from 'classnames/bind';

//mui
import Button from '@mui/material/Button';

import styles from './Orders.module.scss';
import currencyFormater from '../../common/formatCurrency';

const cn = classNames.bind(styles);

function Orders() {
   const [orders, setOrders] = useState([]);

   return (
      <div className={cn('orders-page')}>
         <div className={cn('orders-list')}>
            {orders.length > 0 ? (
               <div className={cn('order')}>
                  <div className={cn('order-header')}>
                     <h3 className={cn('order-code')}>
                        <i>Mã đơn hàng:</i> sijhbdvibsdh
                     </h3>
                     <h3 className={cn('order-status')}>usdhvcjsdjvg</h3>
                  </div>

                  <div className={cn('products-list')}>
                     {orders ? (
                        <>
                           <div className={cn('product')}>
                              <div className={cn('flex')}>
                                 <img
                                    src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                                    alt="Ảnh sản phẩm"
                                 />

                                 <div className={cn('flex-info')}>
                                    <h3 className={cn('product-name')}>absvcuh auscyvaus auvcuhas vc auysvgcu</h3>

                                    <h3 className={cn('product-amount')}>x999</h3>
                                 </div>
                              </div>

                              <div className={cn('price')}>
                                 {/* <h3 className={cn('old-price')}>{currencyFormater.format('99900000')}</h3> */}
                                 <h3 className={cn('current-price')}>{currencyFormater.format(163214545)}</h3>
                              </div>
                           </div>
                        </>
                     ) : (
                        <></>
                     )}
                  </div>

                  <h3 className={cn('order-total')}>
                     <i style={{ fontWeight: '400' }}>Thành tiền:</i>
                     {currencyFormater.format(21515215)}
                  </h3>

                  <div className={cn('order-actions')}>
                     <div className={cn('cancel-order-btn')}>
                        <Button variant="outlined">Hủy đơn</Button>
                     </div>
                  </div>
               </div>
            ) : (
               <div className={cn('no-product')}>Bạn chưa có đơn nào!</div>
            )}
         </div>
      </div>
   );
}

export default Orders;
