import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import classNames from 'classnames/bind';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import '../../common/swiper-button.scss';

import styles from './Home.module.scss';
import ProductItem from '../../components/ProductItem';
import CategoryItem from '../../components/CategoryItem';
import { setPayList } from '../../app/slices/paySlice';

const cn = classNames.bind(styles);

function Home() {
   const [listProd, setListProd] = useState([]);

   const handleGetProductList = async () => {
      try {
         const product_list = await axios.get('http://localhost:4000/product/all');

         if (product_list.data.length > 0) {
            setListProd(product_list.data);
            console.log(product_list.data);
         } else {
            console.log('Tải sản phẩm thất bại.');
         }
      } catch (error) {
         console.log(error);
      }
   };

   // const dispatch = useDispatch();
   // const action = setPayList();
   // dispatch(action);
   useEffect(() => {
      handleGetProductList();
   }, []);

   return (
      <div className={cn('home-page')}>
         <div className={cn('inner-content')}>
            <div className={cn('banners')}>
               <Swiper
                  loop
                  autoplay
                  pagination={{ clickable: true, enabled: false }}
                  navigation={true}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="category-list-swiper"
                  style={{
                     '--swiper-navigation-size': '16px',
                     textRendering: 'auto',
                     fontWeight: '400',
                  }}
               >
                  <SwiperSlide>
                     <div className={cn('top-left-banner-img')}>
                        <img
                           src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2023/Back%20to%20school_trangtong_Mainbanner_web.jpg"
                           alt="Top banner home"
                        />
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div className={cn('top-left-banner-img')}>
                        <img
                           src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/poticot6_1920x400.png"
                           alt="Top banner home"
                        />
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div className={cn('top-left-banner-img')}>
                        <img
                           src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2023/ttrangbalo_1920x800.jpg"
                           alt="Top banner home"
                        />
                     </div>
                  </SwiperSlide>
               </Swiper>
            </div>

            <div className={cn('hot-products')}>
               <div className={cn('hot-product-title')}>
                  <WhatshotOutlinedIcon sx={{ fontSize: 30, marginRight: '5px', color: 'red' }} />
                  SẢN PHẨM HOT
               </div>

               <div className={cn('hot-product-list')}>
                  <Swiper
                     slidesPerView={6}
                     spaceBetween={21}
                     pagination={{ clickable: true, enabled: false }}
                     navigation={true}
                     modules={[Pagination, Navigation]}
                     className="hot-product-list-swiper"
                     style={{
                        '--swiper-navigation-size': '14px',
                        '--swiper-navigation-color': 'var(--mainColor4)',
                        textRendering: 'auto',
                        fontWeight: '400',
                     }}
                  >
                     {listProd.length > 0 ? (
                        listProd.map((product) => {
                           return (
                              <SwiperSlide key={product.sp_id}>
                                 <ProductItem
                                    ma_sp={product.sp_ma}
                                    img={product.sp_image}
                                    ten={product.sp_ten}
                                    gia={product.sp_gia}
                                 />
                              </SwiperSlide>
                           );
                        })
                     ) : (
                        <></>
                     )}
                  </Swiper>
               </div>
            </div>

            <div className={cn('categories')}>
               <div className={cn('category-title')}>
                  <AutoAwesomeMosaicOutlinedIcon
                     sx={{ fontSize: 30, marginRight: '5px', color: 'var(--mainColor4)' }}
                  />
                  DANH MỤC
               </div>

               <div className={cn('category-list')}>
                  <Swiper
                     slidesPerView={8}
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
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <CategoryItem />
                     </SwiperSlide>
                  </Swiper>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;
