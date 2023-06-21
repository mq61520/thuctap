import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

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
   const is_logged = localStorage.getItem('is_logged');

   const [amount, setAmount] = useState(0);
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
            // console.log(s);
         }
      }
      return desc;
   };

   const handlePreview = (e) => {
      document.querySelector('#preview-img').src = e.target.src;
   };

   const [prodInfo, setProdInfo] = useState('');
   const [imgProd, setImgProd] = useState([]);
   const handleGetProductInfo = async (ma_sp) => {
      const product_info = await axios.get('http://localhost:4000/product/' + ma_sp);

      const product_imgaes = await axios.get('http://localhost:4000/product/images/' + ma_sp);

      if (product_info.data && product_imgaes.data) {
         setProdInfo(product_info.data[0]);
         setImgProd(product_imgaes.data);

         document.title = product_info.data[0].sp_ten;

         // console.log('get product oke');
         console.log(product_info.data[0]);
      } else {
         toast.warn('Lỗi', { position: 'top-center' });
      }
   };

   const handleAddToCart = async () => {
      if (is_logged === '0') {
         toast.warn('Đăng nhập để thêm sản phẩm vào giỏ hàng.', { position: 'top-center' });
      } else {
         try {
            toast.success('Them thanh cong.', { position: 'top-center' });
         } catch (error) {
            console.log(error);
         }
      }
   };

   useEffect(() => {
      window.scrollTo(0, 0);

      var ma_sp = window.location.pathname.slice(16).toString();
      handleGetProductInfo(ma_sp);
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
                        {imgProd.length > 0 ? (
                           imgProd.map((img) => {
                              return (
                                 <SwiperSlide key={img.ha_id}>
                                    <img
                                       className={cn('slide-img')}
                                       src={'http://localhost:4000/' + img.ha_ten}
                                       alt="Hình ảnh sản phẩm"
                                       onClick={handlePreview}
                                    />
                                 </SwiperSlide>
                              );
                           })
                        ) : (
                           <></>
                        )}
                     </Swiper>
                  </div>

                  <div className={cn('product-img')}>
                     <img
                        className={cn('preview-img')}
                        id="preview-img"
                        src={prodInfo.sp_image ? 'http://localhost:4000/' + prodInfo.sp_image : ''}
                        alt="Hình ảnh sản phẩm"
                     />
                  </div>
               </div>

               <div className={cn('right-side')}>
                  <h2 className={cn('product-name')}>{prodInfo.sp_ten}</h2>

                  <div className={cn('product-vote')}>
                     <Rating value={4} readOnly />
                     <span>(4.5)</span>
                  </div>

                  <div className={cn('flex-product-price')}>
                     {prodInfo.sp_khuyenmai != null ? (
                        <h2 className={cn('product-discount')}>{currencyFormater.format(prodInfo.sp_gia)}</h2>
                     ) : (
                        <></>
                     )}

                     <h2 className={cn('product-price')}>{currencyFormater.format(prodInfo.sp_gia)}</h2>

                     {prodInfo.sp_khuyenmai != null ? (
                        <div className={cn('discount-flag')}>
                           <span>-20%</span>
                        </div>
                     ) : (
                        <></>
                     )}
                  </div>

                  <div className={cn('flex-amount')}>
                     <div className={cn('product-amount')}>
                        <RemoveIcon
                           sx={{ cursor: 'pointer' }}
                           onClick={() => {
                              if (amount > 0) {
                                 setAmount(amount - 1);
                              } else {
                                 return;
                              }
                           }}
                        />
                        <h2 className={cn('amount')}>{amount}</h2>
                        <AddIcon
                           sx={{ cursor: 'pointer' }}
                           onClick={() => {
                              if (amount >= prodInfo.sp_tonkho) {
                                 return;
                              } else {
                                 setAmount(amount + 1);
                              }
                           }}
                        />
                     </div>
                  </div>

                  <div className={cn('btns')}>
                     <div className={cn('add-to-cart-btn')}>
                        <Button
                           variant="outlined"
                           style={{ color: 'var(--mainColor4)' }}
                           onClick={() => handleAddToCart()}
                        >
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
                        <td>{prodInfo.sp_ma}</td>
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

               <h4 className={cn('name')}>{prodInfo.sp_ten}</h4>

               {desc.map((p, index) => {
                  return <p key={index}>{p}</p>;
               })}
            </div>
         </div>
      </div>
   );
}

export default DetailProduct;
