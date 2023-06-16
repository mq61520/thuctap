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
               <OrderItem checked />
               <OrderItem checked />
            </div>
         </div>
      </div>
   );
}

export default OrderManager;
