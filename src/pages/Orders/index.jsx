import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

//mui
import Button from '@mui/material/Button';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import styles from './Orders.module.scss';
import currencyFormater from '../../common/formatCurrency';

const cn = classNames.bind(styles);

function Orders() {
   const [orders, setOrders] = useState([]);

   const handleGetOrders = async () => {
      try {
         const get_order_list_res = await axios.post('http://localhost:4000/order/user', {
            user_id: localStorage.getItem('user_id'),
         });
         // console.log(get_order_list_res.data);

         var order_list = [];
         if (get_order_list_res.data.length > 0) {
            for (let i = 0; i < get_order_list_res.data.length; i++) {
               var detail_list = [];

               for (let k = 0; k < get_order_list_res.data[i].dh_slsp; k++) {
                  const product_res = await axios.get(
                     'http://localhost:4000/order/detail/' + get_order_list_res.data[i].dh_ma,
                  );

                  detail_list.push(product_res.data[k]);
               }
               order_list.push({ order_info: get_order_list_res.data[i], list_prod: detail_list });
            }
            setOrders(order_list.reverse());
         } else {
            console.log('K co don hang');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleCancelOrder = async (dh_id) => {
      try {
         const cancel_res = await axios.get('http://localhost:4000/order/cancel/' + dh_id);
         if (cancel_res.data === 'UpdateStatusSuccess') {
            toast.success('Hủy đơn hàng thành công.', { position: 'top-center' });
         } else {
            toast.error('Lỗi.', { position: 'top-center' });
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleGetOrders();
   }, []);

   console.log(orders);

   return (
      <div className={cn('orders-page')}>
         <div className={cn('orders-list')}>
            {orders.length > 0 ? (
               orders.map((order) => {
                  return (
                     <div className={cn('order')} key={order.order_info.dh_id}>
                        <div className={cn('order-header')}>
                           <h3 className={cn('order-code')}>
                              <i>Mã đơn hàng:</i> {order.order_info.dh_ma}
                           </h3>
                           <h3 className={cn('order-status')}>{order.order_info.dh_trangthai}</h3>
                        </div>

                        <div className={cn('products-list')}>
                           {order.list_prod.length > 0 ? (
                              order.list_prod.map((product) => {
                                 return (
                                    <div className={cn('product')} key={product.sp_ma}>
                                       <div className={cn('flex')}>
                                          <img src={'http://localhost:4000/' + product.sp_image} alt="Ảnh sản phẩm" />

                                          <div className={cn('flex-info')}>
                                             <h3 className={cn('product-name')}>{product.sp_ten}</h3>

                                             <h3 className={cn('product-amount')}>x{product.ctdh_sl}</h3>
                                          </div>
                                       </div>

                                       <div className={cn('price')}>
                                          {/* <h3 className={cn('old-price')}>{currencyFormater.format('99900000')}</h3> */}
                                          <h3 className={cn('current-price')}>
                                             {currencyFormater.format(product.ctdh_gia)}
                                          </h3>
                                       </div>
                                    </div>
                                 );
                              })
                           ) : (
                              <></>
                           )}
                        </div>

                        <h3 className={cn('order-total')}>
                           <i style={{ fontWeight: '400' }}>Thành tiền:</i>
                           {currencyFormater.format(order.order_info.dh_tongtien)}
                        </h3>

                        {order.order_info.dh_trangthai === 'Chờ lấy hàng' ? (
                           <div className={cn('order-actions')}>
                              <div className={cn('cancel-order-btn')}>
                                 <Button
                                    variant="outlined"
                                    onClick={() => {
                                       handleCancelOrder(order.order_info.dh_ma);
                                       handleGetOrders();
                                    }}
                                 >
                                    Hủy đơn
                                 </Button>
                              </div>
                           </div>
                        ) : (
                           <></>
                        )}

                        {order.order_info.dh_trangthai === 'Đã hủy' ? (
                           <div className={cn('cancel-flag')}>
                              <DoDisturbIcon sx={{ transform: 'scale(8)', color: 'red' }} />
                           </div>
                        ) : (
                           <></>
                        )}
                     </div>
                  );
               })
            ) : (
               <div className={cn('no-product')}>Bạn chưa có đơn nào!</div>
            )}
         </div>
      </div>
   );
}

export default Orders;
