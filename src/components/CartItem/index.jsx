import { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

//mui
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

import { toast } from 'react-toastify';

import styles from './CartItem.module.scss';
import currencyFormater from '../../common/formatCurrency';

const cn = classNames.bind(styles);

function CartItem({ gh_id, ma_sp, image, ten_sp, sl_sp, gia_sp, km, isRemoved, isChecked, isUpdated }) {
   const [checked, setChecked] = useState(false);
   const [amount, setAmount] = useState(sl_sp);

   const handleCheck = (event) => {
      setChecked(event.target.checked);
      isChecked(!checked);
   };

   const handleUpdateAmount = async (type) => {
      try {
         const update_response = await axios.post('http://localhost:4000/cart/update_amount', {
            gh_id: gh_id,
            type: type,
         });

         if (update_response.data === 'UpdateAmountSuccess') {
            isUpdated('Updated');
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleRemove = async () => {
      try {
         const delete_response = await axios.get('http://localhost:4000/cart/delete/' + gh_id);
         if (delete_response.data === 'DeleteSuccess') {
            isRemoved('Removed');
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className={cn('product')}>
         <div className={cn('flex-info')}>
            <Checkbox sx={{ fontSize: 26 }} checked={checked} onChange={handleCheck} />

            <div className={cn('product-img')}>
               <img src={'http://localhost:4000/' + image} alt="Ảnh sản phẩm" />
            </div>

            <div className={cn('product-name')}>
               <h4>{ten_sp}</h4>
            </div>
         </div>

         <div className={cn('price')}>
            {km > 0 ? <h4 className={cn('old-price')}>{currencyFormater.format(gia_sp)}</h4> : <></>}

            <h4 className={cn('current-price')}>{currencyFormater.format(gia_sp - (gia_sp * km) / 100)}</h4>
         </div>

         <div className={cn('product-amount')}>
            <div className={cn('product-amount')}>
               <IconButton
                  onClick={() => {
                     if (amount > 1) {
                        setAmount(amount - 1);
                        handleUpdateAmount('minus');
                     } else {
                        toast.warn('Không thể giảm thêm!', { position: 'top-center' });
                     }
                  }}
               >
                  <RemoveIcon sx={{ fontSize: 26, cursor: 'pointer' }} />
               </IconButton>
               <h2 className={cn('amount')}>{amount}</h2>
               <IconButton
                  onClick={() => {
                     setAmount(amount + 1);
                     handleUpdateAmount('increase');
                  }}
               >
                  <AddIcon sx={{ fontSize: 26, cursor: 'pointer' }} />
               </IconButton>
            </div>
         </div>

         <h4 className={cn('product-prices')}>{currencyFormater.format(sl_sp * (gia_sp - (gia_sp * km) / 100))}</h4>

         <div className={cn('product-edit')}>
            <IconButton onClick={() => handleRemove()}>
               <DeleteOutlineIcon sx={{ fontSize: 26 }} />
            </IconButton>
         </div>
      </div>
   );
}

export default CartItem;
