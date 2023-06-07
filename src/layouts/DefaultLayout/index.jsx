import Footer from '../Footer';
import Header from '../Header';

function DefaultLayout({ children }) {
   return (
      <>
         <Header />

         <div className="page">{children}</div>

         <Footer />
      </>
   );
}

export default DefaultLayout;
