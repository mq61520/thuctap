import classNames from 'classnames/bind';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import styles from './Login.module.scss';
import { useState } from 'react';

const cn = classNames.bind(styles);

function Login() {
   document.title = 'Đăng nhập';

   const [showPassword, setShowPassword] = useState(false);

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <div className={cn('login')}>
         <div className={cn('form')}>
            <TextField label="Name" id="outlined-multiline-flexible " margin="normal" size="large" />

            <FormControl sx={{ m: 1, width: '25ch', mt: 2 }} variant="outlined">
               <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
               />
            </FormControl>
         </div>
      </div>
   );
}

export default Login;
