import classNames from 'classnames/bind';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

const cn = classNames.bind(styles);

function Footer() {
   return (
      <footer>
         <div className={cn('inner')}>
            <Link to={'/'}>
               <div className={cn('logo')}>
                  <AutoStoriesOutlinedIcon sx={{ fontSize: 65 }} />
                  <span>book</span>
               </div>
            </Link>

            <div className={cn('description')}>
               <h4>Công ty TNHH Tin học Á Châu</h4>
               <h4>(41 Lý Tự Trọng, An Phú, Ninh Kiều, Cần Thơ)</h4>
               <br />
               <h4>Thực Tập Thực Tế</h4>
               <h4>Hè 2023</h4>
               <h4>Nguyễn Minh Quân</h4>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
