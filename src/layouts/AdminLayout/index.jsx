import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';

const cn = classNames.bind(styles);

function AdminLayout({ children }) {
   return <div className={cn('page')}>{children}</div>;
}

export default AdminLayout;
