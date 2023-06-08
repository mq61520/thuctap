import { useEffect, useState } from 'react';
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
   window.scrollTo(0, 0);

   const [amount, setAmount] = useState(1);
   const [showMoreDesc, setShowMoreDesc] = useState(false);

   const [desc, setDesc] = useState([]);
   const textDesc = `Arisu Ryohei tự nhận mình là một thành phần “ăn hại xã hội”, học hành lẹt đẹt nên đang cực kỳ chán đời. Trong một lần tụ tập than vãn cùng hai thằng bạn thân Karube và Chota, cả ba bất chợt nhìn thấy pháo hoa, và sau đó là một vụ nổ long trời lở đất. Khi bụi đất lắng xuống, họ nhận ra mình đang ở trong một thế giới hoàn toàn khác. Ở nơi này, Arisu, Karube và Chota bị buộc phải tham gia liên tiếp vào những trò chơi chết người do một thế lực nào đó áp đặt, nếu không muốn bị trừng phạt bằng cái chết. Liệu 3 người bạn của chúng ta có thể vượt qua và sống sót trong một thế giới đầy nguy hiểm như thế?
   Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh.
   Alice In Borderland - Tập 11
   Arisu Ryohei tự nhận mình là một thành phần “ăn hại xã hội”, học hành lẹt đẹt nên đang cực kỳ chán đời. Trong một lần tụ tập than vãn cùng hai thằng bạn thân Karube và Chota, cả ba bất chợt nhìn thấy pháo hoa, và sau đó là một vụ nổ long trời lở đất. Khi bụi đất lắng xuống, họ nhận ra mình đang ở trong một thế giới hoàn toàn khác. Ở nơi này, Arisu, Karube và Chota bị buộc phải tham gia liên tiếp vào những trò chơi chết người do một thế lực nào đó áp đặt, nếu không muốn bị trừng phạt bằng cái chết. Liệu 3 người bạn của chúng ta có thể vượt qua và sống sót trong một thế giới đầy nguy hiểm như thế?`;
   const handleTextDesc = (text) => {
      const desc = [];
      var s = 0;
      for (let i = 0; i < text.length; i++) {
         if (text[i] === '.') {
            desc.push(text.slice(s, i + 1));
            s = i + 1;
            console.log(s);
         }
      }
      return desc;
   };

   const handlePreview = (e) => {
      document.querySelector('#preview-img').src = e.target.src;
   };

   useEffect(() => {
      setDesc(handleTextDesc(textDesc));
   }, []);

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
                        <Button variant="outlined" style={{ color: 'var(--mainColor4)' }}>
                           <AddShoppingCartIcon sx={{ marginRight: '5px' }} />
                           Thêm vào giỏ hàng
                        </Button>
                     </div>

                     <div className={cn('buy-now-btn')}>
                        <Button variant="contained" style={{ backgroundColor: 'var(--mainColor4)' }}>
                           <AccountBalanceWalletOutlinedIcon sx={{ marginRight: '5px' }} />
                           Mua ngay
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            <div className={cn('product-description')}>
               <h4>Thông tin sản phẩm</h4>

               <table>
                  <tbody>
                     <tr>
                        <td style={{ color: '#777' }}>Mã sản phẩm</td>
                        <td>kscctt17</td>
                     </tr>
                     <tr>
                        <td style={{ color: '#777' }}>Tác giả</td>
                        <td>Aka Akasaka</td>
                     </tr>
                     <tr>
                        <td style={{ color: '#777' }}>Nhà xuất bản</td>
                        <td>Kim Đồng</td>
                     </tr>
                     <tr>
                        <td style={{ color: '#777' }}>Người dịch</td>
                        <td>Dĩ Ninh</td>
                     </tr>
                     <tr>
                        <td style={{ color: '#777' }}>Năm xuất bản</td>
                        <td> 2023</td>
                     </tr>
                     <tr>
                        <td style={{ color: '#777' }}>Ngôn ngữ</td>
                        <td>Tiếng Việt</td>
                     </tr>
                     <tr>
                        <td style={{ color: '#777' }}>Số trang</td>
                        <td>203</td>
                     </tr>
                     <tr>
                        <td style={{ color: '#777' }}>Kích thước</td>
                        <td>18 x 13 x 1 cm</td>
                     </tr>
                     <tr>
                        <td style={{ color: '#777' }}>Trọng lượng</td>
                        <td>210 (gr)</td>
                     </tr>
                  </tbody>
               </table>

               <p style={{ padding: '10px 0' }}>
                  Giá sản phẩm trên website đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm,
                  hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận
                  chuyển, phụ phí hàng cồng kềnh,...
               </p>

               <h4 className={cn('name')}>Alice In Borderland - Tập 11</h4>

               {desc.map((p, index) => {
                  return <p key={index}>{p}</p>;
               })}
            </div>
         </div>
      </div>
   );
}

export default DetailProduct;
