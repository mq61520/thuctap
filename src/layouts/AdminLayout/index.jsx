import classNames from 'classnames/bind';

import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import styles from './AdminLayout.module.scss';
import Popper from '../../components/Popper';

const cn = classNames.bind(styles);

function AdminLayout({ children }) {
   return (
      <div className={cn('page')}>
         <div className={cn('header')}>
            <div className={cn('header-logo')}>
               <h1>BOOKstore</h1>
            </div>

            <div className={cn('header-actions')}>
               <Tippy
                  interactive
                  render={(attrs) => (
                     <div className={cn('content')} tabIndex="-1" {...attrs}>
                        <Popper>
                           <Button
                              variant="contained"
                              startIcon={<LogoutOutlinedIcon />}
                              sx={{ backgroundColor: 'var(--mainColor4)' }}
                           >
                              Đăng xuất
                           </Button>
                        </Popper>
                     </div>
                  )}
               >
                  <div className={cn('account')}>
                     <h4>Nguyễn Minh Quân</h4>

                     {/* <img src={'http://localhost:4000/' + localStorage.getItem('avatar_name')} alt="Admin avatar" /> */}
                  </div>
               </Tippy>
            </div>
         </div>

         <div className={cn('children')}>{children}</div>
      </div>
   );
}

export default AdminLayout;
