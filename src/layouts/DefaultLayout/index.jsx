import Header from '../Header';

function DefaultLayout({ children }) {
   return (
      <>
         <Header />

         <div className="page">{children}</div>
      </>
   );
}

export default DefaultLayout;
