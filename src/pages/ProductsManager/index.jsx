import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

//mui
import Button from '@mui/material/Button';
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

import styles from './ProductsManager.module.scss';
import currencyFormater from '../../common/formatCurrency';
import Popper from '../../components/Popper';

const cn = classNames.bind(styles);

function ProductsManager() {
   document.title = 'Quản lý hàng hóa';

   //modal
   const [openModal, setOpenModal] = useState(false);
   const handleOpen = () => setOpenModal(true);
   const handleClose = () => setOpenModal(false);
   const styleModal = {
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

   const [listProd, setListProd] = useState([1]);

   const [prodCode, setProdCode] = useState();
   const [prodName, setProdName] = useState();
   const [prodAmount, setProdAmount] = useState();
   const [prodPrice, setProdPrice] = useState();
   const [prodDesc, setProdDesc] = useState();
   const [imgSp, setImgSp] = useState([]);

   const handleAddProduct = async () => {
      try {
         const add_product_res = await axios.post('http://localhost:4000/product/add', {
            ma_sp: prodCode,
            anh_sp: imgSp[0].name,
            ten: prodName,
            sl: prodAmount,
            gia: prodPrice,
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
            toast.success('Đã tồn tại mã sản phẩm này.', { position: 'top-center' });
         } else if (add_product_res.data === 'AddProductSuccess' && add_images_res.data === 'AddImgSuccess') {
            console.log('Thêm sản phẩm thành công');
            toast.success('Thêm sản phẩm thành công.', { position: 'top-center' });

            setMaSp('');
            setTenSp('');
            setSlSp('');
            setGiaSp('');
            setMotaSp('');
            setImgSp([]);
         } else {
            console.log('Thêm sản phẩm không thành công');
            toast.error('Thêm sản phẩm không thành công.', { position: 'top-center' });
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className={cn('body')}>
         <h4 className={cn('content-title')}>Quản lý sản phẩm</h4>

         <div className={cn('product-crud')}>
            <div className={cn('crud-btn')}>
               <Button
                  variant="contained"
                  startIcon={<AddIcon sx={{ width: '30px', height: '30px' }} />}
                  sx={{ width: '200px', height: '42px', fontSize: '20px', backgroundColor: 'var(--mainColor4)' }}
                  onClick={handleOpen}
               >
                  Thêm
               </Button>

               <Modal open={openModal} onClose={handleClose}>
                  <div className={cn('change-address-modal-container')} style={styleModal}>
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
                              onChange={(e) => {
                                 setProdName(e.target.value);
                              }}
                           />
                           <TextField
                              label="Số lượng"
                              type="number"
                              fullWidth
                              multiline
                              size="large"
                              margin="normal"
                              onChange={(e) => {
                                 setProdAmount(e.target.value);
                              }}
                           />
                           <TextField
                              label="Giá"
                              fullWidth
                              multiline
                              size="large"
                              margin="normal"
                              onChange={(e) => {
                                 setProdPrice(e.target.value);
                              }}
                           />
                        </div>
                        <div className={cn('right-side')} style={{ width: '500px' }}>
                           <TextField
                              label="Mô tả sản phẩm"
                              fullWidth
                              multiline
                              rows={5}
                              size="large"
                              margin="normal"
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
                  <>
                     <div className={cn('table-row')}>
                        <h4 className={cn('product-number')}>001</h4>
                        <h4 className={cn('product-code')}>spsjkvs</h4>
                        <h4 className={cn('product-name')}>ksdk sdivbisd sudivgisdv idgvisdbv</h4>
                        <h4 className={cn('product-price')}>{currencyFormater.format(1654652)}</h4>
                        <h4 className={cn('product-instock')}>9999</h4>
                        <h4 className={cn('product-promotion')}>
                           <IconButton>
                              <SellOutlinedIcon />
                           </IconButton>
                        </h4>
                        <h4 className={cn('product-del')}>
                           <IconButton>
                              <DeleteOutlineOutlinedIcon />
                           </IconButton>
                        </h4>
                        <h4 className={cn('product-tool')}>
                           <IconButton>
                              <VisibilityOffOutlinedIcon />
                           </IconButton>
                        </h4>
                     </div>
                  </>
               ) : (
                  <h1 className={cn('no-product')}>Không có sản phẩm</h1>
               )}
            </div>
         </div>
      </div>
   );
}

export default ProductsManager;
