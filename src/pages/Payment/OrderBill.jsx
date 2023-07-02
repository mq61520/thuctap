import { useSelector } from 'react-redux';

import './OrderBill.css';
import currencyFormater from '../../common/formatCurrency';

function Bill({ user_info, ship }) {
   const listProd = useSelector((state) => state.pay);
   console.log(user_info);

   const date = new Date();

   return (
      <table className="body-wrap">
         <tbody>
            <tr>
               <td></td>
               <td className="container" width="600">
                  <div className="content">
                     <table className="main" width="100%" cellPadding="0" cellSpacing="0">
                        <tbody>
                           <tr>
                              <td className="content-wrap aligncenter">
                                 <table width="100%" cellPadding="0" cellSpacing="0">
                                    <tbody>
                                       <tr>
                                          <td className="content-block">
                                             <h2>Hóa đơn mua hàng</h2>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td className="content-block">
                                             <table className="invoice">
                                                <tbody>
                                                   <tr>
                                                      <td>
                                                         {user_info.nd_hoten}
                                                         <br></br>
                                                         {date.toLocaleDateString()}
                                                      </td>
                                                   </tr>
                                                   <tr>
                                                      <td>
                                                         <table
                                                            className="invoice-items"
                                                            cellPadding="0"
                                                            cellSpacing="0"
                                                         >
                                                            <tbody>
                                                               {listProd.listProd.length > 0 ? (
                                                                  listProd.listProd.map((product) => {
                                                                     return (
                                                                        <tr key={product.ma_sp}>
                                                                           <td>{product.ten_sp}</td>
                                                                           <td className="alignright">
                                                                              {currencyFormater.format(
                                                                                 product.gia_km * product.sl_sp,
                                                                              )}
                                                                           </td>
                                                                        </tr>
                                                                     );
                                                                  })
                                                               ) : (
                                                                  <></>
                                                               )}
                                                               <tr>
                                                                  <td className="alignright" width="80%">
                                                                     Phí vận chuyển:
                                                                  </td>
                                                                  <td className="alignright">
                                                                     {currencyFormater.format(ship)}
                                                                  </td>
                                                               </tr>
                                                               <tr className="total">
                                                                  <td className="alignright" width="80%">
                                                                     Tổng cộng:
                                                                  </td>
                                                                  <td className="alignright">
                                                                     {currencyFormater.format(listProd.total + ship)}
                                                                  </td>
                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </td>
                                                   </tr>
                                                </tbody>
                                             </table>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td className="content-block">Công ty TNHH Tin học Á Châu</td>
                                       </tr>
                                       <tr>
                                          <td className="content-block">41 Lý Tự Trọng, An Phú, Ninh Kiều, Cần Thơ</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </td>
                           </tr>
                        </tbody>
                     </table>

                     <div className="footer">
                        <table width="100%">
                           <tbody>
                              <tr>
                                 <td className="aligncenter content-block">
                                    Questions? Email <a href="mailto:">support@company.inc</a>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </td>
               <td></td>
            </tr>
         </tbody>
      </table>
   );
}

export default Bill;
