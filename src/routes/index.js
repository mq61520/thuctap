//layouts
import AdminLayout from '../layouts/AdminLayout';

//pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import DetailProduct from '../pages/DetailProduct';
import Cart from '../pages/Cart';
import Payment from '../pages/Payment';
import Search from '../pages/Search';
import ProductsManager from '../pages/ProductsManager';
import OrderManager from '../pages/OrderManager';
import Orders from '../pages/Orders';
import AllProduct from '../pages/AllProduct';

export const allPages = [
   { path: '/', component: Home },
   { path: '/search', component: Search },
   { path: '/login', component: Login, layout: null },
   { path: '/register', component: Register, layout: null },
   { path: '/products', component: AllProduct },
   { path: '/product-detail/:ma_sp', component: DetailProduct },
   { path: '/cart', component: Cart },
   { path: '/checkout', component: Payment },
   { path: '/orders', component: Orders },
   { path: '/admin/products', component: ProductsManager, layout: AdminLayout },
   { path: '/admin/orders', component: OrderManager, layout: AdminLayout },
];
