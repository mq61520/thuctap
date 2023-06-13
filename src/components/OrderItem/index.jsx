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

function OrderItem({ checked, order_list, product_list, confirmed, handle_get_order_list, update_status }) {
   const [showDetail, setShowDetail] = useState(false);

   //change status
   const [status, setStatus] = useState(0);
   const handleChangeStatus = (event) => {
      setStatus(event.target.value);
   };

   return (
      <div className={cn('wrapper')} id="wrapper">
         <div className={cn('order')}>
            <h4 className={cn('time-order')}>12165485</h4>

            <h4 className={cn('order-code')}>iakbckjh</h4>

            <h4 className={cn('customer-name')}>nguyen va abc</h4>

            <h4 className={cn('amount')}>99</h4>

            <h4 className={cn('price')}>{currencyFormater.format(16542154)}</h4>

            {!checked ? (
               <div className={cn('check')}>
                  <Button>Duyệt</Button>
               </div>
            ) : (
               <div className={cn('change-order-status')}>
                  <Select
                     value={status}
                     onChange={handleChangeStatus}
                     sx={{ width: 'fit-content', height: 42, fontSize: 19 }}
                  >
                     <MenuItem value={0} sx={{ fontSize: 19 }}>
                        Đã duyệt
                     </MenuItem>
                     <MenuItem value={1} sx={{ fontSize: 19 }}>
                        Chờ lấy hàng
                     </MenuItem>
                     <MenuItem value={2} sx={{ fontSize: 19 }}>
                        Đang giao
                     </MenuItem>
                     <MenuItem value={3} sx={{ fontSize: 19 }}>
                        Đã giao
                     </MenuItem>
                  </Select>
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

               <div className={cn('product')}>
                  <h4 className={cn('product-number')}>1215</h4>

                  <div className={cn('product-img')}>
                     <img
                        src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                        alt="Ảnh sản phẩm"
                     />

                     <h4 className={cn('product-name')}>ghjiagsfjhcda aibvgckjhsad djuvbc</h4>
                  </div>

                  <h4 className={cn('product-amount')}>999</h4>

                  <h4 className={cn('product-price')}>{currencyFormater.format(21564432)}</h4>

                  <h4 className={cn('product-price')}>{currencyFormater.format(35165432)}</h4>
               </div>
               <div className={cn('product')}>
                  <h4 className={cn('product-number')}>1215</h4>

                  <div className={cn('product-img')}>
                     <img
                        src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                        alt="Ảnh sản phẩm"
                     />

                     <h4 className={cn('product-name')}>ghjiagsfjhcda aibvgckjhsad djuvbc</h4>
                  </div>

                  <h4 className={cn('product-amount')}>999</h4>

                  <h4 className={cn('product-price')}>{currencyFormater.format(21564432)}</h4>

                  <h4 className={cn('product-price')}>{currencyFormater.format(35165432)}</h4>
               </div>
               <div className={cn('product')}>
                  <h4 className={cn('product-number')}>1215</h4>

                  <div className={cn('product-img')}>
                     <img
                        src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                        alt="Ảnh sản phẩm"
                     />

                     <h4 className={cn('product-name')}>ghjiagsfjhcda aibvgckjhsad djuvbc</h4>
                  </div>

                  <h4 className={cn('product-amount')}>999</h4>

                  <h4 className={cn('product-price')}>{currencyFormater.format(21564432)}</h4>

                  <h4 className={cn('product-price')}>{currencyFormater.format(35165432)}</h4>
               </div>
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
