import classNames from 'classnames/bind';
import Grid from '@mui/material/Grid';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

import styles from './Home.module.scss';
import ProductItem from '../../components/ProductItem';
import CategoryItem from '../../components/CategoryItem';

const cn = classNames.bind(styles);

function Home() {
   return (
      <div className={cn('home-page')}>
         <div className={cn('inner-content')}>
            <div className={cn('categories')}>
               <div className={cn('category-title')}>
                  <AutoAwesomeMosaicOutlinedIcon sx={{ fontSize: 30, marginRight: '5px' }} />
                  DANH MỤC
               </div>

               <div className={cn('category-list')}>
                  {/* <Grid container spacing={2}>
                     <Grid item>
                        <CategoryItem />
                     </Grid>
                     <Grid item>
                        <CategoryItem />
                     </Grid>
                     <Grid item>
                        <CategoryItem />
                     </Grid>
                     <Grid item>
                        <CategoryItem />
                     </Grid>
                     <Grid item>
                        <CategoryItem />
                     </Grid>
                     <Grid item>
                        <CategoryItem />
                     </Grid>
                     <Grid item>
                        <CategoryItem />
                     </Grid>
                     <Grid item>
                        <CategoryItem />
                     </Grid>
                     <Grid item>
                        <CategoryItem />
                     </Grid>
                  </Grid> */}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;
