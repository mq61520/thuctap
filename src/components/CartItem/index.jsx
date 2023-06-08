import { useState } from 'react';
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

function CartItem({ ma_sp, image, ten_sp, sl_sp, gia_sp, km, deleted, check, updated }) {
   const [checked, setChecked] = useState(false);
   const [amount, setAmount] = useState(1);

   const handleChange = (event) => {
      setChecked(event.target.checked);
   };

   return (
      <div className={cn('product')}>
         <div className={cn('flex-info')}>
            <Checkbox sx={{ fontSize: 26 }} checked={checked} onChange={handleChange} />

            <div className={cn('product-img')}>
               <img
                  src="https://cdn0.fahasa.com/media/catalog/product/n/x/nxbtre_full_30282023_112849_1.jpg"
                  alt="Ảnh sản phẩm"
               />
            </div>

            <div className={cn('product-name')}>
               <h4>Alice In Borderland - Tập 11 - Tặng Kèm Card Giấy</h4>
            </div>
         </div>

         <div className={cn('price')}>
            <h4 className={cn('old-price')}>{currencyFormater.format(1215112)}</h4>

            <h4 className={cn('current-price')}>{currencyFormater.format(2164542)}</h4>
         </div>

         <div className={cn('product-amount')}>
            <div className={cn('product-amount')}>
               <IconButton
                  onClick={() => {
                     if (amount > 1) {
                        setAmount(amount - 1);
                     } else {
                        toast.error('Không thể giảm thêm!', { position: 'top-center' });
                     }
                  }}
               >
                  <RemoveIcon sx={{ fontSize: 26, cursor: 'pointer' }} />
               </IconButton>
               <h2 className={cn('amount')}>{amount}</h2>
               <IconButton
                  onClick={() => {
                     setAmount(amount + 1);
                  }}
               >
                  <AddIcon sx={{ fontSize: 26, cursor: 'pointer' }} />
               </IconButton>
            </div>
         </div>

         <h4 className={cn('product-prices')}>{currencyFormater.format(2125423)}</h4>

         <div className={cn('product-edit')}>
            <IconButton>
               <DeleteOutlineIcon sx={{ fontSize: 26 }} />
            </IconButton>
         </div>
      </div>
   );
}

export default CartItem;
