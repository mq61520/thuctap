import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import styles from './OrderManager.module.scss';
import OrderItem from '../../components/OrderItem';

const cn = classNames.bind(styles);

function OrderManager() {
   const auth = useSelector((state) => state.auth);
   console.log(auth);

   const [orders, setOrders] = useState([]);
   const handleGetOrders = async () => {
      try {
         const get_order_list_res = await axios.get('http://localhost:4000/order/all');
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
            setOrders(order_list);
         } else {
            console.log('K co don hang');
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
      <div className={cn('body')}>
         <h4 className={cn('content-title')}>Quản lý đơn hàng</h4>

         <div className={cn('order-list')}>
            <div className={cn('order-list-header')}>
               <h4 className={cn('order-time')}>Ngày đặt</h4>

               <h4 className={cn('order-code')}>Mã đơn hàng</h4>

               <h4 className={cn('customer-name')}>Tên khách hàng</h4>

               <h4 className={cn('amount')}>Số sản phẩm</h4>

               <h4 className={cn('price')}>Tổng tiền</h4>

               <h4 className={cn('check')}>Thao tác</h4>
            </div>

            <div className={cn('list')}>
               {orders.length > 0 ? (
                  orders.map((order) => {
                     console.log(order.order_info.dh_trangthai);
                     return (
                        <OrderItem
                           key={order.order_info.dh_ma}
                           order_info={order.order_info}
                           product_list={order.list_prod}
                           isConfirm={(status) => {
                              if (status === 'ConfirmSuccess') {
                                 toast.success('Đã duyệt đơn hàng.', { position: 'top-center' });
                                 handleGetOrders();
                              }
                           }}
                           isUpdateStatus={(status) => {
                              if (status === 'UpdateStatusSuccess') {
                                 toast.success('Cập nhật trạng thái thành công..', { position: 'top-center' });
                                 handleGetOrders();
                              }
                           }}
                        />
                     );
                  })
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   );
}

export default OrderManager;
