import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

//mui
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';

import styles from './Payment.module.scss';
import currencyFormater from '../../common/formatCurrency';

const cn = classNames.bind(styles);

function Payment() {
   //modal
   const [openModal, setOpenModal] = useState(false);
   const handleOpen = () => setOpenModal(true);
   const handleClose = () => setOpenModal(false);
   const styleModal = {
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

   //choose shipping unit
   const [shipType, setShipType] = useState(50000);
   const handleChange = (event) => {
      setShipType(event.target.value);
   };

   const [payMethod, setPayMethod] = useState('cod');

   return (
      <div className={cn('payment-page')}>
         <div className={cn('inner')}>
            <div className={cn('delivery-address')}>
               <div className={cn('letter')}></div>

               <h3 className={cn('title')}>
                  <LocationOnOutlinedIcon sx={{ mr: 1, color: 'var(--mainColor4)' }} />
                  Địa chỉ nhận hàng
               </h3>

               <div className={cn('address')}>
                  <h3 className={cn('customer-info')}>Nguyen Minh Quan (+84) 0559089553</h3>
                  <h3 className={cn('customer-address')}>Duong 3/2 phuong Xuan Khanh quan Ninh Kieu tp Can Tho</h3>

                  <div className={cn('change-address-btn')}>
                     <IconButton sx={{ ml: 2, fontSize: 18, color: 'var(--mainColor4)' }} onClick={handleOpen}>
                        <DriveFileRenameOutlineOutlinedIcon />
                     </IconButton>
                  </div>

                  <Modal open={openModal} onClose={handleClose}>
                     <div className={cn('change-address-modal-container')} style={styleModal}>
                        <div
                           className={cn('modal-header')}
                           style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                           <h4 style={{ fontSize: 24, fontWeight: 400, color: '#333' }}>
                              Cập nhật <b>Địa chỉ</b> và <b>Số điện thoại</b>
                           </h4>

                           <IconButton
                              onClick={() => {
                                 setOpenModal(false);
                              }}
                           >
                              <CloseIcon />
                           </IconButton>
                        </div>

                        <div className={cn('modal-body')} style={{ marginTop: 26 }}>
                           <TextField label="Số điện thoại" fullWidth margin="normal" size="large" />

                           <TextField label="Địa chỉ" fullWidth multiline margin="normal" size="large" />
                        </div>

                        <div
                           className={cn('modal-btns')}
                           style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 26 }}
                        >
                           <Button variant="outlined" sx={{ color: 'var(--mainColor4)' }}>
                              Thay đổi
                           </Button>
                        </div>
                     </div>
                  </Modal>
               </div>
            </div>

            <div className={cn('order')}>
               <div className={cn('header-list')}>
                  <h4 className={cn('header-info')}>Sản phẩm</h4>

                  <h4 className={cn('header-price')}>Đơn giá</h4>

                  <h4 className={cn('header-amount')}>Số lượng</h4>

                  <h4 className={cn('header-total-price')}>Thành tiền</h4>
               </div>

               <div className={cn('products-list')}>
                  <div className={cn('product')}>
                     <div className={cn('product-info')}>
                        <img
                           src="https://cdn0.fahasa.com/media/catalog/product/n/x/nxbtre_full_30282023_112849_1.jpg"
                           alt="Anh san pham"
                        />

                        <h4 className={cn('product-name')}>Alice In Borderland - Tập 11 - Tặng Kèm Card Giấy</h4>
                     </div>

                     <h4 className={cn('product-unit-price')}>{currencyFormater.format(6546132)}</h4>

                     <h4 className={cn('product-amount')}>9000</h4>

                     <h4 className={cn('product-total-price')}>{currencyFormater.format(15165213)}</h4>
                  </div>

                  <div className={cn('product')}>
                     <div className={cn('product-info')}>
                        <img
                           src="https://cdn0.fahasa.com/media/catalog/product/n/x/nxbtre_full_30282023_112849_1.jpg"
                           alt="Anh san pham"
                        />

                        <h4 className={cn('product-name')}>Alice In Borderland - Tập 11 - Tặng Kèm Card Giấy</h4>
                     </div>

                     <h4 className={cn('product-unit-price')}>{currencyFormater.format(6546132)}</h4>

                     <h4 className={cn('product-amount')}>9000</h4>

                     <h4 className={cn('product-total-price')}>{currencyFormater.format(15165213)}</h4>
                  </div>
               </div>

               <div className={cn('shipping-unit')}>
                  <h4 style={{ flex: '1', color: '#333' }}>Hình thức vận chuyển</h4>

                  <Select value={shipType} onChange={handleChange} sx={{ width: 'fit-content', fontSize: 20 }}>
                     <MenuItem value={50000} sx={{ fontSize: 20 }}>
                        Nhanh - {currencyFormater.format(50000)}
                     </MenuItem>
                     <MenuItem value={70000} sx={{ fontSize: 20 }}>
                        Hỏa tốc - {currencyFormater.format(70000)}
                     </MenuItem>
                  </Select>
               </div>

               <div className={cn('order-total')}>
                  <div className={cn('order-total-note')}>
                     <TextField
                        label="Ghi chú"
                        //  id="outlined-multiline-flexible"
                        fullWidth
                        multiline
                        maxRows={4}
                        margin="normal"
                        size="large"
                        // value={address}
                        // onChange={(e) => {
                        //    setAddress(e.target.value);
                        // }}
                     />
                  </div>

                  <div className={cn('order-total-price')}>
                     <span style={{ fontSize: '20px' }}>Tổng số tiền: </span>
                     <h3>{currencyFormater.format(23654524)}</h3>
                  </div>
               </div>
            </div>

            <div className={cn('payment-methods')}>
               <h4>Phương thức thanh toán</h4>

               <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={payMethod}
                  onChange={(e) => {
                     setPayMethod(e.target.value);
                  }}
               >
                  <FormControlLabel
                     value="COD"
                     control={<Radio checked />}
                     label="COD (Thanh toán trực tiếp khi nhận hàng)"
                  />
                  <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
               </RadioGroup>
            </div>

            <div className={cn('total')}>
               <h4 className={cn('total-price-products')}>
                  Tổng tiền hàng:<span>{currencyFormater.format(21245121)}</span>
               </h4>

               <h4 className={cn('ship-price')}>
                  Phí vận chuyển:<span>{currencyFormater.format(52121)}</span>
               </h4>

               <h4 className={cn('total-pay')}>
                  Tổng thanh toán:
                  <span className={cn('total-pay-color')}>{currencyFormater.format(515451)}</span>
               </h4>

               <div className={cn('submit-pay-btn')}>
                  <Button variant="contained" sx={{ width: '180px', height: '44px', fontSize: 24 }}>
                     Đặt hàng
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Payment;
