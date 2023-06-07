import { useState } from 'react';
import classNames from 'classnames/bind';

//mui
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import './Swiper.ProductDetail.scss';

import styles from './DetailProduct.module.scss';
import currencyFormater from '../../common/formatCurrency';

const cn = classNames.bind(styles);

function DetailProduct() {
   const [amount, setAmount] = useState(1);

   const handlePreview = (e) => {
      document.querySelector('#preview-img').src = e.target.src;
   };

   return (
      <div className={cn('detail-product-page')}>
         <div className={cn('inner')}>
            <div className={cn('product-info')}>
               <div className={cn('left-side')}>
                  <div className={cn('product-img-list')}>
                     <Swiper
                        direction={'vertical'}
                        slidesPerView={4}
                        spaceBetween={7}
                        loop={true}
                        pagination={{
                           clickable: true,
                           enabled: false,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="product-detail-swiper"
                        style={{
                           '--swiper-navigation-size': '16px',
                           textRendering: 'auto',
                           fontWeight: '400',
                        }}
                     >
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                              alt="Hình ảnh sản phẩm"
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                              alt="Hình ảnh sản phẩm"
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                              alt="Hình ảnh sản phẩm"
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                              alt="Hình ảnh sản phẩm"
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                              alt="Hình ảnh sản phẩm"
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://cdn0.fahasa.com/media/catalog/product/k/a/kaguya-sama-cuoc-chien-to-tinh_bia_postcard_tap-17.jpg"
                              alt="Hình ảnh sản phẩm"
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                     </Swiper>
                  </div>

                  <div className={cn('product-img')}>
                     <img
                        className={cn('preview-img')}
                        id="preview-img"
                        src="https://cdn0.fahasa.com/media/catalog/product/m/a/mashle_bia_postcard_tap-03.jpg"
                        alt="Hình ảnh sản phẩm"
                     />
                  </div>
               </div>

               <div className={cn('right-side')}>
                  <h2 className={cn('product-name')}>
                     MASHLE - Tập 3: Mash Burnedead Và Pháp Sư Mặt Nạ - Tặng Kèm Postcard
                  </h2>

                  <div className={cn('product-vote')}>
                     <Rating value={4} readOnly />
                     <span>(4.5)</span>
                  </div>

                  <div className={cn('flex-product-price')}>
                     <h2 className={cn('product-discount')}>{currencyFormater.format(1548445)}</h2>
                     <h2 className={cn('product-price')}>{currencyFormater.format(41456454)}</h2>

                     <div className={cn('discount-flag')}>
                        <span>-20%</span>
                     </div>
                  </div>

                  <div className={cn('flex-amount')}>
                     <div className={cn('product-amount')}>
                        <RemoveIcon
                           onClick={() => {
                              setAmount(amount - 1);
                           }}
                        />
                        <h2 className={cn('amount')}>{amount}</h2>
                        <AddIcon
                           onClick={() => {
                              setAmount(amount + 1);
                           }}
                        />
                     </div>
                  </div>

                  <div className={cn('btns')}>
                     <div className={cn('add-to-cart-btn')}>
                        <Button variant="outlined">
                           <AddShoppingCartIcon sx={{ marginRight: '5px' }} />
                           Thêm vào giỏ hàng
                        </Button>
                     </div>

                     <div className={cn('buy-now-btn')}>
                        <Button variant="contained">
                           <AccountBalanceWalletOutlinedIcon sx={{ marginRight: '5px' }} />
                           Mua ngay
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DetailProduct;
