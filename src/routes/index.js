import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import DetailProduct from '../pages/DetailProduct';
import Cart from '../pages/Cart';
import Search from '../pages/Search';

export const allPages = [
   { path: '/', component: Home },
   { path: '/search', component: Search },
   { path: '/login', component: Login, layout: null },
   { path: '/register', component: Register, layout: null },
   { path: '/product-detail', component: DetailProduct },
   { path: '/cart', component: Cart },
];
