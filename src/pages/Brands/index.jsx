import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames/bind';

import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import '../../common/swiper-button.scss';

import styles from './Brands.module.scss';
import ProductItem from '../../components/ProductItem';
import CategoryItem from '../../components/CategoryItem';
import { Link } from 'react-router-dom';

const cn = classNames.bind(styles);

function Brand() {
   const brand = location.pathname.slice(16);

   const [listProd, setListProd] = useState([]);
   const handleGetProductList = async () => {
      try {
         var api_link = '';
         if (brand === 'all') {
            api_link = 'http://localhost:4000/product/all';
         } else {
            api_link = 'http://localhost:4000/product/brand/' + brand;
         }
         const product_list = await axios.get(api_link);

         if (product_list.data.length >= 0) {
            setListProd(product_list.data);
         } else {
            console.log('Lỗi');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const [brands, setBrands] = useState([]);
   const handleGetBrand = async () => {
      try {
         const brand_list = await axios.get('http://localhost:4000/brands');

         if (brand_list.data.length > 0) {
            setBrands(brand_list.data);
            console.log(brand_list.data);
         } else {
            console.log('Lỗi');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleGetProductList();
      handleGetBrand();
   }, []);

   return (
      <div className={cn('product-page')}>
         <div className={cn('inner')}>
            <div className={cn('categories')}>
               <div className={cn('category-title')}>
                  <AutoAwesomeMosaicOutlinedIcon
                     sx={{ fontSize: 30, marginRight: '5px', color: 'var(--mainColor4)' }}
                  />
                  DANH MỤC
               </div>

               <div className={cn('category-list')}>
                  <Swiper
                     slidesPerView={9}
                     spaceBetween={5}
                     pagination={{ clickable: true, enabled: false }}
                     navigation={true}
                     modules={[Pagination, Navigation]}
                     className="category-list-swiper"
                     style={{
                        '--swiper-navigation-size': '16px',
                        textRendering: 'auto',
                        fontWeight: '400',
                     }}
                  >
                     {brands.length > 0 ? (
                        brands.map((brand) => {
                           return (
                              <SwiperSlide key={brand.dm_id}>
                                 <CategoryItem ten_dm={brand.dm_ten} ma_dm={brand.dm_ma} />
                              </SwiperSlide>
                           );
                        })
                     ) : (
                        <></>
                     )}
                  </Swiper>
               </div>
            </div>

            <h4 className={cn('title-list')}>Tất cả sản phẩm</h4>

            <div className={cn('product-list')}>
               {listProd.length > 0 ? (
                  listProd.map((product) => {
                     return (
                        <ProductItem
                           key={product.sp_id}
                           ma_sp={product.sp_ma}
                           img={product.sp_image}
                           ten={product.sp_ten}
                           gia={product.sp_gia}
                           km={product.sp_khuyenmai}
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

export default Brand;
