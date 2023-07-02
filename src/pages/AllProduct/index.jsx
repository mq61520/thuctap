import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './AllProduct.module.scss';
import ProductItem from '../../components/ProductItem';

const cn = classNames.bind(styles);

function AllProduct() {
   const [listProd, setListProd] = useState([]);
   const handleGetProductList = async () => {
      try {
         const product_list = await axios.get('http://localhost:4000/product/all');

         if (product_list.data.length > 0) {
            setListProd(product_list.data);
            // console.log(product_list.data);
         } else {
            console.log('Tải sản phẩm thất bại.');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleGetProductList();
   }, []);

   return (
      <div className={cn('product-page')}>
         <div className={cn('inner')}>
            <h4>Tất cả sản phẩm</h4>

            <div className={cn('product-list')}>
               {listProd.length > 0 ? (
                  listProd.map((product) => {
                     return (
                        <ProductItem
                           key={product.sp_id}
                           ma_sp={product.sp_ma}
                           img={product.sp_image}
                           ten={product.sp_ten}
                           gia={product.sp_gia}
                           km={product.sp_khuyenmai}
                        />
                     );
                  })
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   );
}

export default AllProduct;
