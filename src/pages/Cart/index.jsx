import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

//mui
import Button from '@mui/material/Button';

import styles from './Cart.module.scss';
import CartItem from '../../components/CartItem';
import currencyFormater from '../../common/formatCurrency';
import { changeAmount } from '../../app/slices/cartSlice';
import { addToList, removeFromList, setLocation, setPayList } from '../../app/slices/paySlice';

const cn = classNames.bind(styles);

function Cart() {
   const cart = useSelector((state) => state.cart);
   const pay = useSelector((state) => state.pay);
   const dispatch = useDispatch();

   const [listProduct, setListProduct] = useState([]);
   const [products, setProducts] = useState([]);
   const [total, setTotal] = useState(0);
   const [checked, setChecked] = useState(0);

   const handleGetProduct = async () => {
      try {
         var user_id = localStorage.getItem('user_id');
         const get_cart_response = await axios.get('http://localhost:4000/cart/list_product/' + user_id);

         if (get_cart_response.data.length > 0) {
            setListProduct(get_cart_response.data);

            // console.log('list product:', get_cart_response.data);

            var id_product = [];
            for (let i = 0; i < get_cart_response.data.length; i++) {
               try {
                  var product_info_response;
                  if (get_cart_response.data[i] !== undefined) {
                     product_info_response = await axios.get(
                        'http://localhost:4000/product/' + get_cart_response.data[i].sp_ma,
                     );
                  }

                  if (product_info_response.data.length > 0) {
                     id_product.push({
                        amount: get_cart_response.data[i].gh_soluong,
                        info: product_info_response.data[0],
                        cart_id: get_cart_response.data[i].gh_id,
                     });
                  }
               } catch (error) {
                  console.log('loi info', error);
               }
            }

            // console.log('id_product', id_product);
            setProducts(id_product);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleToPay = async () => {};

   useEffect(() => {
      handleGetProduct();
      const action = setPayList();
      dispatch(action);
   }, []);

   console.log(pay.listProd);

   // console.log(products);

   return (
      <div className={cn('cart-page')}>
         <div className={cn('inner')}>
            <h3>Giỏ hàng</h3>

            {listProduct.length > 0 ? (
               <>
                  <div className={cn('header-list')}>
                     <h4 className={cn('product-info')}>Sản phẩm</h4>
                     <h4 className={cn('product-price')}>Đơn giá</h4>
                     <h4 className={cn('product-amount')}>Số lượng</h4>
                     <h4 className={cn('product-total-price')}>Thành tiền</h4>
                     <h4 className={cn('action')}>Thao tác</h4>
                  </div>
                  <div className={cn('product-list')}>
                     {products.map((prod) => {
                        return (
                           <CartItem
                              key={prod.info.sp_id}
                              gh_id={prod.cart_id}
                              ma_sp={prod.info.sp_ma}
                              ten_sp={prod.info.sp_ten}
                              image={prod.info.sp_image}
                              sl_sp={prod.amount}
                              gia_sp={prod.info.sp_gia}
                              // km={p.promotion}
                              isChecked={(status) => {
                                 if (status == true) {
                                    const action = addToList({
                                       ma_sp: prod.info.sp_ma,
                                       ten_sp: prod.info.sp_ten,
                                       anh_sp: prod.info.sp_image,
                                       sl_sp: prod.amount,
                                       gia_sp: prod.info.sp_gia,
                                       thanh_tien: prod.info.sp_gia * prod.amount,
                                    });
                                    dispatch(action);

                                    const update_location = setLocation('FromCart');
                                    dispatch(update_location);

                                    setTotal(total + prod.info.sp_gia * prod.amount);
                                    setChecked(checked + 1);
                                 } else {
                                    const action = removeFromList({
                                       ma_sp: prod.info.sp_ma,
                                    });
                                    dispatch(action);

                                    setTotal(total - prod.info.sp_gia * prod.amount);
                                    setChecked(checked - 1);
                                 }
                              }}
                              isUpdated={(status) => {
                                 if (status == 'Updated') {
                                    handleGetProduct();
                                    console.log('updated');
                                 }
                              }}
                              isRemoved={(status) => {
                                 if (status === 'Removed' && listProduct.length == 1) {
                                    setListProduct([]);
                                    const action = changeAmount(cart.amount - 1);
                                    dispatch(action);
                                    toast.success('Đã xóa.', { position: 'top-center' });
                                 } else {
                                    handleGetProduct();
                                    const action = changeAmount(cart.amount - 1);
                                    dispatch(action);
                                    toast.success('Đã xóa.', { position: 'top-center' });
                                 }
                              }}
                           />
                        );
                     })}
                  </div>

                  <div className={cn('actions')}>
                     <div className={cn('total')}>
                        <h4 className={cn('amount')}>
                           <b>{checked}</b> sản phẩm
                        </h4>

                        <div className={cn('total-price')}>
                           <h4 style={{ color: '#333', fontSize: '24px' }}>Tổng thanh toán:</h4>
                           <h4>{currencyFormater.format(total)}</h4>
                        </div>
                     </div>
                  </div>

                  <div className={cn('btn-flex')}>
                     <div className={cn('pay-btn')}>
                        <Link to={'/checkout'}>
                           <Button variant="contained" onClick={() => handleToPay()}>
                              Tiến hành thanh toán
                           </Button>
                        </Link>
                     </div>
                  </div>
               </>
            ) : (
               <>
                  <div className={cn('no-product')}>
                     <h3 className={cn('message')}>Bạn chưa có sản phẩm nào trong giỏ hàng!</h3>

                     <div className={cn('go-shop')}>
                        <Link to={'/'}>
                           <Button variant="text" sx={{ fontSize: 20 }}>
                              Tiến hành mua hàng
                           </Button>
                        </Link>
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default Cart;
