import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import styles from './OrderItem.module.scss';
import currencyFormater from '../../common/formatCurrency';

const cn = classNames.bind(styles);

function OrderItem({ order_info, product_list, isConfirm, isUpdateStatus }) {
   const [showDetail, setShowDetail] = useState(false);

   //change status

   const [status, setStatus] = useState('');
   // const handleChangeStatus = (event) => {
   //    setStatus(event.target.value);
   // };

   const [userInfo, setUserInfo] = useState('');
   const handleGetUserInfo = async (nd_id) => {
      try {
         const user_info_response = await axios.get('http://localhost:4000/account/get/' + nd_id);

         if (user_info_response.data) {
            setUserInfo(user_info_response.data[0]);
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleConfirmOrder = async (dh_id) => {
      try {
         const user_info_response = await axios.get('http://localhost:4000/order/confirm/' + dh_id);

         if (user_info_response.data === 'ConfirmSuccess') {
            isConfirm('ConfirmSuccess');
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleUpdateStatusOrder = async (dh_id, status) => {
      try {
         if (status === order_info.dh_trangthai) {
            return;
         } else if (status === '') {
            console.log('Lỗi.');
            return;
         } else {
            const update_res = await axios.post('http://localhost:4000/order/update/status', {
               ma_dh: dh_id,
               status: status,
            });

            if (update_res.data === 'UpdateStatusSuccess') {
               isUpdateStatus('UpdateStatusSuccess');
            }
         }
      } catch (error) {
         console.log('Try catch: ' + error);
      }
   };

   useEffect(() => {
      setStatus(order_info.dh_trangthai);
      handleGetUserInfo(order_info.nd_id);
   });

   var stt = 0;

   return (
      <div className={cn('wrapper')} id="wrapper">
         <div className={cn('order')}>
            <h4 className={cn('time-order')}>{order_info.dh_ngaylap.slice(0, 10)}</h4>

            <h4 className={cn('order-code')}>{order_info.dh_ma}</h4>

            <h4 className={cn('customer-name')}>{userInfo.nd_hoten}</h4>

            <h4 className={cn('amount')}>{order_info.dh_slsp}</h4>

            <h4 className={cn('price')}>{currencyFormater.format(order_info.dh_tongtien)}</h4>

            {order_info.dh_trangthai === 'Chờ xác nhận' ? (
               <div className={cn('check')}>
                  <Button
                     variant="outlined"
                     onClick={() => {
                        handleConfirmOrder(order_info.dh_ma);
                     }}
                  >
                     Duyệt
                  </Button>
               </div>
            ) : (
               <div className={cn('change-order-status')}>
                  {order_info.dh_trangthai !== 'Đã hủy' ? (
                     <Select
                        sx={{ width: 'fit-content', height: 42, fontSize: 19 }}
                        value={status}
                        onChange={(e) => handleUpdateStatusOrder(order_info.dh_ma, e.target.value)}
                     >
                        <MenuItem value="Chờ lấy hàng" sx={{ fontSize: 19 }}>
                           Chờ lấy hàng
                        </MenuItem>
                        <MenuItem value="Đang giao" sx={{ fontSize: 19 }}>
                           Đang giao
                        </MenuItem>
                        <MenuItem value="Đã giao" sx={{ fontSize: 19 }}>
                           Đã giao
                        </MenuItem>
                     </Select>
                  ) : (
                     <h4>Đã hủy đơn</h4>
                  )}
               </div>
            )}
         </div>

         {showDetail ? (
            <div className={cn('products-list')}>
               <div className={cn('products-list-header')}>
                  <h4 className={cn('product-number')}>Stt</h4>

                  <h4 className={cn('product-name')}>Sản phẩm</h4>

                  <h4 className={cn('product-amount')}>Số lượng</h4>

                  <h4 className={cn('product-price')}>Đơn giá</h4>

                  <h4 className={cn('product-price')}>Thành tiền</h4>
               </div>

               {product_list.length > 0 ? (
                  product_list.map((product) => {
                     stt++;
                     return (
                        <div className={cn('product')} key={product.sp_ma}>
                           <h4 className={cn('product-number')}>{stt}</h4>

                           <div className={cn('product-img')}>
                              <img src={'http://localhost:4000/' + product.sp_image} alt="Ảnh sản phẩm" />

                              <h4 className={cn('product-name')}>{product.sp_ten}</h4>
                           </div>

                           <h4 className={cn('product-amount')}>{product.ctdh_sl}</h4>

                           <h4 className={cn('product-price')}>{currencyFormater.format(product.ctdh_gia)}</h4>

                           <h4 className={cn('product-price')}>
                              {currencyFormater.format(product.ctdh_sl * product.ctdh_gia)}
                           </h4>
                        </div>
                     );
                  })
               ) : (
                  <></>
               )}
            </div>
         ) : (
            <></>
         )}
         <div className={cn('order-actions')}>
            <div className={cn('detail-btn')}>
               {!showDetail ? (
                  <Button variant="text" onClick={() => setShowDetail(!showDetail)}>
                     Chi tiết
                  </Button>
               ) : (
                  <Button variant="text" onClick={() => setShowDetail(!showDetail)}>
                     Thu gọn
                  </Button>
               )}
            </div>
         </div>
      </div>
   );
}

export default OrderItem;
