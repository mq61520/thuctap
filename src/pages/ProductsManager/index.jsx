import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

//mui
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CloseIcon from '@mui/icons-material/Close';

//tippy
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import styles from './ProductsManager.module.scss';
import currencyFormater from '../../common/formatCurrency';
import './ProductsManager.scss';
import Popper from '../../components/Popper';

const cn = classNames.bind(styles);

function ProductsManager() {
   document.title = 'Quản lý hàng hóa';

   //modal
   const styleModalProduct = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1056px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: 24,
      padding: '20px',
   };
   const styleModalPromotion = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'fit-content',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: 24,
      padding: '20px',
   };
   const styleModalProdPromotion = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'fit-content',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: 24,
      padding: '20px',
   };
   //state of modal add product
   const [openModal, setOpenModal] = useState(false);
   const handleOpen = () => setOpenModal(true);
   const handleClose = () => setOpenModal(false);
   //state of modal promotion
   const [openModalPromotion, setOpenModalPromotion] = useState(false);
   const handleOpenPromotion = () => setOpenModalPromotion(true);
   const handleClosePromotion = () => setOpenModalPromotion(false);

   const [listProd, setListProd] = useState([]);

   const [prodCode, setProdCode] = useState('');
   const [prodName, setProdName] = useState('');
   const [prodAmount, setProdAmount] = useState('');
   const [prodPrice, setProdPrice] = useState('');
   const [brand, setBrand] = useState(1);
   const [prodDesc, setProdDesc] = useState('');
   const [imgSp, setImgSp] = useState([]);

   const handleAddProduct = async () => {
      try {
         const add_product_res = await axios.post('http://localhost:4000/product/add', {
            ma_sp: prodCode,
            anh_sp: imgSp[0].name,
            ten: prodName,
            sl: prodAmount,
            gia: prodPrice,
            danhmuc: brand,
            mota: prodDesc,
         });
         // console.log(add_product_res);

         var add_images_res;
         for (let i = 0; i < imgSp.length; i++) {
            const postData = new FormData();
            postData.append('product_images', imgSp[i]);
            postData.append('ma_sp', prodCode);

            add_images_res = await axios({
               method: 'POST',
               url: 'http://localhost:4000/product/product_images',
               data: postData,
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
         }

         console.log('product response:' + add_product_res.data);
         console.log('image response:' + add_images_res.data);

         if (add_product_res.data === 'ExistProductCode') {
            toast.warn('Đã tồn tại mã sản phẩm này. Hãy chọn mã khác.', { position: 'top-center' });
         } else if (add_product_res.data === 'AddProductSuccess' && add_images_res.data === 'AddImgSuccess') {
            console.log('Thêm sản phẩm thành công');
            toast.success('Thêm sản phẩm thành công.', { position: 'top-center' });

            setProdCode('');
            setProdName('');
            setProdAmount('');
            setProdPrice('');
            setProdDesc('');
            setBrand(1);
            setImgSp([]);

            handleGetProductList();
         } else {
            console.log('Thêm sản phẩm không thành công');
            toast.error('Thêm sản phẩm không thành công.', { position: 'top-center' });
         }
      } catch (error) {
         console.log(error);
      }
   };

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

   const hanldeRemoveProduct = async (ma_sp) => {
      try {
         const delete_product = await axios.get('http://localhost:4000/product/delete/' + ma_sp);

         if (delete_product.data === 'DeleteProductSuccess') {
            toast.success(`Xóa sản phẩm ${ma_sp} thành công.`, { position: 'top-center' });
            handleGetProductList();
         } else {
            toast.error(`Xóa sản phẩm ${ma_sp} không thành công.`, { position: 'top-center' });
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleUpdateStatus = async (ma_sp, status) => {
      try {
         var new_status;

         if (status == 1) {
            new_status = 0;
         } else {
            new_status = 1;
         }

         const update_product = await axios.post('http://localhost:4000/product/status', {
            ma_sp: ma_sp,
            status: new_status,
         });

         if (update_product.data === 'UpdateProductSuccess') {
            handleGetProductList();
         } else {
            // toast.error(`Lỗi.`, { position: 'top-center' });
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

   const [promotion, setPromotion] = useState('');
   const [dateStart, setDateStart] = useState('');
   const [dateEnd, setDateEnd] = useState('');
   const handleAddPromotion = async () => {
      try {
         const add_promotion_response = await axios.post('http://localhost:4000/promotion/add', {
            value: promotion,
            date_start: dateStart,
            date_end: dateEnd,
         });

         if (add_promotion_response.data === 'InsertPromotionSuccess') {
            toast.success('Thêm thành công.', { position: 'top-center' });
         } else if (add_promotion_response.data === 'AddFail') {
            toast.error('Lỗi.', { position: 'top-center' });
         }
      } catch (error) {
         console.log(error);
      }
   };
   const [promotionList, setPromotionList] = useState([]);
   const handleGetPromotionList = async () => {
      const promotion_list_response = await axios.get('http://localhost:4000/promotion/all');

      if (promotion_list_response.data.length > 0) {
         setPromotionList(promotion_list_response.data);
      }
   };
   const handleUpdatePromotion = async (ma_sp, value, ngaybatdau, ngayketthuc) => {
      try {
         const update_promotion_res = await axios.post('http://localhost:4000/product/promotion/update', {
            ma_sp: ma_sp,
            value: value,
            batdau: ngaybatdau,
            ketthuc: ngayketthuc,
         });

         if (update_promotion_res.data === 'UpdatePromotionSuccess') {
            handleGetProductList();
            toast.success(`Áp dụng thành công.`, { position: 'top-center' });
         } else {
            toast.error(`Lỗi.`, { position: 'top-center' });
         }
      } catch (error) {
         console.log(error);
      }
   };

   var stt = 0;
   const date = new Date();
   const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
   const month = date.getMonth() + 1;
   const today = day + '-' + month + '-' + date.getFullYear();

   const equalsDate = (d1, d2) => {
      const date1 = new Date(d1);
      const date2 = new Date(d2);

      if (date1.getTime() > date2.getTime()) {
         console.log(`${d1} is greater than ${d2} in terms of milliseconds`);
      } else if (date1.getYear() < date2.getYear()) {
         console.log(`${d2} is greater than ${d1} in terms of years`);
      } else if (date1.getDate() === date2.getDate()) {
         console.log(`Both dates are equal`);
      }
   };

   useEffect(() => {
      equalsDate('20/06/2023', '21/05/2023');
      handleGetProductList();
      handleGetBrand();
      handleGetPromotionList();
   }, []);

   return (
      <div className={cn('body')}>
         <h4 className={cn('content-title')}>Quản lý sản phẩm</h4>

         <div className={cn('product-crud')}>
            <div className={cn('crud-btn')}>
               <Button
                  variant="contained"
                  startIcon={<AddIcon sx={{ width: '30px', height: '30px' }} />}
                  sx={{ width: '200px', height: '42px', fontSize: '20px', backgroundColor: 'var(--mainColor4)' }}
                  onClick={handleOpenPromotion}
               >
                  Khuyến mãi
               </Button>

               <Modal open={openModalPromotion} onClose={handleClosePromotion}>
                  <div className={cn('change-address-modal-container')} style={styleModalPromotion}>
                     <div
                        className={cn('modal-header')}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                     >
                        <h4 style={{ fontSize: 24, fontWeight: 400, color: '#333' }}>Tạo khuyến mãi</h4>

                        <IconButton
                           onClick={() => {
                              setOpenModalPromotion(false);
                           }}
                        >
                           <CloseIcon />
                        </IconButton>
                     </div>

                     <div className={cn('modal-body')} style={{ display: 'flex', alignItems: 'center', marginTop: 26 }}>
                        <TextField
                           type="number"
                           label="% giảm"
                           fullWidth
                           size="large"
                           sx={{ width: 'fit-content' }}
                           value={promotion}
                           onChange={(e) => {
                              setPromotion(e.target.value);
                           }}
                        />

                        <input
                           type="date"
                           style={{ margin: '0 10px' }}
                           onChange={(e) => {
                              setDateStart(e.target.value);
                           }}
                        />

                        <input
                           type="date"
                           onChange={(e) => {
                              setDateEnd(e.target.value);
                           }}
                        />
                     </div>

                     <div
                        className={cn('modal-footer')}
                        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 26 }}
                     >
                        <Button
                           variant="outlined"
                           sx={{ width: '120px', color: 'var(--mainColor4)', margin: '0 10px' }}
                           onClick={handleClosePromotion}
                        >
                           Đóng
                        </Button>

                        <Button
                           variant="contained"
                           sx={{ width: '120px', backgroundColor: 'var(--mainColor4)' }}
                           onClick={() => {
                              handleAddPromotion();
                              handleGetPromotionList();
                           }}
                        >
                           Tạo
                        </Button>
                     </div>
                  </div>
               </Modal>
            </div>

            <div className={cn('crud-btn')}>
               <Button
                  variant="contained"
                  startIcon={<AddIcon sx={{ width: '30px', height: '30px' }} />}
                  sx={{ width: 'fit-content', height: '42px', fontSize: '20px', backgroundColor: 'var(--mainColor4)' }}
                  onClick={handleOpen}
               >
                  Sản Phẩm
               </Button>

               <Modal open={openModal} onClose={handleClose}>
                  <div className={cn('change-address-modal-container')} style={styleModalProduct}>
                     <div
                        className={cn('modal-header')}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                     >
                        <h4 style={{ fontSize: 24, fontWeight: 400, color: '#333' }}>Thêm sản phẩm mới</h4>

                        <IconButton
                           onClick={() => {
                              setOpenModal(false);
                           }}
                        >
                           <CloseIcon />
                        </IconButton>
                     </div>

                     <div
                        className={cn('modal-body')}
                        style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26 }}
                     >
                        <div className={cn('left-side')} style={{ width: '500px' }}>
                           <TextField
                              label="Mã sản phẩm"
                              fullWidth
                              size="large"
                              margin="normal"
                              value={prodCode}
                              onChange={(e) => {
                                 setProdCode(e.target.value);
                              }}
                           />
                           <TextField
                              label="Tên sản phẩm"
                              fullWidth
                              multiline
                              size="large"
                              margin="normal"
                              value={prodName}
                              onChange={(e) => {
                                 setProdName(e.target.value);
                              }}
                           />
                           <TextField
                              type="number"
                              label="Số lượng"
                              fullWidth
                              multiline
                              size="large"
                              margin="normal"
                              value={prodAmount}
                              onChange={(e) => {
                                 setProdAmount(e.target.value);
                              }}
                           />
                           <TextField
                              type="number"
                              label="Giá"
                              fullWidth
                              multiline
                              size="large"
                              margin="normal"
                              value={prodPrice}
                              onChange={(e) => {
                                 setProdPrice(e.target.value);
                              }}
                           />

                           <Select
                              value={brand}
                              onChange={(e) => setBrand(e.target.value)}
                              sx={{ width: 'fit-content', fontSize: 16, mt: 2, mb: 2 }}
                           >
                              <MenuItem disabled value={1} sx={{ fontSize: 16 }}>
                                 -- Chọn danh mục --
                              </MenuItem>

                              {brands.length > 0 ? (
                                 brands.map((brand) => {
                                    return (
                                       <MenuItem key={brand.dm_id} value={brand.dm_ten} sx={{ fontSize: 16 }}>
                                          {brand.dm_ten}
                                       </MenuItem>
                                    );
                                 })
                              ) : (
                                 <></>
                              )}
                           </Select>
                        </div>
                        <div className={cn('right-side')} style={{ width: '500px' }}>
                           <TextField
                              label="Mô tả sản phẩm"
                              fullWidth
                              multiline
                              rows={5}
                              size="large"
                              margin="normal"
                              value={prodDesc}
                              onChange={(e) => {
                                 setProdDesc(e.target.value);
                              }}
                           />

                           <div className={cn('input-label')} style={{ marginRTop: '16px' }}>
                              <span style={{ marginRight: '6px' }}>Ảnh sản phẩm</span>
                              <input
                                 className={cn('input-img')}
                                 type="file"
                                 accept=".jpg, .jpeg, .png"
                                 multiple
                                 onChange={(e) => {
                                    setImgSp(e.target.files);
                                 }}
                                 required
                              />
                           </div>

                           {imgSp.length > 0 ? (
                              <div
                                 className={cn('preview-img-list')}
                                 style={{
                                    display: 'grid',
                                    gridTemplateColumns: '95px 95px 95px 95px 95px',
                                    gap: '5px',
                                    marginTop: '5px',
                                 }}
                              >
                                 {Array.from(imgSp).map((image) => {
                                    return (
                                       <img
                                          key={image.name}
                                          src={URL.createObjectURL(image)}
                                          alt={image.name}
                                          style={{ width: '95px', height: '95px', objectFit: 'cover' }}
                                       />
                                    );
                                 })}
                              </div>
                           ) : (
                              <></>
                           )}
                        </div>
                     </div>

                     <div
                        className={cn('modal-footer')}
                        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 26 }}
                     >
                        <Button
                           variant="outlined"
                           sx={{ width: '120px', color: 'var(--mainColor4)', margin: '0 10px' }}
                           onClick={handleClose}
                        >
                           Đóng
                        </Button>

                        <Button
                           variant="contained"
                           sx={{ width: '120px', backgroundColor: 'var(--mainColor4)' }}
                           onClick={handleAddProduct}
                        >
                           Thêm
                        </Button>
                     </div>
                  </div>
               </Modal>
            </div>
         </div>

         <div className={cn('product-table')}>
            <div className={cn('table-header')}>
               <h4 className={cn('product-number')}>STT</h4>
               <h4 className={cn('product-code')}>Mã SP</h4>
               <h4 className={cn('product-name')}>Tên SP</h4>
               <h4 className={cn('product-price')}>Giá</h4>
               <h4 className={cn('product-instock')}>Tồn kho</h4>
               <h4 className={cn('product-promotion')}>Khuyễn mãi</h4>
               <h4 className={cn('product-del')}>Xóa</h4>
               <h4 className={cn('product-tool')}>Ẩn/hiện</h4>
            </div>

            <div className={cn('table-body')}>
               {listProd.length > 0 ? (
                  listProd.map((product) => {
                     stt++;
                     return (
                        <div className={cn('table-row')} key={product.sp_id}>
                           <h4 className={cn('product-number')}>{stt}</h4>
                           <h4 className={cn('product-code')}>{product.sp_ma}</h4>
                           <div className={cn('product-info')}>
                              <img src={'http://localhost:4000/' + product.sp_image} alt="Ảnh sản phẩm" />
                              <h4 className={cn('product-name')}>{product.sp_ten}</h4>
                           </div>
                           <div className={cn('product-price')}>
                              {product.sp_khuyenmai == null ? (
                                 <h4 className={cn('product-price-current')}>
                                    {currencyFormater.format(product.sp_gia)}
                                 </h4>
                              ) : (
                                 <>
                                    <h4 className={cn('product-price-current')}>
                                       {currencyFormater.format(
                                          product.sp_gia - (product.sp_gia * product.sp_khuyenmai) / 100,
                                       )}
                                    </h4>
                                    <h4 className={cn('product-promotion')}>({product.sp_khuyenmai}%)</h4>
                                    <h4 className={cn('product-price-old')}>
                                       {currencyFormater.format(product.sp_gia)}
                                    </h4>
                                 </>
                              )}
                           </div>
                           <h4 className={cn('product-instock')}>{product.sp_tonkho}</h4>

                           <Tippy
                              interactive
                              // visible
                              placement="bottom"
                              render={(attrs) => (
                                 <div className={cn('content')} tabIndex="-1" {...attrs}>
                                    <Popper>
                                       <div className={cn('tippy-promotion')}>
                                          <div className={cn('promotion-list')}>
                                             <h4>Danh sách khuyến mãi hiện có.</h4>

                                             {promotionList.length > 0 ? (
                                                promotionList.map((promotion) => {
                                                   return (
                                                      <div className={cn('promotion')} key={promotion.km_id}>
                                                         <h4 className={cn('promotion-value')}>
                                                            {promotion.km_giatri}%
                                                         </h4>
                                                         <div className={cn('promotion-date')}>
                                                            <p className={cn('promotion-date-item')}>
                                                               <i>Bđầu:</i> {promotion.ngaybatdau.slice(0, 10)}
                                                            </p>
                                                            <p className={cn('promotion-date-item')}>
                                                               <i>Kthúc:</i> {promotion.ngayketthuc.slice(0, 10)}
                                                            </p>
                                                         </div>
                                                         <Button
                                                            variant="outlined"
                                                            sx={{ color: 'var(--mainColor4)' }}
                                                            onClick={() => {
                                                               handleUpdatePromotion(
                                                                  product.sp_ma,
                                                                  promotion.km_giatri,
                                                                  promotion.ngaybatdau,
                                                                  promotion.ngayketthuc,
                                                               );
                                                               // handleGetProductList();
                                                            }}
                                                         >
                                                            Áp dụng
                                                         </Button>
                                                      </div>
                                                   );
                                                })
                                             ) : (
                                                <h4>Hiện chưa có khuyến mãi nào.</h4>
                                             )}
                                          </div>
                                       </div>
                                    </Popper>
                                 </div>
                              )}
                           >
                              <h4 className={cn('product-promotion')}>
                                 <IconButton>
                                    <SellOutlinedIcon />
                                 </IconButton>
                              </h4>
                           </Tippy>

                           <h4 className={cn('product-del')}>
                              <IconButton onClick={() => hanldeRemoveProduct(product.sp_ma)}>
                                 <DeleteOutlineOutlinedIcon />
                              </IconButton>
                           </h4>
                           <h4 className={cn('product-tool')}>
                              <IconButton
                                 onClick={() => {
                                    handleUpdateStatus(product.sp_ma, product.sp_trangthai);
                                 }}
                              >
                                 {product.sp_trangthai == 0 ? (
                                    <VisibilityOffOutlinedIcon />
                                 ) : (
                                    <VisibilityOutlinedIcon />
                                 )}
                              </IconButton>
                           </h4>
                        </div>
                     );
                  })
               ) : (
                  <h1 className={cn('no-product')}>Không có sản phẩm</h1>
               )}
            </div>
         </div>
      </div>
   );
}

export default ProductsManager;
