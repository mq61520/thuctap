import { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import styles from './Register.module.scss';

const cn = classNames.bind(styles);

function Register() {
   //show pwd
   const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const [userName, setUserName] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');
   const [loginName, setLoginName] = useState('');
   const [loginPwd, setLoginPwd] = useState('');
   const [confirmPwd, setConfirmPwd] = useState('');

   const clearTextInput = () => {
      setUserName('');
      setPhone('');
      setAddress('');
      setLoginName('');
      setLoginPwd('');
      setConfirmPwd('');
   };

   const handleRegister = async () => {
      if (userName.length <= 0 || loginName.length <= 0) {
         toast.error('Nhập đầy đủ vào các trường.', { position: 'top-center' });
      } else if (loginPwd.length <= 8) {
         toast.error('Mật khẩu phải dài hơn 8 ký tự', { position: 'top-center' });
      } else if (confirmPwd !== loginPwd) {
         toast.error('Xác nhận lại mật khẩu', { position: 'top-center' });
      } else {
         try {
            const response = await axios.post(`http://localhost:4000/account/register`, {
               username: userName,
               phone: phone,
               addr: address,
               loginname: loginName,
               loginpwd: loginPwd,
            });

            if (response.data === 'UsernameAvailable') {
               toast.error('Tên đăng nhập đã trùng. Vui lòng chọn tên khác.', { position: 'top-center' });
            } else if (response.data === 'AddSuccess') {
               toast.success('Đăng ký thành công.', { position: 'top-center' });
               clearTextInput();
            }
         } catch (err) {
            console.log(err);
         }
      }
   };

   return (
      <div className={cn('register-page')}>
         <div className={cn('register-form')}>
            <h2>Đăng ký tài khoản</h2>

            <div className={cn('form')}>
               <div className={cn('left-side')}>
                  <div className={cn('name-box')} style={{ width: '320px' }}>
                     <TextField
                        required
                        label="Tên người dùng"
                        //  id="outlined-multiline-flexible"
                        fullWidth
                        margin="normal"
                        size="large"
                        value={userName}
                        onChange={(e) => {
                           setUserName(e.target.value);
                        }}
                     />
                  </div>

                  <div className={cn('name-box')} style={{ width: '320px' }}>
                     <TextField
                        label="Số điện thoại"
                        type="number"
                        //  id="outlined-multiline-flexible"
                        fullWidth
                        margin="normal"
                        size="large"
                        value={phone}
                        onChange={(e) => {
                           setPhone(e.target.value);
                        }}
                     />
                  </div>

                  <div className={cn('name-box')} style={{ width: '320px' }}>
                     <TextField
                        label="Địa chỉ"
                        //  id="outlined-multiline-flexible"
                        fullWidth
                        multiline
                        maxRows={4}
                        margin="normal"
                        size="large"
                        value={address}
                        onChange={(e) => {
                           setAddress(e.target.value);
                        }}
                     />
                  </div>
               </div>

               <div className={cn('right-side')}>
                  <div className={cn('name-box')} style={{ width: '320px' }}>
                     <TextField
                        required
                        label="Tên đăng nhập"
                        //  id="outlined-multiline-flexible"
                        fullWidth
                        margin="normal"
                        size="large"
                        value={loginName}
                        onChange={(e) => {
                           setLoginName(e.target.value);
                        }}
                     />
                  </div>

                  <FormControl sx={{ width: '320px', mt: 2, mb: 1 }} variant="outlined">
                     <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                     <OutlinedInput
                        //  id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                 edge="end"
                              >
                                 {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                           </InputAdornment>
                        }
                        label="Password"
                        value={loginPwd}
                        onChange={(e) => {
                           setLoginPwd(e.target.value);
                        }}
                     />
                  </FormControl>

                  <FormControl sx={{ width: '320px', mt: 2, mb: 1 }} variant="outlined">
                     <InputLabel htmlFor="outlined-adornment-password">Xác nhận mật khẩu</InputLabel>
                     <OutlinedInput
                        //  id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                 edge="end"
                              >
                                 {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                           </InputAdornment>
                        }
                        label="Nhập lại password"
                        value={confirmPwd}
                        onChange={(e) => {
                           setConfirmPwd(e.target.value);
                        }}
                     />
                  </FormControl>

                  <div className={cn('register-btn')}>
                     <Button variant="contained" onClick={handleRegister}>
                        Đăng ký
                     </Button>
                  </div>
               </div>
            </div>

            <div className={cn('btns')}>
               <div className={cn('to-home-btn')}>
                  <Link to={'/login'}>
                     <Button variant="text">Đăng nhập</Button>
                  </Link>
               </div>

               <span>or</span>

               <div className={cn('to-home-btn')}>
                  <Link to={'/'}>
                     <Button variant="text">Trang chủ</Button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Register;
