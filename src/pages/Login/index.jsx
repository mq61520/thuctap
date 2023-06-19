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

import styles from './Login.module.scss';
import './MUI.scss';
import { changeLoginName, changeLoginPwd } from '../../app/slices/authSlice';

const cn = classNames.bind(styles);

function Login() {
   document.title = 'Đăng nhập';

   const [showPassword, setShowPassword] = useState(false);

   const dispatch = useDispatch();
   const auth = useSelector((state) => state.auth);

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   console.log(auth);

   const clearTextInput = () => {
      const action1 = changeLoginName('');
      const action2 = changeLoginPwd('');
      dispatch(action1);
      dispatch(action2);
   };

   const handleAuth = async () => {
      try {
         const response = await axios.post(`http://localhost:4000/account/authentication`, {
            loginname: auth.loginName,
            loginpwd: auth.loginPwd,
         });

         if (response.data[0].exist === 1) {
            if (response.data[0].nd_role === 1) {
               localStorage.setItem('admin_name', response.data[0].nd_hoten);
               window.open('http://127.0.0.1:5173/admin/orders', '_self');
            } else {
               localStorage.setItem('user_name', response.data[0].nd_hoten);
               localStorage.setItem('user_id', response.data[0].nd_id);
               window.open('http://127.0.0.1:5173/', '_self');
            }
         } else {
            toast.error('Tên đăng nhập hoặc mật khẩu sai.', { position: 'top-center' });
            clearTextInput();
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className={cn('login-page')}>
         <div className={cn('login-form')}>
            <h2>Đăng nhập</h2>

            <div className={cn('name-box')} style={{ width: '320px' }}>
               <TextField
                  label="Tên đăng nhập"
                  id="outlined-multiline-flexible"
                  fullWidth
                  margin="normal"
                  size="large"
                  value={auth.loginName}
                  onChange={(e) => {
                     const action = changeLoginName(e.target.value);
                     dispatch(action);
                  }}
               />
            </div>

            <FormControl sx={{ width: '320px', mt: 1 }} variant="outlined">
               <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
               <OutlinedInput
                  id="outlined-adornment-password"
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
                  value={auth.loginPwd}
                  onChange={(e) => {
                     const action = changeLoginPwd(e.target.value);
                     dispatch(action);
                  }}
               />
            </FormControl>

            <div className={cn('confirm-btn')}>
               <Button variant="contained" onClick={handleAuth}>
                  Đăng nhập
               </Button>
            </div>

            <div className={cn('btns')}>
               <div className={cn('to-home-btn')}>
                  <Link to={'/register'}>
                     <Button variant="text">Đăng ký</Button>
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

export default Login;
