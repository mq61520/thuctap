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

const cn = classNames.bind(styles);

function Home() {
   return (
      <div className={cn('home-page')}>
         <div className={cn('inner-content')}>
            <div className={cn('top-banner')}>
               <Swiper
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
                     <div className={cn('banner-img')}>
                        <img
                           src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2023/Back%20to%20school_trangtong_Mainbanner_web.jpg"
                           alt="Top banner home"
                           height={350}
                        />
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div className={cn('banner-img')}>
                        <img
                           src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2023/Back%20to%20school_trangtong_Mainbanner_web.jpg"
                           alt="Top banner home"
                           width={1291}
                        />
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div className={cn('banner-img')}>
                        <img
                           src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2023/Back%20to%20school_trangtong_Mainbanner_web.jpg"
                           alt="Top banner home"
                           width={1291}
                        />
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div className={cn('banner-img')}>
                        <img
                           src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2023/Back%20to%20school_trangtong_Mainbanner_web.jpg"
                           alt="Top banner home"
                           width={1291}
                        />
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div className={cn('banner-img')}>
                        <img
                           src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2023/Back%20to%20school_trangtong_Mainbanner_web.jpg"
                           alt="Top banner home"
                           width={1291}
                        />
                     </div>
                  </SwiperSlide>
               </Swiper>
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
                     <SwiperSlide>
                        <ProductItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <ProductItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <ProductItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <ProductItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <ProductItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <ProductItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <ProductItem />
                     </SwiperSlide>
                     <SwiperSlide>
                        <ProductItem />
                     </SwiperSlide>
                  </Swiper>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;
